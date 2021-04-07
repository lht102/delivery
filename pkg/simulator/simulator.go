package simulator

import (
	"math"
	"sort"
	"time"

	"go.uber.org/zap"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/known/timestamppb"

	"github.com/lht102/delivery/api/delivery"
	"github.com/lht102/delivery/api/delivery/simulation"
	"github.com/lht102/delivery/pkg/binpack"
	"github.com/uber/h3-go/v3"
)

var (
	h3Resolution = 8
)

type realtimeSimulator struct {
	simulationRequest      *simulation.SimulationRequest
	driverStateByUUID      map[string]*DriverState
	availableDriverUUIDSet map[string]bool
	servingDriverUUIDSet   map[string]bool
	driverUUIDByGeoIndex   map[h3.H3Index]string
	logger                 *zap.Logger
}

func NewRealTimeSimulator(request *simulation.SimulationRequest, logger *zap.Logger) *realtimeSimulator {
	startedAt := request.GetCreatedAt().AsTime()
	driverStateByUUID := make(map[string]*DriverState, len(request.GetDriverRequests()))
	driverUUIDByGeoIndex := map[h3.H3Index]string{}
	availableDriverUUIDSet := map[string]bool{}
	for _, driverReq := range request.GetDriverRequests() {
		ds := newDriverState(startedAt, driverReq, driverUUIDByGeoIndex, logger)
		driverStateByUUID[driverReq.GetUuid()] = ds
		if driverReq.GetCreatedAt().GetSeconds() >= startedAt.Unix() {
			availableDriverUUIDSet[driverReq.GetUuid()] = true
		}
	}
	return &realtimeSimulator{
		simulationRequest:      request,
		driverStateByUUID:      driverStateByUUID,
		availableDriverUUIDSet: availableDriverUUIDSet,
		servingDriverUUIDSet:   map[string]bool{},
		driverUUIDByGeoIndex:   driverUUIDByGeoIndex,
		logger:                 logger,
	}
}

func (s *realtimeSimulator) HandleSimulationRequest() *simulation.SimulationResponse {
	sortedDeliveryRequests := getSortedDeliveryRequests(s.simulationRequest)
	timelineList := getSimulationTimelineList(s.simulationRequest)
	var sortedDeliveryRequestsToBeHandledQueue []*simulation.DeliveryRequest
	sortedDeliveryRequestsToBeHandledQueue = append(sortedDeliveryRequestsToBeHandledQueue, sortedDeliveryRequests...)
	for _, ts := range timelineList {
		s.updateAllDriversWithServingDriverState(ts)

		var remainingSortedDeliveryRequestsToBeHandled []*simulation.DeliveryRequest
		for len(sortedDeliveryRequestsToBeHandledQueue) > 0 && !sortedDeliveryRequestsToBeHandledQueue[0].GetCreatedAt().AsTime().After(ts) {
			remainingSortedDeliveryRequestsToBeHandled = append(remainingSortedDeliveryRequestsToBeHandled, sortedDeliveryRequestsToBeHandledQueue[0])
			sortedDeliveryRequestsToBeHandledQueue = sortedDeliveryRequestsToBeHandledQueue[1:]

		}
		var remainingSortedDeliveryRequestsToBeHandledTmp []*simulation.DeliveryRequest
		for _, req := range remainingSortedDeliveryRequestsToBeHandled {

			// TODO: implement different way to select drivers
			// srcLoc := req.GetSrcLoc()
			// srcGeoIndex := h3.FromGeo(h3.GeoCoord{Latitude: srcLoc.GetLat(), Longitude: srcLoc.GetLng()}, h3Resolution)
			// srcRingGeoIndices := h3.KRing(srcGeoIndex, 1)
			// var driversNearbySrcLoc []*DriverState
			// for _, geoIndex := range srcRingGeoIndices {
			// 	driverUUID, ok := s.driverUUIDByGeoIndex[geoIndex]
			// 	if ok {
			// 		driversNearbySrcLoc = append(driversNearbySrcLoc, s.driverStateByUUID[driverUUID])
			// 	}
			// }
			// sort.Slice(driversNearbySrcLoc, func(i, j int) bool {
			// 	return driversNearbySrcLoc[i].NumOfServingRequests() < driversNearbySrcLoc[j].NumOfServingRequests()
			// })
			driversNearbySrcLoc := []*DriverState{}
			for _, ds := range s.driverStateByUUID {
				driversNearbySrcLoc = append(driversNearbySrcLoc, ds)
			}

			isCurrentReqHandled := s.handleCurrentDeliveryRequestWithSuitableDrivers(driversNearbySrcLoc, ts, req)
			if !isCurrentReqHandled {
				remainingSortedDeliveryRequestsToBeHandledTmp = append(remainingSortedDeliveryRequestsToBeHandledTmp, req)
			}
		}
		remainingSortedDeliveryRequestsToBeHandled = calculateRemainingSortedDeliveryRequestsToBeHandled(remainingSortedDeliveryRequestsToBeHandledTmp, ts)
	}
	s.updateAllDriversWithServingDriverState(time.Unix(math.MaxInt64, 0))

	driverRoutingDetailsByUUID := make(map[string]*simulation.DriverRoutingDetails, len(s.driverStateByUUID))
	for driverUUID, ds := range s.driverStateByUUID {
		routes := []*simulation.Route{}
		routes = append(routes, ds.finishedRoutes...)
		driverRoutingDetailsByUUID[driverUUID] = &simulation.DriverRoutingDetails{
			Name:   ds.name,
			Routes: routes,
		}
	}
	return &simulation.SimulationResponse{
		DriverRoutingDetailsByUuid: driverRoutingDetailsByUUID,
	}
}

func (s *realtimeSimulator) handleCurrentDeliveryRequestWithSuitableDrivers(suitableDrivers []*DriverState, curTime time.Time, req *simulation.DeliveryRequest) bool {
	for _, driverState := range suitableDrivers {
		err := s.handleDeliveryRequest(curTime, req, driverState)
		if err != nil {
			s.logger.Warn("driver can not serve the delivery request at current time",
				zap.String("driver_uuid", driverState.uuid), zap.String("delivery_request_uuid", req.GetUuid()), zap.Time("current_time", curTime))
		} else {
			return true
		}
	}
	return false
}

func (s *realtimeSimulator) handleDeliveryRequest(curTime time.Time, request *simulation.DeliveryRequest, ds *DriverState) error {
	if ds.lastUpdatedTime.UTC().Unix() != curTime.UTC().Unix() {
		ds.updateInternalStateWithTime(curTime)
	}
	if ds.Status() == delivery.DriverStatus_DRIVER_STATUS_AVAILABLE {
		routes, err := ds.handleDeliveryRequestWithDefaultRouting(curTime, request, ds.curLoc)
		if err != nil {
			return err
		}
		ds.unfinishedRoutes = append(ds.unfinishedRoutes, routes...)
	} else if ds.Status() == delivery.DriverStatus_DRIVER_STATUS_SERVING {
		if s.simulationRequest.GetSupportRetracement() {
			if len(ds.unfinishedRoutes) > 1 {
				lastUnfinishedRoute := ds.unfinishedRoutes[len(ds.unfinishedRoutes)-1]
				var routesPackerPairs []routesPackerPair
				// default
				ds.packer = binpack.NewBoxCopy(ds.packer.(*binpack.Box))
				routes, err1 := ds.handleDeliveryRequestWithDefaultRouting(lastUnfinishedRoute.GetTimeWindow().GetEndedAt().AsTime(), request, lastUnfinishedRoute.GetDstLoc())
				if err1 == nil {
					routesPackerPairs = append(routesPackerPairs, routesPackerPair{routes: routes, packer: ds.packer})
				}

				ds.packer = binpack.NewBoxCopy(ds.packer.(*binpack.Box))
				routes1, err2 := ds.handleDeliveryRequestWithRoutingMethodOne(lastUnfinishedRoute.GetTimeWindow().GetStartedAt().AsTime(), lastUnfinishedRoute, request)
				if err2 == nil {
					routesPackerPairs = append(routesPackerPairs, routesPackerPair{routes: routes1, packer: ds.packer})
				}

				ds.packer = binpack.NewBoxCopy(ds.packer.(*binpack.Box))
				routes2, err3 := ds.handleDeliveryRequestWithRoutingMethodTwo(lastUnfinishedRoute.GetTimeWindow().GetStartedAt().AsTime(), lastUnfinishedRoute, request)
				if err3 == nil {
					routesPackerPairs = append(routesPackerPairs, routesPackerPair{routes: routes2, packer: ds.packer})
				}

				pair, err := findSuitableRoutingPackerPair(routesPackerPairs)
				if err != nil {
					return err
				}
				ds.packer = pair.packer
				// not default routing
				if len(pair.routes) > 2 {
					ds.unfinishedRoutes[len(ds.unfinishedRoutes)-1] = nil
				}
				ds.unfinishedRoutes = append(ds.unfinishedRoutes, pair.routes...)
			} else {
				firstHalfRoute := proto.Clone(ds.unfinishedRoutes[0]).(*simulation.Route)
				firstHalfRoute.TimeWindow.EndedAt = &timestamppb.Timestamp{
					Seconds: curTime.Unix(),
				}
				firstHalfRoute.DstLoc = ds.curLoc
				firstHalfRoute.IsReqDst = false

				lastUnfinishedRoute := ds.unfinishedRoutes[len(ds.unfinishedRoutes)-1]
				var routesPackerPairs []routesPackerPair
				// default
				ds.packer = binpack.NewBoxCopy(ds.packer.(*binpack.Box))
				routes, err1 := ds.handleDeliveryRequestWithDefaultRouting(lastUnfinishedRoute.GetTimeWindow().GetEndedAt().AsTime(), request, lastUnfinishedRoute.GetDstLoc())
				if err1 == nil {
					routesPackerPairs = append(routesPackerPairs, routesPackerPair{routes: routes, packer: ds.packer})
				}

				ds.packer = binpack.NewBoxCopy(ds.packer.(*binpack.Box))
				routes1, err2 := ds.handleDeliveryRequestWithRoutingMethodOne(firstHalfRoute.GetTimeWindow().GetEndedAt().AsTime(), firstHalfRoute, request)
				if err2 == nil {
					routesPackerPairs = append(routesPackerPairs, routesPackerPair{routes: routes1, packer: ds.packer})
				}

				ds.packer = binpack.NewBoxCopy(ds.packer.(*binpack.Box))
				routes2, err3 := ds.handleDeliveryRequestWithRoutingMethodTwo(firstHalfRoute.GetTimeWindow().GetEndedAt().AsTime(), firstHalfRoute, request)
				if err3 == nil {
					routesPackerPairs = append(routesPackerPairs, routesPackerPair{routes: routes2, packer: ds.packer})
				}

				pair, err := findSuitableRoutingPackerPair(routesPackerPairs)
				if err != nil {
					return err
				}
				ds.packer = pair.packer
				// not default routing
				if len(pair.routes) > 2 {
					ds.unfinishedRoutes[len(ds.unfinishedRoutes)-1] = firstHalfRoute
				}
				ds.unfinishedRoutes = append(ds.unfinishedRoutes, pair.routes...)
			}
		} else {
			lastUnfinishedRoute := ds.unfinishedRoutes[len(ds.unfinishedRoutes)-1]
			routes, err := ds.handleDeliveryRequestWithDefaultRouting(lastUnfinishedRoute.GetTimeWindow().GetEndedAt().AsTime(), request, lastUnfinishedRoute.GetDstLoc())
			if err != nil {
				return err
			}
			ds.unfinishedRoutes = append(ds.unfinishedRoutes, routes...)
		}
	}
	ds.status = delivery.DriverStatus_DRIVER_STATUS_SERVING
	ds.servingRequestsByUUID[request.GetUuid()] = request
	s.servingDriverUUIDSet[ds.uuid] = true
	return nil
}

func calculateRemainingSortedDeliveryRequestsToBeHandled(previousRemainingSortedDeliveryRequestsToBeHandled []*simulation.DeliveryRequest, t time.Time) []*simulation.DeliveryRequest {
	var requests []*simulation.DeliveryRequest
	for _, req := range previousRemainingSortedDeliveryRequestsToBeHandled {
		if !req.GetSrcTimeWindow().GetEndedAt().AsTime().Before(t) {
			requests = append(requests, req)
		}
	}
	return requests
}

func getSortedDeliveryRequests(req *simulation.SimulationRequest) []*simulation.DeliveryRequest {
	sortedDeliveryRequests := make([]*simulation.DeliveryRequest, len(req.GetDeliveryRequests()))
	for i := range req.GetDeliveryRequests() {
		sortedDeliveryRequests[i] = req.GetDeliveryRequests()[i]
	}
	sort.Slice(sortedDeliveryRequests, func(i, j int) bool {
		return sortedDeliveryRequests[i].GetCreatedAt().AsTime().Before(sortedDeliveryRequests[j].GetCreatedAt().AsTime())
	})
	return sortedDeliveryRequests
}

func getSimulationTimelineList(req *simulation.SimulationRequest) []time.Time {
	timelineSet := map[int64]bool{}
	for _, driverReq := range req.GetDriverRequests() {
		timelineSet[driverReq.GetCreatedAt().AsTime().Unix()] = true
	}
	for _, req := range req.GetDeliveryRequests() {
		createdAt := req.GetCreatedAt()
		timelineSet[createdAt.AsTime().Unix()] = true

	}
	timelineList := make([]time.Time, len(timelineSet))
	i := 0
	for ts := range timelineSet {
		timelineList[i] = time.Unix(ts, 0)
		i++
	}
	sort.Slice(timelineList, func(i, j int) bool {
		return timelineList[i].Before(timelineList[j])
	})
	return timelineList
}

func (s *realtimeSimulator) updateAllDriversWithServingDriverState(curTime time.Time) {
	for id := range s.servingDriverUUIDSet {
		s.driverStateByUUID[id].updateInternalStateWithTime(curTime)
		if s.driverStateByUUID[id].Status() == delivery.DriverStatus_DRIVER_STATUS_AVAILABLE {
			s.availableDriverUUIDSet[id] = true
			delete(s.servingDriverUUIDSet, id)
		}
	}
}

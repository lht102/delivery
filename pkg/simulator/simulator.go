package simulator

import (
	"math"
	"sort"
	"strings"
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
	h3Resolution = 7
)

type realtimeSimulator struct {
	simulationRequest                    *simulation.SimulationRequest
	driverStateByUUID                    map[string]*DriverState
	availableDriverUUIDSet               map[string]bool
	servingDriverUUIDSet                 map[string]bool
	driverUUIDByGeoIndex                 map[h3.H3Index]string
	deliveryRequestByUUID                map[string]*simulation.DeliveryRequest
	notBeingServedDeliveryRequestUUIDSet map[string]bool
	logger                               *zap.Logger
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
	notBeingServedDeliveryRequestUUIDSet := map[string]bool{}
	deliveryRequestByUUID := make(map[string]*simulation.DeliveryRequest, len(request.GetDeliveryRequests()))
	for _, deliveryReq := range request.GetDeliveryRequests() {
		deliveryRequestByUUID[deliveryReq.GetUuid()] = deliveryReq
		notBeingServedDeliveryRequestUUIDSet[deliveryReq.GetUuid()] = true
	}
	return &realtimeSimulator{
		simulationRequest:                    request,
		driverStateByUUID:                    driverStateByUUID,
		availableDriverUUIDSet:               availableDriverUUIDSet,
		servingDriverUUIDSet:                 map[string]bool{},
		driverUUIDByGeoIndex:                 driverUUIDByGeoIndex,
		deliveryRequestByUUID:                deliveryRequestByUUID,
		notBeingServedDeliveryRequestUUIDSet: notBeingServedDeliveryRequestUUIDSet,
		logger:                               logger,
	}
}

func (s *realtimeSimulator) HandleSimulationRequest() *simulation.SimulationResponse {
	sortedDeliveryRequests := getSortedDeliveryRequests(s.simulationRequest)
	timelineList := getSimulationTimelineList(s.simulationRequest)
	var sortedDeliveryRequestsToBeHandledQueue []*simulation.DeliveryRequest
	sortedDeliveryRequestsToBeHandledQueue = append(sortedDeliveryRequestsToBeHandledQueue, sortedDeliveryRequests...)
	var remainingSortedDeliveryRequestsToBeHandled []*simulation.DeliveryRequest
	driverStates := []*DriverState{}
	for _, ds := range s.driverStateByUUID {
		driverStates = append(driverStates, ds)
	}
	sort.SliceStable(driverStates, func(i, j int) bool {
		cmp := strings.Compare(driverStates[i].uuid, driverStates[j].uuid)
		if cmp < 0 {
			return false
		}
		return true
	})
	timeNow := time.Now()
	for _, ts := range timelineList {
		s.updateAllDriversWithServingDriverState(ts)

		for len(sortedDeliveryRequestsToBeHandledQueue) > 0 && !sortedDeliveryRequestsToBeHandledQueue[0].GetCreatedAt().AsTime().After(ts) {
			remainingSortedDeliveryRequestsToBeHandled = append(remainingSortedDeliveryRequestsToBeHandled, sortedDeliveryRequestsToBeHandledQueue[0])
			sortedDeliveryRequestsToBeHandledQueue = sortedDeliveryRequestsToBeHandledQueue[1:]
		}
		var remainingSortedDeliveryRequestsToBeHandledTmp []*simulation.DeliveryRequest
		for _, req := range remainingSortedDeliveryRequestsToBeHandled {

			// TODO: implement different way to select drivers
			srcLoc := req.GetSrcLoc()
			// srcGeoIndex := h3.FromGeo(h3.GeoCoord{Latitude: srcLoc.GetLat(), Longitude: srcLoc.GetLng()}, h3Resolution)
			// srcRingGeoIndices := h3.KRing(srcGeoIndex, 3)
			// var driversNearbySrcLoc []*DriverState
			// for _, geoIndex := range srcRingGeoIndices {
			// 	driverUUID, ok := s.driverUUIDByGeoIndex[geoIndex]
			// 	if ok {
			// 		driversNearbySrcLoc = append(driversNearbySrcLoc, s.driverStateByUUID[driverUUID])
			// 	}
			// }
			driversNearbySrcLoc := []*DriverState{}
			for _, ds := range driverStates {
				driversNearbySrcLoc = append(driversNearbySrcLoc, ds)
			}

			if s.simulationRequest.GetUseAlternativeForDriverMatching() {
				sort.SliceStable(driversNearbySrcLoc, func(i, j int) bool {
					h3Src := h3.GeoCoord{
						Latitude:  srcLoc.GetLat(),
						Longitude: srcLoc.GetLng(),
					}
					srcToCurLocIDist := h3.PointDistKm(h3.GeoCoord{
						Latitude:  driversNearbySrcLoc[i].curLoc.GetLat(),
						Longitude: driversNearbySrcLoc[i].curLoc.GetLng(),
					}, h3Src)
					srcToCurLocJDist := h3.PointDistKm(h3.GeoCoord{
						Latitude:  driversNearbySrcLoc[j].curLoc.GetLat(),
						Longitude: driversNearbySrcLoc[j].curLoc.GetLng(),
					}, h3Src)
					if len(driversNearbySrcLoc[i].unfinishedRoutes) == 0 && len(driversNearbySrcLoc[j].unfinishedRoutes) == 0 {
						return srcToCurLocIDist < srcToCurLocJDist
					}

					if len(driversNearbySrcLoc[i].unfinishedRoutes) == 0 {
						lastUnfinishedRouteJ := driversNearbySrcLoc[j].unfinishedRoutes[len(driversNearbySrcLoc[j].unfinishedRoutes)-1]
						return srcToCurLocIDist < h3.PointDistKm(h3.GeoCoord{
							Latitude:  lastUnfinishedRouteJ.GetSrcLoc().GetLat(),
							Longitude: lastUnfinishedRouteJ.GetSrcLoc().GetLng(),
						}, h3Src)
					}
					if len(driversNearbySrcLoc[j].unfinishedRoutes) == 0 {
						lastUnfinishedRouteI := driversNearbySrcLoc[i].unfinishedRoutes[len(driversNearbySrcLoc[i].unfinishedRoutes)-1]
						return h3.PointDistKm(h3.GeoCoord{
							Latitude:  lastUnfinishedRouteI.GetSrcLoc().GetLat(),
							Longitude: lastUnfinishedRouteI.GetSrcLoc().GetLng(),
						}, h3Src) < srcToCurLocJDist
					}
					lastUnfinishedRouteI := driversNearbySrcLoc[i].unfinishedRoutes[len(driversNearbySrcLoc[i].unfinishedRoutes)-1]
					lastUnfinishedRouteJ := driversNearbySrcLoc[j].unfinishedRoutes[len(driversNearbySrcLoc[j].unfinishedRoutes)-1]

					return h3.PointDistKm(h3.GeoCoord{
						Latitude:  lastUnfinishedRouteI.GetSrcLoc().GetLat(),
						Longitude: lastUnfinishedRouteI.GetSrcLoc().GetLng(),
					}, h3Src) < h3.PointDistKm(h3.GeoCoord{
						Latitude:  lastUnfinishedRouteJ.GetSrcLoc().GetLat(),
						Longitude: lastUnfinishedRouteJ.GetSrcLoc().GetLng(),
					}, h3Src)
				})
			} else {
				sort.SliceStable(driversNearbySrcLoc, func(i, j int) bool {
					h3Src := h3.GeoCoord{
						Latitude:  srcLoc.GetLat(),
						Longitude: srcLoc.GetLng(),
					}
					return h3.PointDistM(h3.GeoCoord{
						Latitude:  driversNearbySrcLoc[i].curLoc.GetLat(),
						Longitude: driversNearbySrcLoc[i].curLoc.GetLng(),
					}, h3Src) < h3.PointDistM(h3.GeoCoord{
						Latitude:  driversNearbySrcLoc[j].curLoc.GetLat(),
						Longitude: driversNearbySrcLoc[j].curLoc.GetLng(),
					}, h3Src)
				})
			}

			isCurrentReqHandled := s.handleCurrentDeliveryRequestWithSuitableDrivers(driversNearbySrcLoc, ts, req)
			if !isCurrentReqHandled {
				remainingSortedDeliveryRequestsToBeHandledTmp = append(remainingSortedDeliveryRequestsToBeHandledTmp, req)
			} else {
				delete(s.notBeingServedDeliveryRequestUUIDSet, req.GetUuid())
			}
		}
		remainingSortedDeliveryRequestsToBeHandled = calculateRemainingSortedDeliveryRequestsToBeHandled(remainingSortedDeliveryRequestsToBeHandledTmp, ts)
	}
	s.updateAllDriversWithServingDriverState(time.Unix(math.MaxInt64, 0))
	return s.constructSimulationResponse(time.Since(timeNow))
}

func (s *realtimeSimulator) constructSimulationResponse(elapsedTime time.Duration) *simulation.SimulationResponse {
	driverRoutingDetailsByUUID := make(map[string]*simulation.DriverRoutingDetails, len(s.driverStateByUUID))
	deliveryRequestResultDetailsByUUID := make(map[string]*simulation.DeliveryRequestResultDetails, len(s.simulationRequest.GetDeliveryRequests()))
	for _, req := range s.simulationRequest.GetDeliveryRequests() {
		deliveryRequestResultDetailsByUUID[req.GetUuid()] = &simulation.DeliveryRequestResultDetails{
			Name:          req.GetName(),
			IsBeingServed: !s.notBeingServedDeliveryRequestUUIDSet[req.GetUuid()],
		}
	}
	for driverUUID, ds := range s.driverStateByUUID {
		routes := []*simulation.Route{}
		routes = append(routes, ds.finishedRoutes...)

		deliveryRequestUUIDSet := map[string]bool{}
		totalDistance := 0.0
		totalTimeSpent := int64(0)
		for _, route := range routes {
			totalDistance += route.GetDistance()
			totalTimeSpent += route.GetTimeWindow().GetEndedAt().GetSeconds() - route.GetTimeWindow().GetStartedAt().GetSeconds()
			if !deliveryRequestUUIDSet[route.GetDeliveryRequestUuid()] {
				deliveryRequestResultDetailsByUUID[route.GetDeliveryRequestUuid()].TotalWaitTime += route.GetTimeWindow().GetEndedAt().GetSeconds() - s.deliveryRequestByUUID[route.GetDeliveryRequestUuid()].GetSrcTimeWindow().GetStartedAt().GetSeconds()
			}
			if route.GetIsReqDst() {
				deliveryRequestResultDetailsByUUID[route.GetDeliveryRequestUuid()].TotalWaitTime += route.GetTimeWindow().GetEndedAt().GetSeconds() - s.deliveryRequestByUUID[route.GetDeliveryRequestUuid()].GetDstTimeWindow().GetStartedAt().GetSeconds()
			}
			deliveryRequestUUIDSet[route.GetDeliveryRequestUuid()] = true
		}
		driverRoutingDetailsByUUID[driverUUID] = &simulation.DriverRoutingDetails{
			Name:                ds.name,
			TotalDistance:       totalDistance,
			TotalTimeSpent:      totalTimeSpent,
			NumOfServedRequests: int32(len(deliveryRequestUUIDSet)),
			Routes:              routes,
		}
	}
	return &simulation.SimulationResponse{
		DeliveryRequestResultDetailsByUuid: deliveryRequestResultDetailsByUUID,
		DriverRoutingDetailsByUuid:         driverRoutingDetailsByUUID,
		RunningTime:                        int64(elapsedTime),
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

				boxCopy1 := binpack.NewBoxCopy(ds.packer.(*binpack.Box))
				boxCopy2 := binpack.NewBoxCopy(ds.packer.(*binpack.Box))
				boxCopy3 := binpack.NewBoxCopy(ds.packer.(*binpack.Box))

				// default
				ds.packer = binpack.NewBoxCopy(boxCopy1)
				routes, err1 := ds.handleDeliveryRequestWithDefaultRouting(lastUnfinishedRoute.GetTimeWindow().GetEndedAt().AsTime(), request, lastUnfinishedRoute.GetDstLoc())
				if err1 == nil {
					routesPackerPairs = append(routesPackerPairs, routesPackerPair{routes: routes, packer: ds.packer})
				}

				ds.packer = binpack.NewBoxCopy(boxCopy2)
				routes1, err2 := ds.handleDeliveryRequestWithRoutingMethodOne(lastUnfinishedRoute.GetTimeWindow().GetStartedAt().AsTime(), lastUnfinishedRoute, request)
				if err2 == nil {
					routesPackerPairs = append(routesPackerPairs, routesPackerPair{routes: routes1, packer: ds.packer})
				}

				ds.packer = binpack.NewBoxCopy(boxCopy3)
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
					ds.unfinishedRoutes = ds.unfinishedRoutes[:len(ds.unfinishedRoutes)-1]
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

				boxCopy1 := binpack.NewBoxCopy(ds.packer.(*binpack.Box))
				boxCopy2 := binpack.NewBoxCopy(ds.packer.(*binpack.Box))
				boxCopy3 := binpack.NewBoxCopy(ds.packer.(*binpack.Box))

				// default
				ds.packer = binpack.NewBoxCopy(boxCopy1)
				routes, err1 := ds.handleDeliveryRequestWithDefaultRouting(lastUnfinishedRoute.GetTimeWindow().GetEndedAt().AsTime(), request, lastUnfinishedRoute.GetDstLoc())
				if err1 == nil {
					routesPackerPairs = append(routesPackerPairs, routesPackerPair{routes: routes, packer: ds.packer})
				}

				ds.packer = binpack.NewBoxCopy(boxCopy2)
				routes1, err2 := ds.handleDeliveryRequestWithRoutingMethodOne(firstHalfRoute.GetTimeWindow().GetEndedAt().AsTime(), firstHalfRoute, request)
				if err2 == nil {
					routesPackerPairs = append(routesPackerPairs, routesPackerPair{routes: routes1, packer: ds.packer})
				}

				ds.packer = binpack.NewBoxCopy(boxCopy3)
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
	ds.numOfServingRequests++
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

package simulator

import (
	"errors"
	"math"
	"time"

	"go.uber.org/zap"

	"github.com/lht102/delivery/api/delivery"
	"github.com/lht102/delivery/api/delivery/simulation"
	"github.com/lht102/delivery/pkg/binpack"
	"github.com/lht102/delivery/pkg/distance"
	"github.com/uber/h3-go/v3"
	"google.golang.org/protobuf/types/known/timestamppb"
)

var (
	errExceedTimeWindow = errors.New("exceed time window constraint")
)

type DriverState struct {
	uuid                  string
	name                  string
	vehicleCapacity       *delivery.VehicleCapacity
	maxSpeedKmPerHour     float64
	numOfServingRequests  int
	numOfServedRequests   int
	status                delivery.DriverStatus
	packer                binpack.Packer
	curGeoIndex           h3.H3Index
	curLoc                *delivery.LatLng
	servingRequestsByUUID map[string]*simulation.DeliveryRequest
	unfinishedRoutes      []*simulation.Route
	finishedRoutes        []*simulation.Route
	createdAt             time.Time
	driverUUIDsByGeoIndex map[h3.H3Index][]string
	lastUpdatedTime       time.Time
	logger                *zap.Logger
}

type routesPackerPair struct {
	routes []*simulation.Route
	packer binpack.Packer
}

func newDriverState(curTime time.Time, driverRequest *simulation.DriverRequest, driverUUIDsByGeoIndex map[h3.H3Index][]string, logger *zap.Logger) *DriverState {
	var status delivery.DriverStatus
	if driverRequest.GetCreatedAt().AsTime().Unix() > curTime.Unix() {
		status = delivery.DriverStatus_DRIVER_STATUS_OFFLINE
	} else {
		status = delivery.DriverStatus_DRIVER_STATUS_AVAILABLE
	}
	vehicleCapacity := driverRequest.GetVehicleCapacity()
	loc := driverRequest.GetLoc()
	geo := h3.GeoCoord{
		Latitude:  loc.GetLat(),
		Longitude: loc.GetLng(),
	}
	geoIndex := h3.FromGeo(geo, h3Resolution)
	driverUUIDsByGeoIndex[geoIndex] = append(driverUUIDsByGeoIndex[geoIndex], driverRequest.GetUuid())
	return &DriverState{
		uuid:                  driverRequest.GetUuid(),
		name:                  driverRequest.GetName(),
		vehicleCapacity:       driverRequest.GetVehicleCapacity(),
		maxSpeedKmPerHour:     driverRequest.GetMaxSpeedKmPerHour(),
		status:                status,
		packer:                binpack.NewBox(int(vehicleCapacity.GetWeight()), int(vehicleCapacity.GetWidth()), int(vehicleCapacity.GetLength()), int(vehicleCapacity.GetHeight())),
		curGeoIndex:           h3.FromGeo(geo, h3Resolution),
		curLoc:                loc,
		servingRequestsByUUID: map[string]*simulation.DeliveryRequest{},
		unfinishedRoutes:      []*simulation.Route{},
		finishedRoutes:        []*simulation.Route{},
		createdAt:             driverRequest.GetCreatedAt().AsTime(),
		driverUUIDsByGeoIndex: driverUUIDsByGeoIndex,
		lastUpdatedTime:       curTime,
		logger:                logger,
	}
}

func (ds *DriverState) updateInternalStateWithTime(curTime time.Time) {
	ds.lastUpdatedTime = curTime
	if ds.status == delivery.DriverStatus_DRIVER_STATUS_AVAILABLE {
		return
	}
	if ds.status == delivery.DriverStatus_DRIVER_STATUS_OFFLINE {
		if ds.createdAt.UTC().Unix() <= curTime.UTC().Unix() {
			ds.status = delivery.DriverStatus_DRIVER_STATUS_AVAILABLE
		}
		return
	}
	finishRouteCnt := 0
	curLoc := ds.curLoc
	for _, route := range ds.unfinishedRoutes {
		if curTime.UTC().Unix() < route.GetTimeWindow().GetEndedAt().AsTime().UTC().Unix() {
			break
		}
		ds.finishedRoutes = append(ds.finishedRoutes, route)
		curLoc = route.GetDstLoc()
		finishRouteCnt++
		if route.GetIsReqDst() {
			ds.numOfServingRequests--
			ds.numOfServedRequests++
			delete(ds.servingRequestsByUUID, route.GetDeliveryRequestUuid())
			err := ds.packer.RemoveItem(route.GetDeliveryRequestUuid())
			if err != nil {
				ds.logger.Error("driver failed to remove item", zap.String("driver_uuid", ds.uuid), zap.String("delivery_request_uuid", route.GetDeliveryRequestUuid()))
			}
		}
	}
	ds.unfinishedRoutes = ds.unfinishedRoutes[finishRouteCnt:]

	if len(ds.unfinishedRoutes) == 0 {
		ds.curLoc = curLoc
		ds.status = delivery.DriverStatus_DRIVER_STATUS_AVAILABLE
	} else {
		currentUnfinishedRoute := ds.unfinishedRoutes[0]
		nextLoc := currentUnfinishedRoute.GetDstLoc()
		midLat, midLng := distance.CalculateIntermediatePointWithTimeWindow(
			curLoc.GetLat(), curLoc.GetLng(),
			nextLoc.GetLat(), nextLoc.GetLng(),
			currentUnfinishedRoute.GetTimeWindow().GetStartedAt().AsTime(),
			currentUnfinishedRoute.GetTimeWindow().GetEndedAt().AsTime(),
			curTime)
		ds.curLoc = &delivery.LatLng{
			Lat: midLat,
			Lng: midLng,
		}
	}
	searchedIndex := searchElementFromStringSlice(ds.driverUUIDsByGeoIndex[ds.curGeoIndex], ds.uuid)
	if searchedIndex != -1 {
		removeElementFromStringSlice(ds.driverUUIDsByGeoIndex[ds.curGeoIndex], searchedIndex)
	}
	geo := h3.GeoCoord{
		Latitude:  ds.curLoc.GetLat(),
		Longitude: ds.curLoc.GetLng(),
	}
	ds.curGeoIndex = h3.FromGeo(geo, h3Resolution)
	ds.driverUUIDsByGeoIndex[ds.curGeoIndex] = append(ds.driverUUIDsByGeoIndex[ds.curGeoIndex], ds.uuid)
}

func (ds *DriverState) Status() delivery.DriverStatus {
	return ds.status
}

func (ds *DriverState) NumOfServingRequests() int {
	return ds.numOfServingRequests
}

func (ds *DriverState) NumOfServedRequests() int {
	return ds.numOfServedRequests
}

func findSuitableRoutingPackerPair(routesPackerPairs []routesPackerPair) (routesPackerPair, error) {
	if len(routesPackerPairs) == 0 {
		return routesPackerPair{}, errors.New("not able to handle incoming request")
	}

	minDuration := int64(math.MaxInt64)
	res := routesPackerPairs[0]
	for _, p := range routesPackerPairs {
		sumOfDuration := int64(0)
		for _, r := range p.routes {
			d := r.GetTimeWindow().GetEndedAt().GetSeconds() - r.GetTimeWindow().GetStartedAt().GetSeconds()
			sumOfDuration += d
		}
		if sumOfDuration < minDuration {
			minDuration = sumOfDuration
			res = p
		}
	}
	return res, nil
}

func (ds *DriverState) handleDeliveryRequestWithRoutingMethodOne(startTime time.Time, lastUnfinishedRoute *simulation.Route, request *simulation.DeliveryRequest, isServingLastRoute bool) ([]*simulation.Route, error) {
	// S(i) -> S(i+1) -> D(i+1) -> D(i)
	startLoc := lastUnfinishedRoute.GetSrcLoc()
	if isServingLastRoute {
		startLoc = lastUnfinishedRoute.GetDstLoc()
	}
	r1, err := ds.getRoute(startTime, request, request.GetSrcTimeWindow(), startLoc, request.GetSrcLoc(), nil, false)
	if err != nil {
		return nil, err
	}
	r2, err := ds.getRoute(r1.GetTimeWindow().GetEndedAt().AsTime(), request, request.GetDstTimeWindow(), request.GetSrcLoc(), request.GetDstLoc(), newItemWithRequest(request), true)
	if err != nil {
		return nil, err
	}
	err = ds.packer.RemoveItem(request.GetUuid())
	if err != nil {
		return nil, err
	}
	lastRequest := ds.servingRequestsByUUID[lastUnfinishedRoute.GetDeliveryRequestUuid()]
	r3, err := ds.getRoute(r2.GetTimeWindow().GetEndedAt().AsTime(), lastRequest, lastRequest.GetDstTimeWindow(), request.GetDstLoc(), lastRequest.GetDstLoc(), nil, true)
	if err != nil {
		return nil, err
	}
	return []*simulation.Route{r1, r2, r3}, nil
}

func (ds *DriverState) handleDeliveryRequestWithRoutingMethodTwo(startTime time.Time, lastUnfinishedRoute *simulation.Route, request *simulation.DeliveryRequest, isServingLastRoute bool) ([]*simulation.Route, error) {
	// S(i) -> S(i+1) -> D(i) -> D(i+1)
	startLoc := lastUnfinishedRoute.GetSrcLoc()
	if isServingLastRoute {
		startLoc = lastUnfinishedRoute.GetDstLoc()
	}
	r1, err := ds.getRoute(startTime, request, request.GetSrcTimeWindow(), startLoc, request.GetSrcLoc(), nil, false)
	if err != nil {
		return nil, err
	}
	lastRequest := ds.servingRequestsByUUID[lastUnfinishedRoute.GetDeliveryRequestUuid()]
	r2, err := ds.getRoute(r1.GetTimeWindow().GetEndedAt().AsTime(), lastRequest, lastRequest.GetDstTimeWindow(), request.GetSrcLoc(), lastRequest.GetDstLoc(), newItemWithRequest(request), true)
	if err != nil {
		return nil, err
	}
	err = ds.packer.RemoveItem(lastRequest.GetUuid())
	if err != nil {
		return nil, err
	}
	r3, err := ds.getRoute(r2.GetTimeWindow().GetEndedAt().AsTime(), request, request.GetDstTimeWindow(), lastRequest.GetDstLoc(), request.GetDstLoc(), nil, true)
	if err != nil {
		return nil, err
	}
	return []*simulation.Route{r1, r2, r3}, nil
}

func (ds *DriverState) handleDeliveryRequestWithDefaultRouting(startTime time.Time, request *simulation.DeliveryRequest, startLoc *delivery.LatLng) ([]*simulation.Route, error) {
	srcLoc := request.GetSrcLoc()
	srcTW := request.GetSrcTimeWindow()
	dstLoc := request.GetDstLoc()
	dstTW := request.GetDstTimeWindow()

	r1, err := ds.getRoute(startTime, request, srcTW, startLoc, srcLoc, nil, false)
	if err != nil {
		return nil, err
	}
	r2, err := ds.getRoute(r1.GetTimeWindow().GetEndedAt().AsTime(), request, dstTW, srcLoc, dstLoc, newItemWithRequest(request), true)
	if err != nil {
		return nil, err
	}
	return []*simulation.Route{r1, r2}, nil
}

func (ds *DriverState) getRoute(curTime time.Time, request *simulation.DeliveryRequest, restrictedTimeWindow *delivery.TimeWindow, srcLoc, dstLoc *delivery.LatLng, item *binpack.Item, isRequestDst bool) (*simulation.Route, error) {
	tw1, speed1, distKm, err := calculateRequiredTimeWindowAndSpeedKmPerHour(curTime, restrictedTimeWindow, srcLoc, dstLoc, ds.maxSpeedKmPerHour)
	if err != nil {
		return nil, err
	}
	if item != nil {
		err = ds.packer.AddItem(item)
		if err != nil {
			return nil, err
		}
	}
	r1 := &simulation.Route{
		DeliveryRequestUuid: request.GetUuid(),
		SrcLoc:              srcLoc,
		DstLoc:              dstLoc,
		TimeWindow:          tw1,
		Distance:            distKm,
		VehicleState: &delivery.VehicleState{
			VehicleCapacity: ds.vehicleCapacity,
			BoxItems:        binpack.BoxItemsToAPIBoxItems(ds.packer.BoxItems()),
		},
		SpeedKmPerHour: speed1,
		IsReqDst:       isRequestDst,
	}
	return r1, nil
}

func calculateRequiredTimeWindowAndSpeedKmPerHour(curTime time.Time, restrictedTimeWindow *delivery.TimeWindow, curLoc *delivery.LatLng, dstLoc *delivery.LatLng, maxSpeedKmPerHour float64) (*delivery.TimeWindow, float64, float64, error) {
	distKm := h3.PointDistKm(
		h3.GeoCoord{Latitude: curLoc.GetLat(), Longitude: curLoc.GetLng()},
		h3.GeoCoord{Latitude: dstLoc.GetLat(), Longitude: dstLoc.GetLng()})
	curLocToDstLocRequiredDuration, err := distance.CalculateTravelingTime(distKm, maxSpeedKmPerHour)
	if err != nil {
		return nil, 0, 0, err
	}
	if curTime.Add(curLocToDstLocRequiredDuration).After(restrictedTimeWindow.GetEndedAt().AsTime()) {
		return nil, 0, distKm, errExceedTimeWindow
	}
	if curTime.Add(curLocToDstLocRequiredDuration).Before(restrictedTimeWindow.GetStartedAt().AsTime()) {
		requiredSpeed := distance.CalculateRequiredSpeedKmPerHour(distKm, restrictedTimeWindow.GetStartedAt().AsTime().Sub(curTime))
		return &delivery.TimeWindow{
			StartedAt: &timestamppb.Timestamp{Seconds: curTime.UTC().Unix()},
			EndedAt:   &timestamppb.Timestamp{Seconds: restrictedTimeWindow.GetStartedAt().AsTime().UTC().Unix()},
		}, requiredSpeed, distKm, nil
	}
	return &delivery.TimeWindow{
		StartedAt: &timestamppb.Timestamp{Seconds: curTime.UTC().Unix()},
		EndedAt:   &timestamppb.Timestamp{Seconds: curTime.Add(curLocToDstLocRequiredDuration).UTC().Unix()},
	}, maxSpeedKmPerHour, distKm, nil
}

func newItemWithRequest(request *simulation.DeliveryRequest) *binpack.Item {
	return binpack.NewItemWithUUID(
		request.GetUuid(),
		int(request.GetGoodsMetadata().GetWeight()),
		int(request.GetGoodsMetadata().GetWidth()),
		int(request.GetGoodsMetadata().GetLength()),
		int(request.GetGoodsMetadata().GetHeight()))
}

func removeElementFromStringSlice(s []string, i int) []string {
	s[len(s)-1], s[i] = s[i], s[len(s)-1]
	return s[:len(s)-1]
}

func searchElementFromStringSlice(s []string, target string) int {
	for i, v := range s {
		if v == target {
			return i
		}
	}
	return -1
}

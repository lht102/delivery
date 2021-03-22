package simulator

import (
	"errors"
	"log"
	"time"

	"github.com/lht102/delivery/api/delivery"
	"github.com/lht102/delivery/api/delivery/simulation"
	"github.com/lht102/delivery/pkg/binpack"
	"github.com/lht102/delivery/pkg/distance"
	"github.com/uber/h3-go/v3"
	"google.golang.org/protobuf/types/known/timestamppb"
)

type DriverEvent string

type DriverStatus string

const (
	driverStatusUndefined DriverStatus = "DRIVER_STATUS_UNDEFINED"
	driverStatusOffline                = "DRIVER_STATUS_OFFLINE"
	driverStatusAvailable              = "DRIVER_STATUS_AVAILABLE"
	driverStatusServing                = "DRIVER_STATUS_SERVING"

	driverEventTakeRequest   DriverEvent = "DRIVER_EVENT_TAKE_REQUEST"
	driverEventFinishRequest             = "DRIVER_EVENT_FINISH_REQUEST"
)

var (
	errExceedTimeWindow = errors.New("exceed time window constraint")
)

type DriverState struct {
	uuid                  string
	vehicleCapacity       *delivery.VehicleCapacity
	maxSpeedKmPerHour     float64
	numOfServingRequests  int
	status                delivery.DriverStatus
	packer                binpack.Packer
	geoIndex              h3.H3Index
	loc                   *delivery.LatLng
	servingRequestsByUUID map[string]*simulation.DeliveryRequest
	unfinishedRoutes      []*simulation.Route
	finishedRoutes        []*simulation.Route
	createdAt             time.Time
	driverUUIDByGeoIndex  map[h3.H3Index]string
	lastUpdatedTime       time.Time
}

func newDriverState(curTime time.Time, driverRequest *simulation.DriverRequest, driverUUIDByGeoIndex map[h3.H3Index]string) *DriverState {
	var status delivery.DriverStatus
	if driverRequest.GetCreatedAt().AsTime().UTC().Unix() > int64(curTime.UTC().Unix()) {
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
	return &DriverState{
		uuid:                  driverRequest.GetUuid(),
		vehicleCapacity:       driverRequest.GetVehicleCapacity(),
		maxSpeedKmPerHour:     driverRequest.GetMaxSpeedKmPerHour(),
		status:                status,
		packer:                binpack.NewBox(int(vehicleCapacity.GetWeight()), int(vehicleCapacity.GetWidth()), int(vehicleCapacity.GetLength()), int(vehicleCapacity.GetHeight())),
		geoIndex:              h3.FromGeo(geo, h3Resolution),
		loc:                   loc,
		servingRequestsByUUID: map[string]*simulation.DeliveryRequest{},
		unfinishedRoutes:      []*simulation.Route{},
		finishedRoutes:        []*simulation.Route{},
		createdAt:             driverRequest.GetCreatedAt().AsTime(),
		lastUpdatedTime:       curTime,
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
	curLoc := ds.loc
	var prevRequestID string
	for _, route := range ds.unfinishedRoutes {
		if prevRequestID != "" && prevRequestID != route.GetDeliveryRequestUuid() {
			ds.numOfServingRequests--
			err := ds.packer.RemoveItem(prevRequestID)
			if err != nil {
				log.Println("packer", err)
			}
		}
		prevRequestID = route.GetDeliveryRequestUuid()
		tw := route.GetTimeWindow()
		if curTime.UTC().Unix() >= tw.GetEndedAt().AsTime().UTC().Unix() {
			ds.finishedRoutes = append(ds.finishedRoutes, route)
			curLoc = route.GetDstLoc()
			finishRouteCnt++
		} else {
			break
		}
	}
	ds.unfinishedRoutes = ds.unfinishedRoutes[finishRouteCnt:]

	if len(ds.unfinishedRoutes) == 0 {
		ds.loc = curLoc
		ds.status = delivery.DriverStatus_DRIVER_STATUS_AVAILABLE
	} else {
		currentUnfinishedRoute := ds.unfinishedRoutes[0]
		nextLoc := currentUnfinishedRoute.GetDstLoc()
		midLat, midLng := distance.CalculateMiddleLocation(curLoc.GetLat(), curLoc.GetLng(), nextLoc.GetLat(), nextLoc.GetLng(),
			currentUnfinishedRoute.GetTimeWindow().GetStartedAt().AsTime(),
			currentUnfinishedRoute.GetTimeWindow().GetEndedAt().AsTime(),
			curTime)
		ds.loc = &delivery.LatLng{
			Lat: midLat,
			Lng: midLng,
		}
	}
	delete(ds.driverUUIDByGeoIndex, ds.geoIndex)
	geo := h3.GeoCoord{
		Latitude:  ds.loc.GetLat(),
		Longitude: ds.loc.GetLng(),
	}
	ds.geoIndex = h3.FromGeo(geo, h3Resolution)
	ds.driverUUIDByGeoIndex[ds.geoIndex] = ds.uuid
}

func (ds *DriverState) Status() delivery.DriverStatus {
	return ds.status
}

func (ds *DriverState) NumOfServingRequests() int {
	return ds.numOfServingRequests
}

func (ds *DriverState) HandleDeliveryRequest(curTime time.Time, request *simulation.DeliveryRequest) error {
	if ds.lastUpdatedTime.UTC().Unix() != curTime.UTC().Unix() {
		ds.updateInternalStateWithTime(curTime)
	}
	if ds.Status() == delivery.DriverStatus_DRIVER_STATUS_AVAILABLE {
		srcLoc := request.GetSrcLoc()
		srcTD := request.GetSrcTimeWindow()
		dstLoc := request.GetDstLoc()
		dstTD := request.GetDstTimeWindow()

		td1, speed1, err := calculateRequiredTimeWindowAndSpeedKmPerHour(curTime, srcTD, ds.loc, srcLoc, ds.maxSpeedKmPerHour)
		if err != nil {
			return err
		}
		r1 := &simulation.Route{
			DeliveryRequestUuid: request.GetUuid(),
			SrcLoc:              ds.loc,
			DstLoc:              srcLoc,
			TimeWindow:          td1,
			VehicleState: &delivery.VehicleState{
				VehicleCapacity: ds.vehicleCapacity,
				BoxItems:        binpack.BoxItemsToAPIBoxItems(ds.packer.BoxItems()),
			},
			SpeedKmPerHour: speed1,
		}
		td2, speed2, err := calculateRequiredTimeWindowAndSpeedKmPerHour(td1.GetEndedAt().AsTime(), dstTD, srcLoc, dstLoc, ds.maxSpeedKmPerHour)
		if err != nil {
			return err
		}
		err = ds.packer.AddItem(binpack.NewItemWithUUID(
			request.GetUuid(),
			int(request.GetGoodsMetadata().GetWeight()),
			int(request.GetGoodsMetadata().GetWidth()),
			int(request.GetGoodsMetadata().GetLength()),
			int(request.GetGoodsMetadata().GetHeight()),
		))
		if err != nil {
			return err
		}
		r2 := &simulation.Route{
			DeliveryRequestUuid: request.GetUuid(),
			SrcLoc:              srcLoc,
			DstLoc:              dstLoc,
			TimeWindow:          td2,
			VehicleState: &delivery.VehicleState{
				VehicleCapacity: ds.vehicleCapacity,
				BoxItems:        binpack.BoxItemsToAPIBoxItems(ds.packer.BoxItems()),
			},
			SpeedKmPerHour: speed2,
		}
		ds.unfinishedRoutes = append(ds.unfinishedRoutes, r1, r2)
	} else if ds.Status() == delivery.DriverStatus_DRIVER_STATUS_SERVING {

	}
	return nil
}

func calculateRequiredTimeWindowAndSpeedKmPerHour(curTime time.Time, restrictedTimewindow *delivery.TimeWindow, curLoc *delivery.LatLng, dstLoc *delivery.LatLng, maxSpeedKmPerHour float64) (*delivery.TimeWindow, float64, error) {
	curLocToSrcLocRequiredDuration := distance.CalculateTravelingTime(curLoc.GetLat(), curLoc.GetLng(), dstLoc.GetLat(), dstLoc.GetLng(), maxSpeedKmPerHour)
	if curTime.Add(curLocToSrcLocRequiredDuration).After(restrictedTimewindow.GetEndedAt().AsTime()) {
		return nil, 0, errExceedTimeWindow
	}
	if curTime.Add(curLocToSrcLocRequiredDuration).Before(restrictedTimewindow.GetStartedAt().AsTime()) {
		requiredSpeed := distance.CalculateRequiredSpeedKmPerHour(curLoc.GetLat(), curLoc.GetLng(), dstLoc.GetLat(), dstLoc.GetLng(), restrictedTimewindow.GetStartedAt().AsTime().Sub(curTime))
		return &delivery.TimeWindow{
			StartedAt: &timestamppb.Timestamp{Seconds: curTime.UTC().Unix()},
			EndedAt:   &timestamppb.Timestamp{Seconds: restrictedTimewindow.GetStartedAt().AsTime().UTC().Unix()},
		}, requiredSpeed, nil
	}
	return &delivery.TimeWindow{
		StartedAt: &timestamppb.Timestamp{Seconds: curTime.UTC().Unix()},
		EndedAt:   &timestamppb.Timestamp{Seconds: curTime.Add(curLocToSrcLocRequiredDuration).UTC().Unix()},
	}, maxSpeedKmPerHour, nil
}

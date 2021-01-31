package simulator

import (
	"sort"
	"time"

	"github.com/lht102/delivery/api/delivery"
	"github.com/lht102/delivery/api/delivery/simulation"
	"github.com/uber/h3-go"
)

var (
	h3Resolution = 8
)

type realtimeSimulator struct {
	driverStateByUUID      map[string]*DriverState
	availableDriverUUIDSet map[string]bool
	servingDriverUUIDSet   map[string]bool
	driverUUIDByGeoIndex   map[h3.H3Index]string
}

func (s *realtimeSimulator) handleRequest(req *simulation.SimulationRequest) {
	curTime := req.GetCreatedAt()
	for _, driverReq := range req.GetDriverRequests() {
		driverState := newDriverState(curTime.AsTime(), driverReq, s.driverUUIDByGeoIndex)
		s.driverStateByUUID[driverReq.GetUuid()] = driverState
		if driverState.Status() == delivery.DriverStatus_DRIVER_STATUS_AVAILABLE {
			s.availableDriverUUIDSet[driverReq.GetUuid()] = true
		}
	}

	sortedDeliveryRequests := make([]*simulation.DeliveryRequest, len(req.GetDeliveryRequests()))
	for i := range req.GetDeliveryRequests() {
		sortedDeliveryRequests[i] = req.GetDeliveryRequests()[i]
	}
	sort.Slice(sortedDeliveryRequests, func(i, j int) bool {
		return sortedDeliveryRequests[i].GetCreatedAt().AsTime().Before(sortedDeliveryRequests[j].GetCreatedAt().AsTime())
	})

	timestampSet := map[int64]bool{}
	for _, driverReq := range req.GetDriverRequests() {
		timestampSet[driverReq.GetCreatedAt().AsTime().UTC().Unix()] = true
	}
	for _, req := range sortedDeliveryRequests {
		createdAt := req.GetCreatedAt()
		srcTD := req.GetSrcTimeWindow()
		dstTD := req.GetDstTimeWindow()
		timestampSet[createdAt.AsTime().UTC().Unix()] = true
		timestampSet[srcTD.GetStartedAt().AsTime().UTC().Unix()] = true
		timestampSet[srcTD.GetEndedAt().AsTime().UTC().Unix()] = true
		timestampSet[dstTD.GetStartedAt().AsTime().UTC().Unix()] = true
		timestampSet[dstTD.GetEndedAt().AsTime().UTC().Unix()] = true

	}
	timeline := make([]int64, len(timestampSet))
	i := 0
	for ts := range timestampSet {
		timeline[i] = ts
		i++
	}
	sort.Slice(timeline, func(i, j int) bool {
		return timeline[i] < timeline[j]
	})

	requestsToBeHandled := []*simulation.DeliveryRequest{}
	for _, ts := range timeline {
		if len(sortedDeliveryRequests) == 0 {
			break
		}
		for len(sortedDeliveryRequests) != 0 {
			if sortedDeliveryRequests[0].GetCreatedAt().AsTime().UTC().Unix() > ts {
				break
			}
			requestsToBeHandled = append(requestsToBeHandled, sortedDeliveryRequests[0])
			sortedDeliveryRequests = sortedDeliveryRequests[1:]
		}

		for id := range s.servingDriverUUIDSet {
			s.driverStateByUUID[id].updateInternalStateWithTime(time.Unix(ts, 0))
			if s.driverStateByUUID[id].Status() == delivery.DriverStatus_DRIVER_STATUS_AVAILABLE {
				s.availableDriverUUIDSet[id] = true
				delete(s.servingDriverUUIDSet, id)
			}
		}

		for _, req := range requestsToBeHandled {
			srcLoc := req.GetSrcLoc()
			srcGeoIndex := h3.FromGeo(h3.GeoCoord{Latitude: srcLoc.GetLat(), Longitude: srcLoc.GetLng()}, h3Resolution)
			srcRingGeoIndexs := h3.KRing(srcGeoIndex, 1)
			driversNearbySrcLoc := []*DriverState{}
			for _, geoIndex := range srcRingGeoIndexs {
				driverUUID, ok := s.driverUUIDByGeoIndex[geoIndex]
				if ok {
					driversNearbySrcLoc = append(driversNearbySrcLoc, s.driverStateByUUID[driverUUID])
				}
			}
			sort.Slice(driversNearbySrcLoc, func(i, j int) bool {
				return driversNearbySrcLoc[i].NumOfServingRequests() < driversNearbySrcLoc[j].NumOfServingRequests()
			})
			for _, driverState := range driversNearbySrcLoc {

			}
		}
	}
}

func (s *realtimeSimulator) findSuitableDriverUUID(lat float64, lng float64) string {

}

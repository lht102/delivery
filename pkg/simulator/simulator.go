package simulator

import (
	"sort"

	"github.com/lht102/delivery/api/delivery/simulation"
	"github.com/uber/h3-go"
)

type client struct {
}

func (c *client) handleRequest(req *simulation.SimulationRequest) {
	sort.Slice(req.DeliveryRequests, func(i, j int) bool {
		return req.GetDeliveryRequests()[i].GetArrivedAt().AsTime().Before(req.GetDeliveryRequests()[j].GetArrivedAt().AsTime())
	})

	for _, deliveryReq := range req.GetDeliveryRequests() {
		srcLoc := deliveryReq.GetSrcLoc()
	}

	for _, driverReq := range req.GetDriverRequests() {
		loc := driverReq.GetLoc()
		geo := h3.GeoCoord{
			Latitude:  loc.GetLat(),
			Longitude: loc.GetLng(),
		}
		idx := h3.FromGeo(geo, 8)
	}
}

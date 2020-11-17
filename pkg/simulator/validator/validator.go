package validator

import (
	"errors"

	"github.com/lht102/delivery/api/delivery"
	"github.com/lht102/delivery/api/delivery/simulation"
)

var (
	errMissingCreatedAt       = errors.New("missing created_at")
	errMissingArrivedAt       = errors.New("missing arrived_at")
	errMissingDstTimeWindow   = errors.New("missing dst_time_window")
	errMissingGoodsMetadata   = errors.New("missing goods_metadata")
	errMissingVehicleCapacity = errors.New("missing vehicle_capacity")

	errCreatedAtAfterArrivedAt = errors.New("created_at after arrived_at")

	errInvalidTimeWindow = errors.New("invalid time window")
	errInvalidLength     = errors.New("invalid length")
	errInvalidWidth      = errors.New("invalid width")
	errInvalidHeight     = errors.New("invalid height")
	errInvalidWeight     = errors.New("invalid weight")
)

func ValidateSimulationRequest(simulationRequest *simulation.SimulationRequest) error {
	createdAt := simulationRequest.GetCreatedAt()
	if createdAt == nil {
		return errMissingCreatedAt
	}

	deliveryRequests := simulationRequest.GetDeliveryRequests()
	for _, req := range deliveryRequests {
		if err := validateDeliveryRequest(req); err != nil {
			return err
		}

		if createdAt.AsTime().After(req.GetArrivedAt().AsTime()) {
			return errCreatedAtAfterArrivedAt
		}
	}

	drivers := simulationRequest.GetDriverRequests()
	for _, driver := range drivers {
		vehicleCapcity := driver.GetVehicleCapacity()
		if vehicleCapcity == nil {
			return errMissingVehicleCapacity
		}
		if vehicleCapcity.GetLength() < 1 {
			return errInvalidLength
		}
		if vehicleCapcity.GetWidth() < 1 {
			return errInvalidWidth
		}
		if vehicleCapcity.GetHeight() < 1 {
			return errInvalidHeight
		}
		if vehicleCapcity.GetWeight() < 1 {
			return errInvalidWeight
		}
	}
	return nil
}

func validateTimeWindow(timeWindow *delivery.TimeWindow) error {
	if timeWindow.GetStartedAt().AsTime().After(timeWindow.GetEndedAt().AsTime()) {
		return errInvalidTimeWindow
	}
	return nil
}

func validateDeliveryRequest(deliveryRequest *simulation.DeliveryRequest) error {
	arrivedAt := deliveryRequest.GetArrivedAt()
	if arrivedAt == nil {
		return errMissingArrivedAt
	}

	dstW := deliveryRequest.GetDstTimeWindow()
	if dstW == nil {
		return errMissingDstTimeWindow
	}
	if err := validateTimeWindow(dstW); err != nil {
		return err
	}
	srcW := deliveryRequest.GetSrcTimeWindow()
	if srcW != nil {
		if err := validateTimeWindow(srcW); err != nil {
			return err
		}
	}

	goodsMetadata := deliveryRequest.GetGoodsMetadata()
	if goodsMetadata == nil {
		return errMissingGoodsMetadata
	}
	if goodsMetadata.GetLength() < 1 {
		return errInvalidLength
	}
	if goodsMetadata.GetWidth() < 1 {
		return errInvalidWidth
	}
	if goodsMetadata.GetHeight() < 1 {
		return errInvalidHeight
	}
	if goodsMetadata.GetWeight() < 1 {
		return errInvalidWeight
	}
	return nil
}

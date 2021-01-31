package validator

import (
	"errors"

	"github.com/google/uuid"
	"github.com/lht102/delivery/api/delivery"
	"github.com/lht102/delivery/api/delivery/simulation"
)

var (
	errMissingCreatedAt       = errors.New("missing created_at")
	errMissingDstTimeWindow   = errors.New("missing dst_time_window")
	errMissingGoodsMetadata   = errors.New("missing goods_metadata")
	errMissingVehicleCapacity = errors.New("missing vehicle_capacity")

	errSimulationRequestCreatedAtAfterDeliveryRequestCreatedAt = errors.New("simulation request created_at after delivery request created_at")

	errInvalidTimeWindow = errors.New("invalid time window")
	errInvalidLength     = errors.New("invalid length")
	errInvalidWidth      = errors.New("invalid width")
	errInvalidHeight     = errors.New("invalid height")
	errInvalidWeight     = errors.New("invalid weight")
	errInvalidMaxSpeed   = errors.New("invalid max speed for vehicle")
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

		if createdAt.AsTime().After(req.GetCreatedAt().AsTime()) {
			return errSimulationRequestCreatedAtAfterDeliveryRequestCreatedAt
		}
	}

	drivers := simulationRequest.GetDriverRequests()
	for _, driver := range drivers {
		if err := isValidUUID(driver.GetUuid()); err != nil {
			return err
		}
		if driver.GetMaxSpeedKmPerHour() <= 0 {
			return errInvalidMaxSpeed
		}
		vehicleCapcity := driver.GetVehicleCapacity()
		if vehicleCapcity == nil {
			return errMissingVehicleCapacity
		}
		if vehicleCapcity.GetLength() <= 0 {
			return errInvalidLength
		}
		if vehicleCapcity.GetWidth() <= 0 {
			return errInvalidWidth
		}
		if vehicleCapcity.GetHeight() <= 0 {
			return errInvalidHeight
		}
		if vehicleCapcity.GetWeight() <= 0 {
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
	if err := isValidUUID(deliveryRequest.GetUuid()); err != nil {
		return err
	}
	createdAt := deliveryRequest.GetCreatedAt()
	if createdAt == nil {
		return errMissingCreatedAt
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
	if err := isValidUUID(goodsMetadata.GetUuid()); err != nil {
		return err
	}
	if goodsMetadata.GetLength() <= 0 {
		return errInvalidLength
	}
	if goodsMetadata.GetWidth() <= 0 {
		return errInvalidWidth
	}
	if goodsMetadata.GetHeight() <= 0 {
		return errInvalidHeight
	}
	if goodsMetadata.GetWeight() <= 0 {
		return errInvalidWeight
	}
	return nil
}

func isValidUUID(u string) error {
	_, err := uuid.Parse(u)
	return err
}

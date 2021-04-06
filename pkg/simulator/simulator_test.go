package simulator

import (
	"time"

	"github.com/lht102/delivery/api/delivery"
	"github.com/lht102/delivery/api/delivery/simulation"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
	"go.uber.org/zap"
	"google.golang.org/protobuf/types/known/timestamppb"
)

var _ = Describe("Simulator", func() {
	Context("handleDeliveryRequest()", func() {
		var (
			simulator *realtimeSimulator
			request   *simulation.SimulationRequest
			logger    *zap.Logger
		)

		BeforeEach(func() {
			logger, _ = zap.NewDevelopment()
			request = &simulation.SimulationRequest{
				DeliveryRequests: []*simulation.DeliveryRequest{
					{
						Uuid: "44a9a990-8148-4ed5-a16a-4e29a28c3da3",
						Name: "Delivery Request 1",
						GoodsMetadata: &delivery.GoodsMetadata{
							Name:   "Goods 1",
							Weight: 1,
							Length: 1,
							Width:  1,
							Height: 1,
						},
						SrcLoc: &delivery.LatLng{
							// Tai Wo Hau Station
							Lat: 22.370812,
							Lng: 114.125062,
						},
						DstLoc: &delivery.LatLng{
							// Tsuen Wan Station
							Lat: 22.373688,
							Lng: 114.117688,
						},
						SrcTimeWindow: &delivery.TimeWindow{
							StartedAt: timestamppb.New(time.Date(2020, 1, 1, 0, 8, 0, 0, time.UTC)),
							EndedAt:   timestamppb.New(time.Date(2020, 1, 1, 0, 11, 0, 0, time.UTC)),
						},
						DstTimeWindow: &delivery.TimeWindow{
							StartedAt: timestamppb.New(time.Date(2020, 1, 1, 0, 9, 0, 0, time.UTC)),
							EndedAt:   timestamppb.New(time.Date(2020, 1, 1, 0, 14, 0, 0, time.UTC)),
						},
						CreatedAt: timestamppb.New(time.Date(2020, 1, 1, 0, 6, 0, 0, time.UTC)),
					},
					{
						Uuid: "0413caa7-e084-404b-9b0c-50953429de0b",
						Name: "Delivery Request 2",
						GoodsMetadata: &delivery.GoodsMetadata{
							Name:   "Goods 2",
							Weight: 2,
							Length: 1,
							Width:  1,
							Height: 1,
						},
						SrcLoc: &delivery.LatLng{
							// Tsuen Wan Smart Identity Card Replacement Centre
							Lat: 22.368563,
							Lng: 114.122187,
						},
						DstLoc: &delivery.LatLng{
							// Tsuen Cheong Centre
							Lat: 22.371437,
							Lng: 114.119937,
						},
						SrcTimeWindow: &delivery.TimeWindow{
							StartedAt: timestamppb.New(time.Date(2020, 1, 1, 0, 8, 35, 0, time.UTC)),
							EndedAt:   timestamppb.New(time.Date(2020, 1, 1, 0, 11, 0, 0, time.UTC)),
						},
						DstTimeWindow: &delivery.TimeWindow{
							StartedAt: timestamppb.New(time.Date(2020, 1, 1, 0, 9, 0, 0, time.UTC)),
							EndedAt:   timestamppb.New(time.Date(2020, 1, 1, 0, 13, 0, 0, time.UTC)),
						},
						CreatedAt: timestamppb.New(time.Date(2020, 1, 1, 0, 8, 30, 0, time.UTC)),
					},
				},
				DriverRequests: []*simulation.DriverRequest{
					{
						Uuid: "134a5b74-b18e-49de-a63b-4cf520582bb4",
						Name: "Driver 1",
						VehicleCapacity: &delivery.VehicleCapacity{
							Weight: 10,
							Length: 10,
							Width:  10,
							Height: 10,
						},
						Loc: &delivery.LatLng{
							// Kwai Hing Station
							Lat: 22.363188,
							Lng: 114.131187,
						},
						MaxSpeedKmPerHour: 30,
						CreatedAt:         timestamppb.New(time.Date(2020, 1, 1, 0, 5, 0, 0, time.UTC)),
					},
				},
				CreatedAt:          timestamppb.New(time.Date(2020, 1, 1, 0, 0, 0, 0, time.UTC)),
				SupportRetracement: true,
			}
		})
		Context("with retracement support", func() {
			var (
				ds *DriverState
			)

			When("driver is able to solve all the request with retracement", func() {
				It("should create simulator", func() {
					simulator = NewRealTimeSimulator(request, logger)
					ds = simulator.driverStateByUUID["134a5b74-b18e-49de-a63b-4cf520582bb4"]
				})

				It("should be able to handle the first delivery request", func() {
					firstRequest := request.GetDeliveryRequests()[0]
					err := simulator.handleDeliveryRequest(firstRequest.GetCreatedAt().AsTime(), firstRequest, ds)
					Expect(err).To(BeNil())
				})

				It("should be able to handle the second delivery request with split the current route", func() {
					secondRequest := request.GetDeliveryRequests()[1]
					err := simulator.handleDeliveryRequest(secondRequest.GetCreatedAt().AsTime(), secondRequest, ds)
					Expect(err).To(BeNil())
				})
			})
		})

		Context("without retracement support", func() {
			BeforeEach(func() {
				request.SupportRetracement = false
				simulator = NewRealTimeSimulator(request, logger)
			})
		})
	})
})

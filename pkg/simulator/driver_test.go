package simulator

import (
	"github.com/lht102/delivery/api/delivery"
	"github.com/lht102/delivery/pkg/testingutil"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
	"google.golang.org/protobuf/types/known/timestamppb"
	"time"
)

var _ = Describe("Driver", func() {
	Context("calculateRequiredTimeWindowAndSpeedKmPerHour()", func() {
		var (
			curTime              time.Time
			restrictedTimeWindow *delivery.TimeWindow
			srcLoc, dstLoc       *delivery.LatLng
			maxSpeedKmPerHour    float64
		)

		BeforeEach(func() {
			srcLoc = &delivery.LatLng{
				Lat: 22.370157,
				Lng: 114.123489,
			}
			dstLoc = &delivery.LatLng{
				Lat: 22.318237,
				Lng: 114.168137,
			}
			curTime = time.Date(2020, time.January, 1, 1, 30, 0, 0, time.UTC)
			restrictedTimeWindow = &delivery.TimeWindow{
				StartedAt: &timestamppb.Timestamp{
					Seconds: time.Date(2020, time.January, 1, 1, 45, 0, 0, time.UTC).Unix(),
				},
				EndedAt: &timestamppb.Timestamp{
					Seconds: time.Date(2020, time.January, 1, 1, 55, 0, 0, time.UTC).Unix(),
				},
			}
		})

		When("the driver can not arrive at destination within the time window", func() {
			It("should return error", func() {
				maxSpeedKmPerHour = 13.0
				_, _, err := calculateRequiredTimeWindowAndSpeedKmPerHour(curTime, restrictedTimeWindow, srcLoc, dstLoc, maxSpeedKmPerHour)
				Expect(err).To(Equal(errExceedTimeWindow))
			})
		})

		When("the driver can arrive at destination before the time window", func() {
			It("should return error", func() {
				maxSpeedKmPerHour = 60.0
				tw, s, err := calculateRequiredTimeWindowAndSpeedKmPerHour(curTime, restrictedTimeWindow, srcLoc, dstLoc, maxSpeedKmPerHour)
				Expect(err).To(BeNil())
				Expect(testingutil.Float64AlmostEqual(s, 29.506799456250214)).To(BeTrue())
				Expect(tw).To(Equal(&delivery.TimeWindow{
					StartedAt: &timestamppb.Timestamp{
						Seconds: curTime.Unix(),
					},
					EndedAt: &timestamppb.Timestamp{
						Seconds: restrictedTimeWindow.GetStartedAt().GetSeconds(),
					},
				}))
			})
		})

		When("the driver can arrive at destination within the time window", func() {
			It("should return error", func() {
				maxSpeedKmPerHour = 25.0
				tw, s, err := calculateRequiredTimeWindowAndSpeedKmPerHour(curTime, restrictedTimeWindow, srcLoc, dstLoc, maxSpeedKmPerHour)
				Expect(err).To(BeNil())
				Expect(s).To(Equal(maxSpeedKmPerHour))
				Expect(tw).To(Equal(&delivery.TimeWindow{
					StartedAt: &timestamppb.Timestamp{
						Seconds: curTime.Unix(),
					},
					EndedAt: &timestamppb.Timestamp{
						Seconds: 1577843262,
					},
				}))
			})
		})
	})
})

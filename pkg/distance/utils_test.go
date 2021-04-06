package distance

import (
	"time"

	"github.com/lht102/delivery/pkg/testingutil"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("Utils", func() {
	Context("calculateIntermediatePoint()", func() {
		var (
			srcLat, srcLng float64
			dstLat, dstLng float64
		)

		BeforeEach(func() {
			// Kwai Chung
			srcLat, srcLng = 22.370157, 114.123489
			// Mong Kok
			dstLat, dstLng = 22.318237, 114.168137
		})

		When("percentage = 0%", func() {
			It("should return source location", func() {
				lat, lng := calculateIntermediatePoint(srcLat, srcLng, dstLat, dstLng, 0)
				Expect(testingutil.Float64AlmostEqual(lat, srcLat)).To(BeTrue())
				Expect(testingutil.Float64AlmostEqual(lng, srcLng)).To(BeTrue())
			})
		})

		When("percentage = 25%", func() {
			It("should return 1/4 location between src and dst", func() {
				lat, lng := calculateIntermediatePoint(srcLat, srcLng, dstLat, dstLng, 0.25)
				Expect(testingutil.Float64AlmostEqual(lat, 22.35717814723683)).To(BeTrue())
				Expect(testingutil.Float64AlmostEqual(lng, 114.13465411890385)).To(BeTrue())
			})
		})

		When("percentage = 75%", func() {
			It("should return 3/4 location between src and dst", func() {
				lat, lng := calculateIntermediatePoint(srcLat, srcLng, dstLat, dstLng, 0.75)
				Expect(testingutil.Float64AlmostEqual(lat, 22.331218146601813)).To(BeTrue())
				Expect(testingutil.Float64AlmostEqual(lng, 114.15697811729991)).To(BeTrue())
			})
		})

		When("percentage = 100%", func() {
			It("should return destination location", func() {
				lat, lng := calculateIntermediatePoint(srcLat, srcLng, dstLat, dstLng, 1)
				Expect(testingutil.Float64AlmostEqual(lat, dstLat)).To(BeTrue())
				Expect(testingutil.Float64AlmostEqual(lng, dstLng)).To(BeTrue())
			})
		})
	})

	Context("CalculateIntermediatePointWithTimeWindow()", func() {
		var (
			srcLat, srcLng     float64
			dstLat, dstLng     float64
			startTime, endTime time.Time
		)

		BeforeEach(func() {
			// Kwai Chung
			srcLat, srcLng = 22.370157, 114.123489
			// Mong Kok
			dstLat, dstLng = 22.318237, 114.168137

			startTime = time.Date(2020, time.January, 1, 1, 0, 0, 0, time.UTC)
			endTime = time.Date(2020, time.January, 1, 2, 0, 0, 0, time.UTC)
		})

		When("percentage = 0%", func() {
			It("should return source location", func() {
				lat, lng := CalculateIntermediatePointWithTimeWindow(srcLat, srcLng, dstLat, dstLng, startTime, endTime, startTime)
				Expect(testingutil.Float64AlmostEqual(lat, srcLat)).To(BeTrue())
				Expect(testingutil.Float64AlmostEqual(lng, srcLng)).To(BeTrue())
			})
		})

		When("percentage = 25%", func() {
			It("should return source location", func() {
				lat, lng := CalculateIntermediatePointWithTimeWindow(srcLat, srcLng, dstLat, dstLng, startTime, endTime, time.Date(2020, time.January, 1, 1, 15, 0, 0, time.UTC))
				Expect(testingutil.Float64AlmostEqual(lat, 22.35717814723683)).To(BeTrue())
				Expect(testingutil.Float64AlmostEqual(lng, 114.13465411890385)).To(BeTrue())
			})
		})

		When("percentage = 75%", func() {
			It("should return source location", func() {
				lat, lng := CalculateIntermediatePointWithTimeWindow(srcLat, srcLng, dstLat, dstLng, startTime, endTime, time.Date(2020, time.January, 1, 1, 45, 0, 0, time.UTC))
				Expect(testingutil.Float64AlmostEqual(lat, 22.331218146601813)).To(BeTrue())
				Expect(testingutil.Float64AlmostEqual(lng, 114.15697811729991)).To(BeTrue())
			})
		})

		When("percentage = 100%", func() {
			It("should return source location", func() {
				lat, lng := CalculateIntermediatePointWithTimeWindow(srcLat, srcLng, dstLat, dstLng, startTime, endTime, endTime)
				Expect(testingutil.Float64AlmostEqual(lat, dstLat)).To(BeTrue())
				Expect(testingutil.Float64AlmostEqual(lng, dstLng)).To(BeTrue())
			})
		})
	})
})

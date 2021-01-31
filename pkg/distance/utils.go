package distance

import "time"

func CalculateTravelingTime(srcLat, srcLng, dstLat, dstLng, speedKmPerHour float64) time.Duration {
	return time.Duration(0)
}

func CalculateMiddleLocation(srcLat, srcLng, dstLat, dstLng float64, startedTime, endedTime, midTime time.Time) (float64, float64) {
	m := midTime.Sub(startedTime).Seconds()
	n := endedTime.Sub(midTime).Seconds()
	lat := (m*dstLat + n*srcLat) / (m + n)
	lng := (m*dstLng + n*srcLng) / (m + n)
	return lat, lng
}

func CalculateRequiredSpeedKmPerHour(srcLat, srcLng, dstLat, dstLng float64, requiredDuration time.Duration) float64 {
	return 0
}

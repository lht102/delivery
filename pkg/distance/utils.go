package distance

import (
	"math"
	"strconv"
	"time"
)

func CalculateTravelingTime(distKm, speedKmPerHour float64) (time.Duration, error) {
	requiredHour := distKm / speedKmPerHour
	hourStr := strconv.FormatFloat(requiredHour, 'f', -1, 64)
	return time.ParseDuration(hourStr + "h")
}

func CalculateIntermediatePointWithTimeWindow(srcLat, srcLng, dstLat, dstLng float64, startedTime, endedTime, intermeidateTime time.Time) (float64, float64) {
	m := float64(intermeidateTime.Sub(startedTime))
	n := float64(endedTime.Sub(startedTime))
	return calculateIntermediatePoint(srcLat, srcLng, dstLat, dstLng, m/n)
}

func CalculateRequiredSpeedKmPerHour(distKm float64, requiredDuration time.Duration) float64 {
	return distKm / (float64(requiredDuration) / float64(time.Hour))
}

func calculateIntermediatePoint(srcLat, srcLng, dstLat, dstLng, percentage float64) (float64, float64) {
	rSrcLat := degreesToRadians(srcLat)
	rSrcLng := degreesToRadians(srcLng)
	rDstLat := degreesToRadians(dstLat)
	rDstLng := degreesToRadians(dstLng)

	deltaLat := rDstLat - rSrcLat
	deltaLng := rDstLng - rSrcLng

	calcA := math.Sin(deltaLat/2.0)*math.Sin(deltaLat/2.0) +
		math.Cos(rSrcLat)*math.Cos(rDstLat)*math.Sin(deltaLng/2.0)*math.Sin(deltaLng/2.0)
	calcB := 2.0 * math.Atan2(math.Sqrt(calcA), math.Sqrt(1-calcA))

	a := math.Sin((1-percentage)*calcB) / math.Sin(calcB)
	b := math.Sin(percentage*calcB) / math.Sin(calcB)

	x := a*math.Cos(rSrcLat)*math.Cos(rSrcLng) + b*math.Cos(rDstLat)*math.Cos(rDstLng)
	y := a*math.Cos(rSrcLat)*math.Sin(rSrcLng) + b*math.Cos(rDstLat)*math.Sin(rDstLng)
	z := a*math.Sin(rSrcLat) + b*math.Sin(rDstLat)

	lat := radiansToDegrees(math.Atan2(z, math.Sqrt(x*x+y*y)))
	lng := radiansToDegrees(math.Atan2(y, x))

	return lat, lng
}

func degreesToRadians(d float64) float64 {
	return d * (math.Pi / 180.0)
}

func radiansToDegrees(r float64) float64 {
	return r * (180.0 / math.Pi)
}

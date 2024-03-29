package testingutil

import "math"

const float64EqualityThreshold = 1e-9

func Float64AlmostEqual(a, b float64) bool {
	return math.Abs(a-b) <= float64EqualityThreshold
}

package distance

import (
	"testing"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

func TestDistance(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "Distance Suite")
}

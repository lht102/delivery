package binpack

import (
	"testing"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

func TestBinpack(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "Binpack Suite")
}

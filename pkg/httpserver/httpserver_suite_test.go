package httpserver

import (
	"testing"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

func TestHttpserver(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "Httpserver Suite")
}

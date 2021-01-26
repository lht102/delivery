package binpack

import (
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("Binpack", func() {
	Context("Packer", func() {
		var (
			packer Packer
			err    error
		)

		BeforeEach(func() {
			packer = NewBox(1500, 100, 100, 300)
		})

		It("should pack one item with rotation LHW", func() {
			err = packer.AddItem(NewItem(20, 150, 50, 50))
			Expect(err).To(BeNil())
			boxItems := packer.BoxItems()
			Expect(boxItems[0].Position()).To(Equal(Position{0, 0, 0}))
			Expect(boxItems[0].Dimension()).To(Equal(Dimension{50, 50, 150}))
			Expect(packer.UsedWeight()).To(Equal(20))
		})
	})
})

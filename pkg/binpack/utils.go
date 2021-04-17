package binpack

import "github.com/lht102/delivery/api/delivery"

func BoxItemsToAPIBoxItems(boxItems []*BoxItem) []*delivery.BoxItem {
	apiBoxItems := make([]*delivery.BoxItem, len(boxItems))
	for i, boxItem := range boxItems {
		pos := boxItem.Position()
		apiBoxItems[i] = &delivery.BoxItem{
			Uuid:         boxItem.Uuid(),
			Weight:       int32(boxItem.Weight()),
			Length:       int32(boxItem.Length()),
			Width:        int32(boxItem.Width()),
			Height:       int32(boxItem.Height()),
			RotationType: delivery.RotationType(boxItem.rotationType),
			Pos:          []int32{int32(pos[0]), int32(pos[1]), int32(pos[2])},
		}
	}
	return apiBoxItems
}

package binpack

import (
	"errors"
	"sort"
)

var (
	errOverWeight        = errors.New("over weight")
	errIntersectBoxItem  = errors.New("intersect with other items within the box")
	errNoRotationTypeFit = errors.New("no any rotation type fit")
	errItemWithSameUUID  = errors.New("item with same uuid has been already added to the box")
)

type Packer interface {
	Weight() int
	Width() int
	Length() int
	Height() int
	UsedWeight() int
	AddItem(item *Item) error
	RemoveItem(id string) error
	IsValid(item *Item) error
	BoxItems() []*BoxItem
}

type Box struct {
	weight, length, width, height int
	usedWeight                    int
	boxItems                      []*BoxItem
	boxItemByID                   map[string]*BoxItem
	tmpValidBoxItemByID           map[string]*BoxItem
}

func NewBox(weight, width, length, height int) Packer {
	return &Box{
		weight:              weight,
		width:               width,
		length:              length,
		height:              height,
		usedWeight:          0,
		boxItems:            []*BoxItem{},
		boxItemByID:         map[string]*BoxItem{},
		tmpValidBoxItemByID: map[string]*BoxItem{},
	}
}

func (b *Box) Weight() int {
	return b.weight
}

func (b *Box) Width() int {
	return b.width
}

func (b *Box) Length() int {
	return b.length
}

func (b *Box) Height() int {
	return b.height
}

func (b *Box) UsedWeight() int {
	return b.usedWeight
}

func (b *Box) isValid(item *Item, p Position) error {
	boxItem := &BoxItem{
		item: item,
	}
	for i := 0; i < 6; i++ {
		boxItem.rotationType = RotationType(i)
		d := boxItem.Dimension()
		if b.Width() < p[0]+d[0] || b.Length() < p[1]+d[1] || b.Height() < p[2]+d[2] {
			continue
		}
		for _, it := range b.boxItems {
			if it.intersect(boxItem) {
				return errIntersectBoxItem
			}
		}
		b.tmpValidBoxItemByID[boxItem.Uuid()] = boxItem
		b.usedWeight += item.Weight()
		return nil
	}
	return nil
}

func (b *Box) IsValid(item *Item) error {
	_, ok := b.boxItemByID[item.Uuid()]
	if ok {
		return errItemWithSameUUID
	}
	validItem := b.validItemByUUID(item.Uuid())
	if validItem != nil {
		return nil
	}
	if b.usedWeight+item.Weight() > b.weight {
		return errOverWeight
	}
	if len(b.boxItems) == 0 {
		return b.isValid(item, Position{0, 0, 0})
	}
	for pt := 0; pt < 3; pt++ {
		for _, it := range b.BoxItems() {
			var ps Position
			switch Axis(pt) {
			case WidthAxis:
				ps = Position{it.Position()[0] + it.Width(), it.Position()[1], it.Position()[2]}
			case LengthAxis:
				ps = Position{it.Position()[0], it.Position()[1] + it.Length(), it.Position()[2]}
			case HeightAxis:
				ps = Position{it.Position()[0], it.Position()[1], it.Position()[2] + it.Height()}
			}
			if b.isValid(item, ps) == nil {
				return nil
			}
		}
	}
	return errNoRotationTypeFit
}

func (b *Box) validItemByUUID(uuid string) *BoxItem {
	return b.tmpValidBoxItemByID[uuid]
}

func (b *Box) clearValidItems() {
	b.tmpValidBoxItemByID = make(map[string]*BoxItem)
}

func (b *Box) AddItem(item *Item) error {
	if err := b.IsValid(item); err != nil {
		return err
	}
	boxItem := b.validItemByUUID(item.Uuid())
	b.boxItems = append(b.boxItems, boxItem)
	b.boxItemByID[boxItem.Uuid()] = boxItem
	return nil
}

func (b *Box) RemoveItem(id string) error {
	items := b.items()
	sort.Slice(items, func(i, j int) bool {
		return items[i].Volume() < items[j].Volume()
	})
	tmpBoxItems := b.boxItems
	tmpBoxItemsByID := b.boxItemByID
	tmpUsedWeight := b.usedWeight
	b.boxItems = []*BoxItem{}
	b.boxItemByID = map[string]*BoxItem{}
	b.usedWeight = 0
	for _, item := range items {
		if item.Uuid() == id {
			continue
		}
		if err := b.AddItem(item); err != nil {
			b.boxItems = tmpBoxItems
			b.boxItemByID = tmpBoxItemsByID
			b.usedWeight = tmpUsedWeight
			return err
		}
	}
	b.clearValidItems()
	return nil
}

func (b *Box) BoxItems() []*BoxItem {
	boxItems := []*BoxItem{}
	for _, bi := range b.boxItems {
		boxItems = append(boxItems, bi)
	}
	return boxItems
}

func (b *Box) items() []*Item {
	items := []*Item{}
	for _, it := range b.BoxItems() {
		items = append(items, it.item)
	}
	return items
}

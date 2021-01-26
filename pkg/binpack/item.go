package binpack

import (
	"math"
)

type RotationType int

type Axis int

type Dimension [3]int

type Position [3]int

const (
	RotationTypeWLH RotationType = iota
	RotationTypeLWH
	RotationTypeLHW
	RotationTypeHLW
	RotationTypeHWL
	RotationTypeWHL

	WidthAxis Axis = iota
	LengthAxis
	HeightAxis
)

type Item struct {
	uuid                          string
	weight, length, width, height int
}

func (i *Item) Uuid() string {
	return i.uuid
}

func (i *Item) Weight() int {
	return i.weight
}

func (i *Item) Length() int {
	return i.length
}

func (i *Item) Width() int {
	return i.width
}

func (i *Item) Height() int {
	return i.height
}

func (i *Item) Volume() int {
	return i.Weight() * i.Length() * i.Height()
}

func NewItemWithUUID(uuid string, weight, width, length, height int) *Item {
	return &Item{
		uuid:   uuid,
		weight: weight,
		width:  width,
		length: length,
		height: height,
	}
}

func NewItem(weight, width, length, height int) *Item {
	return &Item{
		uuid:   "",
		weight: weight,
		width:  width,
		length: length,
		height: height,
	}
}

type BoxItem struct {
	item         *Item
	rotationType RotationType
	pos          Position
}

func (i *BoxItem) Uuid() string {
	return i.item.Uuid()
}

func (i *BoxItem) Weight() int {
	return i.item.Weight()
}

func (i *BoxItem) Length() int {
	return i.item.Length()
}

func (i *BoxItem) Width() int {
	return i.item.Width()
}

func (i *BoxItem) Height() int {
	return i.item.Height()
}

func (i *BoxItem) Volume() int {
	return i.item.Volume()
}

func (i *BoxItem) Position() Position {
	var pos Position
	copy(pos[:], i.pos[:])
	return pos
}

func (i *BoxItem) Dimension() Dimension {
	switch i.rotationType {
	case RotationTypeWLH:
		return Dimension{i.Width(), i.Length(), i.Height()}
	case RotationTypeWHL:
		return Dimension{i.Width(), i.Height(), i.Length()}
	case RotationTypeLWH:
		return Dimension{i.Length(), i.Width(), i.Height()}
	case RotationTypeLHW:
		return Dimension{i.Length(), i.Height(), i.Width()}
	case RotationTypeHLW:
		return Dimension{i.Height(), i.Length(), i.Width()}
	case RotationTypeHWL:
		return Dimension{i.Height(), i.Width(), i.Length()}
	}
	return Dimension{i.Width(), i.Length(), i.Height()}
}

func (i *BoxItem) intersect(i2 *BoxItem) bool {
	return rectIntersect(i, i2, WidthAxis, LengthAxis) &&
		rectIntersect(i, i2, LengthAxis, HeightAxis) &&
		rectIntersect(i, i2, WidthAxis, HeightAxis)
}

func rectIntersect(i1, i2 *BoxItem, x, y Axis) bool {
	d1 := i1.Dimension()
	d2 := i2.Dimension()

	cx1 := float64(i1.pos[x]) + float64(d1[x])/2.0
	cy1 := float64(i1.pos[y]) + float64(d1[y])/2.0
	cx2 := float64(i2.pos[x]) + float64(d2[x])/2.0
	cy2 := float64(i2.pos[y]) + float64(d2[y])/2.0

	ix := math.Max(cx1, cx2) - math.Min(cx1, cx2)
	iy := math.Max(cy1, cy2) - math.Min(cy1, cy2)

	return ix < (float64(d1[x]+d2[x]))/2.0 && iy < (float64(d1[y]+d2[y]))/2.0
}

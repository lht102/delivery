package distance

import (
	"context"

	"googlemaps.github.io/maps"
)

type Client interface {
	DistanceMatrix(ctx context.Context, request *maps.DistanceMatrixRequest) (*maps.DistanceMatrixResponse, error)
}

type client struct {
	c *maps.Client
}

func NewClient(c *maps.Client) Client {
	return &client{
		c: c,
	}
}

func (c *client) DistanceMatrix(ctx context.Context, request *maps.DistanceMatrixRequest) (*maps.DistanceMatrixResponse, error) {
	return c.c.DistanceMatrix(ctx, request)
}

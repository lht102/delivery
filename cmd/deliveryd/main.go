package main

import (
	"log"
	"net/http"
	"time"

	"github.com/lht102/delivery/pkg/config"
	"github.com/lht102/delivery/pkg/database/pqconnector"
	"github.com/lht102/delivery/pkg/distance"
	"github.com/lht102/delivery/pkg/httpserver"
	"go.uber.org/zap"
	"googlemaps.github.io/maps"
)

const (
	httpTimeout = 5 * time.Second
)

func main() {
	cfg := config.GetPSQLDBConfig()
	db, err := pqconnector.NewConn(cfg, "./migrations/postgres")
	if err != nil {
		log.Fatalln(err)
	}
	logger, err := zap.NewProduction()
	if err != nil {
		log.Fatalln(err)
	}
	mapsClient, err := maps.NewClient(maps.WithHTTPClient(&http.Client{
		Timeout: httpTimeout,
	}), maps.WithAPIKey(config.GetGoogleMapAPIKey()))
	if err != nil {
		log.Fatalln(err)
	}
	distanceClient := distance.NewClient(mapsClient)
	srv := httpserver.NewServer(distanceClient, db, logger)
	srv.ListenAndServe()
}

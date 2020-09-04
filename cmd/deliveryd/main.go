package main

import (
	"log"

	"github.com/lht102/delivery/pkg/config"
	"github.com/lht102/delivery/pkg/database/pqconnector"
	"github.com/lht102/delivery/pkg/httpserver"
	"go.uber.org/zap"
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
	srv := httpserver.NewServer(db, logger)
	srv.ListenAndServe()
}

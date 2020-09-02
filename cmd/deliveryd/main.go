package main

import (
	"log"

	"github.com/lht102/delivery/pkg/config"
	"github.com/lht102/delivery/pkg/database/pqconnector"
)

func main() {
	cfg := config.GetPSQLDBConfig()
	_, err := pqconnector.NewConn(cfg, "./migrations/postgres")
	if err != nil {
		log.Fatalln(err)
	}
}

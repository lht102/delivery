package main

import (
	"log"

	"github.com/lht102/delivery/pkg/httpserver"
	"go.uber.org/zap"
)

func main() {
	logger, err := zap.NewProduction()
	if err != nil {
		log.Fatalln(err)
	}
	srv := httpserver.NewServer(logger)
	srv.ListenAndServe()
}

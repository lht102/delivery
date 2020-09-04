package httpserver

import (
	"github.com/lht102/delivery/pkg/httpserver/middleware"
)

func (s *server) routes() {
	r := s.router
	r.Use(middleware.Logger(s.logger))
	r.Get("/greeting", s.handleGreeting())
}

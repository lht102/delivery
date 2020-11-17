package httpserver

import (
	"github.com/go-chi/chi"
	"github.com/lht102/delivery/pkg/httpserver/middleware"
)

func (s *server) routes() {
	r := s.router
	r.Use(middleware.Logger(s.logger))

	r.Route("delivery", func(r chi.Router) {
		r.Post("simulation", s.handleSimulation())
	})
}

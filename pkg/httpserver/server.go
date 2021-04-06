package httpserver

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"time"

	"go.uber.org/zap"

	"github.com/go-chi/chi/v5"
)

type server struct {
	router chi.Router
	logger *zap.Logger
}

func NewServer(logger *zap.Logger) *server {
	srv := &server{}
	srv.logger = logger
	srv.router = chi.NewRouter()
	srv.routes()
	return srv
}

func (s *server) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	s.router.ServeHTTP(w, r)
}

func (s *server) ListenAndServe() {
	srv := &http.Server{Addr: ":8080", Handler: s.router}
	go func() {
		s.logger.Info("http server start")
		if err := srv.ListenAndServe(); err != nil {
			s.logger.Error(err.Error())
		}
	}()
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt)
	<-stop
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		s.logger.Error(err.Error())
	}
	s.logger.Info("http server shutdown")
}

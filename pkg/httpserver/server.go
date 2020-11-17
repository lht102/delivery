package httpserver

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"time"

	"go.uber.org/zap"

	"github.com/go-chi/chi"
	"github.com/lht102/delivery/pkg/distance"
	"github.com/lht102/delivery/pkg/models"
)

type server struct {
	distanceClient distance.Client
	db             models.XODB
	router         chi.Router
	logger         *zap.Logger
}

func NewServer(distanceClient distance.Client, db models.XODB, logger *zap.Logger) *server {
	srv := &server{}
	srv.distanceClient = distanceClient
	srv.db = db
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

package httpserver

import (
	"net/http"

	"github.com/lht102/delivery/api/delivery/simulation"
	"github.com/lht102/delivery/pkg/httpserver/utils"
	"github.com/lht102/delivery/pkg/simulator/validator"
)

func (s *server) handleSimulation() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		req := &simulation.SimulationRequest{}
		if err := utils.Decode(w, r, req); err != nil {
			utils.ResponseErr(w, r, err.Error(), http.StatusBadRequest)
			return
		}
		if err := validator.ValidateSimulationRequest(req); err != nil {
			utils.ResponseErr(w, r, err.Error(), http.StatusUnprocessableEntity)
			return
		}
	}
}

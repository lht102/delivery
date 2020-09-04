package httpserver

import (
	"fmt"
	"net/http"
)

// TODO: To be deleted
func (s *server) handleGreeting() http.HandlerFunc {
	type HelloRequest struct {
		Name string `json:"name,omitempty"`
	}
	return func(w http.ResponseWriter, r *http.Request) {
		var req HelloRequest
		if err := decode(w, r, &req); err != nil {
			respondErr(w, r, err.Error(), http.StatusInternalServerError)
			return
		}
		respond(w, r, fmt.Sprintf("hello world, %s", req.Name), http.StatusOK)
	}
}

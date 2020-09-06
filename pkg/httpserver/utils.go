package httpserver

import (
	"encoding/json"
	"net/http"

	"github.com/lht102/delivery/api"
	"github.com/lht102/delivery/pkg/httpserver/static"
)

func decode(w http.ResponseWriter, r *http.Request, v interface{}) error {
	return json.NewDecoder(r.Body).Decode(v)
}

func respond(w http.ResponseWriter, r *http.Request, data interface{}, status int) {
	w.Header().Set(static.ContentTypeKey, static.ContentTypeValueJSON)
	if err := json.NewEncoder(w).Encode(data); err != nil {
		json.NewEncoder(w).Encode(api.Response{
			StatusText: http.StatusText(status),
			Message:    err.Error(),
		})
	}
}

func respondErr(w http.ResponseWriter, r *http.Request, msg string, status int) {
	w.Header().Set(static.ContentTypeKey, static.ContentTypeValueJSON)
	json.NewEncoder(w).Encode(api.Response{
		StatusText: http.StatusText(status),
		Message:    msg,
	})
}

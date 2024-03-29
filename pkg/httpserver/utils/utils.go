package utils

import (
	"io/ioutil"
	"net/http"

	"github.com/lht102/delivery/api/errmsg"
	"github.com/lht102/delivery/pkg/httpserver/static"
	"google.golang.org/protobuf/encoding/protojson"
	"google.golang.org/protobuf/proto"
)

func Decode(w http.ResponseWriter, r *http.Request, m proto.Message) error {
	payload, err := ioutil.ReadAll(r.Body)
	if err != nil {
		return err
	}
	return protojson.UnmarshalOptions{
		AllowPartial:   true,
		DiscardUnknown: true,
	}.Unmarshal(payload, m)
}

func Response(w http.ResponseWriter, data proto.Message, status int) {
	w.Header().Set(static.ContentTypeKey, static.ContentTypeValueJSON)
	resp, err := protojson.MarshalOptions{
		EmitUnpopulated: true,
	}.Marshal(data)
	if err != nil {
		ResponseErr(w, err.Error(), http.StatusInternalServerError)
		return
	}
	writeBody(w, resp, status)
}

func ResponseErr(w http.ResponseWriter, msg string, status int) {
	w.Header().Set(static.ContentTypeKey, static.ContentTypeValueJSON)
	errResp, err := protojson.Marshal(&errmsg.Error{
		StatusText: http.StatusText(status),
		Message:    msg,
	})
	if err != nil {
		http.Error(w, err.Error(), status)
		return
	}
	writeBody(w, errResp, status)
}

func writeBody(w http.ResponseWriter, b []byte, status int) {
	w.WriteHeader(status)
	_, err := w.Write(b)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

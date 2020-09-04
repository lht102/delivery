package api

type ErrResponse struct {
	StatusText string `json:"statusCode"`
	Message    string `json:"message"`
}

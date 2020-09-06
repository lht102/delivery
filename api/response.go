package api

type Response struct {
	StatusText string `json:"statusCode"`
	Message    string `json:"message"`
}

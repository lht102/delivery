package middleware

import (
	"net/http"
	"time"

	"github.com/go-chi/chi/v5/middleware"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func Logger(logger *zap.Logger) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		fn := func(w http.ResponseWriter, r *http.Request) {
			ww := middleware.NewWrapResponseWriter(w, r.ProtoMajor)
			timeNow := time.Now()
			defer func() {
				fields := []zapcore.Field{
					zap.String("proto", r.Proto),
					zap.String("path", r.URL.Path),
					zap.Int("status", ww.Status()),
					zap.Int("size", ww.BytesWritten()),
					zap.Duration("timing", time.Since(timeNow)),
				}
				reqID := middleware.GetReqID(r.Context())
				if reqID != "" {
					fields = append(fields, zap.String("reqID", reqID))
				}
				logger.Info("Served", fields...)
			}()
			next.ServeHTTP(ww, r)
		}
		return http.HandlerFunc(fn)
	}
}

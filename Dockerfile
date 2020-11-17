FROM golang:1.14-alpine AS build-env
WORKDIR /src
ADD . .
RUN apk update && \
    apk add --no-cache make build-base
ENV CGO_ENABLED=1
ENV GOOS=linux
ENV GOARCH=amd64
ENV GOFLAGS="-mod=vendor"
RUN make build

FROM golang:1.14-alpine AS test-env
ENV PACKAGES postgresql-client build-base git netcat-openbsd
RUN apk update && \
    apk add --no-cache $PACKAGES
RUN go get -v github.com/axw/gocov/gocov
RUN go get honnef.co/go/tools/cmd/staticcheck
RUN cd $GOPATH/src/honnef.co/go/tools/cmd/staticcheck && git checkout 2020.1.4 && go get && go install
WORKDIR /src
COPY --from=build-env /src .

FROM alpine AS runtime
WORKDIR /app
COPY --from=build-env /src/devliery /app/
COPY --from=build-env /src/migrations /app/migrations
ENTRYPOINT ./bin/devlieryd

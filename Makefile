SHELL := /bin/bash

-include .env.$(ENV)
export

APP_NAME = `basename ${PWD}`

GOFLAGS = -mod=vendor
MIGRATION_PATH = ./migrations/postgres
LOCAL_PACKAGES = `go list ./... | egrep -v "vendor|mocks"`
DB_SOURCE = "postgres://$(POSTGRES_USER):$(POSTGRES_PASSWORD)@$(POSTGRES_HOST):$(POSTGRES_PORT)/$(POSTGRES_DB)?sslmode=disable"

.PHONY: dep
dep:
	go mod tidy
	go mod vendor

.PHONY: static-check
static-check:
	staticcheck ${LOCAL_PACKAGES} 

.PHONY: test-all-packages
test-all-packages:
	go test -v -race -cover -coverprofile=c.out -covermode=atomic $(LOCAL_PACKAGES)

.PHONY: test-coverage
test-coverage:
	gocov convert c.out | gocov report

.PHONY: test
test: static-check test-all-packages test-coverage

.PHONY: build
build:
	@rm -rf bin/
	@mkdir bin/
	@cd bin && go build -v ../cmd/... 

.PHONY: run
run:
	./bin/deliveryd

.PHONY: all
all: test build run

.PHONY: migrate-db-create
migrate-db-create:
	@PGPASSWORD="$(POSTGRES_PASSWORD)" psql -h "$(POSTGRES_HOST)" -p "$(POSTGRES_PORT)" -U "$(POSTGRES_USER)" -w -c "SELECT 1 FROM pg_database WHERE datname = '$(POSTGRES_DB)';" \
		| grep 1 \
		|| PGPASSWORD="$(POSTGRES_PASSWORD)" psql -h "$(POSTGRES_HOST)" -p "$(POSTGRES_PORT)" -U "$(POSTGRES_USER)" -w -c "CREATE DATABASE $(POSTGRES_DB);"

.PHONY: migrate-db-drop
migrate-db-drop:
	@PGPASSWORD="$(POSTGRES_PASSWORD)" psql -h "$(POSTGRES_HOST)" -p "$(POSTGRES_PORT)" -U "$(POSTGRES_USER)" -w -c "DROP DATABASE $(POSTGRES_DB);"

.PHONY: migrate-up
migrate-up: migrate-db-create
	@migrate \
		-database $(DB_SOURCE) \
		-path $(MIGRATION_PATH) up

.PHONY: migrate-down
migrate-down:
	@migrate \
		-database $(DB_SOURCE) \
		-path $(MIGRATION_PATH) down

.PHONY: migrate-create
migrate-create:
	@mkdir -p $(MIGRATION_PATH)
	@migrate create -dir $(MIGRATION_PATH) -ext sql $(name)

.PHONY: queries
queries: models
	@rm -rf pkg/models/queries
	@mkdir -p pkg/models/queries
#e.g. @xo $(DB_SOURCE) -o pkg/models/queries -N -M -B -T ExampleResult -F GetExampleByField < ./queries/example.xo.sql
	@go build ./pkg/models/...

.PHONY: models
models:
	@mkdir -p pkg/models
	@xo $(DB_SOURCE) -o pkg/models
	@go build ./pkg/models

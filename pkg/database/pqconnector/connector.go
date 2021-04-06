package pqconnector

import (
	"database/sql"
	"fmt"
	"net/url"
	"path/filepath"

	"github.com/lht102/delivery/pkg/models"
	_ "github.com/lib/pq"
	"github.com/xo/dburl"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

type Config struct {
	Username string
	Password string
	Address  string
	Port     int
	Database string
	SSLMode  string
}

func NewConn(cfg Config, migrationPath string) (models.XODB, error) {
	url := setupUrl(cfg)
	db, err := dburl.Open(url)
	if err != nil {
		return nil, err
	}
	if migrationPath != "" {
		p, err := filepath.Abs(migrationPath)
		if err != nil {
			return nil, err
		}
		if err = migrateDB(db, cfg.Database, "file://"+p); err != nil {
			return db, err
		}
	}
	return db, nil
}

func setupUrl(cfg Config) string {
	return fmt.Sprintf("postgres://%s:%s@%s:%d/%s?sslmode=%s",
		cfg.Username,
		url.QueryEscape(cfg.Password),
		cfg.Address,
		cfg.Port,
		cfg.Database,
		cfg.SSLMode,
	)
}

func migrateDB(db *sql.DB, databaseName, path string) error {
	driver, err := postgres.WithInstance(db, &postgres.Config{DatabaseName: databaseName})
	if err != nil {
		return err
	}
	m, err := migrate.NewWithDatabaseInstance(path, "postgres", driver)
	if err != nil {
		return err
	}
	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		return err
	}
	return nil
}

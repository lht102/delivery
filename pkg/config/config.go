package config

import (
	"github.com/lht102/delivery/pkg/config/static"
	"github.com/lht102/delivery/pkg/database/pqconnector"
	"github.com/spf13/viper"
)

var v *viper.Viper

func init() {
	v = viper.GetViper()
	v.AutomaticEnv()
}

func GetPSQLDBConfig() pqconnector.Config {
	return pqconnector.Config{
		Address:  v.GetString(static.PostgresHost),
		Username: v.GetString(static.PostgresUser),
		Password: v.GetString(static.PostgresPassword),
		Port:     v.GetInt(static.PostgresPort),
		Database: v.GetString(static.PostgresDB),
		SSLMode:  v.GetString(static.PostgresSSLMode),
	}
}

package dburl

import (
	"fmt"
	"net/url"
	stdpath "path"
	"strings"
)

// GenScheme returns a func that generates a scheme:// style DSN from the
// passed URL.
func GenScheme(scheme string) func(*URL) (string, error) {
	return func(u *URL) (string, error) {
		z := &url.URL{
			Scheme:   scheme,
			Opaque:   u.Opaque,
			User:     u.User,
			Host:     u.Host,
			Path:     u.Path,
			RawPath:  u.RawPath,
			RawQuery: u.RawQuery,
			Fragment: u.Fragment,
		}
		return z.String(), nil
	}
}

// GenFromURL returns a func that generates a DSN using urlstr as the default
// URL parameters, overriding the values only if when in the passed URL.
func GenFromURL(urlstr string) func(*URL) (string, error) {
	z, err := url.Parse(urlstr)
	if err != nil {
		panic(err)
	}
	return func(u *URL) (string, error) {
		opaque := z.Opaque
		if u.Opaque != "" {
			opaque = u.Opaque
		}
		user := z.User
		if u.User != nil {
			user = u.User
		}
		host, port := z.Hostname(), z.Port()
		if h := u.Hostname(); h != "" {
			host = h
		}
		if p := u.Port(); p != "" {
			port = p
		}
		if port != "" {
			host += ":" + port
		}
		path := z.Path
		if u.Path != "" {
			path = u.Path
		}
		rawPath := z.RawPath
		if u.RawPath != "" {
			rawPath = u.RawPath
		}
		q := z.Query()
		for k, v := range u.Query() {
			q.Set(k, strings.Join(v, " "))
		}
		fragment := z.Fragment
		if u.Fragment != "" {
			fragment = u.Fragment
		}
		y := &url.URL{
			Scheme:   z.Scheme,
			Opaque:   opaque,
			User:     user,
			Host:     host,
			Path:     path,
			RawPath:  rawPath,
			RawQuery: q.Encode(),
			Fragment: fragment,
		}
		return y.String(), nil
	}
}

// GenOpaque generates a opaque file path DSN from the passed URL.
func GenOpaque(u *URL) (string, error) {
	if u.Opaque == "" {
		return "", ErrMissingPath
	}
	return u.Opaque + genQueryOptions(u.Query()), nil
}

// GenPostgres generates a postgres DSN from the passed URL.
func GenPostgres(u *URL) (string, error) {
	host, port, dbname := u.Hostname(), u.Port(), strings.TrimPrefix(u.Path, "/")
	if host == "." {
		return "", ErrRelativePathNotSupported
	}
	// resolve path
	if u.Transport == "unix" {
		if host == "" {
			dbname = "/" + dbname
		}
		host, port, dbname = resolveDir(stdpath.Join(host, dbname))
	}
	// build q
	q := u.Query()
	q.Set("host", host)
	q.Set("port", port)
	q.Set("dbname", dbname)
	// add user/pass
	if u.User != nil {
		q.Set("user", u.User.Username())
		pass, _ := u.User.Password()
		q.Set("password", pass)
	}
	// save host, port, dbname
	if u.hostPortDB == nil {
		u.hostPortDB = []string{host, port, dbname}
	}
	return genOptions(q, "", "=", " ", ",", true), nil
}

// GenSQLServer generates a sqlserver DSN from the passed URL.
func GenSQLServer(u *URL) (string, error) {
	host, port, dbname := u.Hostname(), u.Port(), strings.TrimPrefix(u.Path, "/")
	// add instance name to host if present
	if i := strings.Index(dbname, "/"); i != -1 {
		host = host + `\` + dbname[:i]
		dbname = dbname[i+1:]
	}
	// build q
	q := u.Query()
	q.Set("Server", host)
	q.Set("Port", port)
	q.Set("Database", dbname)
	// add user/pass
	if u.User != nil {
		q.Set("User ID", u.User.Username())
		pass, _ := u.User.Password()
		q.Set("Password", pass)
	}
	// save host, port, dbname
	if u.hostPortDB == nil {
		u.hostPortDB = []string{host, port, dbname}
	}
	return genOptionsODBC(q, true), nil
}

// GenMySQL generates a mysql DSN from the passed URL.
func GenMySQL(u *URL) (string, error) {
	host, port, dbname := u.Hostname(), u.Port(), strings.TrimPrefix(u.Path, "/")
	// build dsn
	var dsn string
	if u.User != nil {
		if n := u.User.Username(); n != "" {
			if p, ok := u.User.Password(); ok {
				n += ":" + p
			}
			dsn += n + "@"
		}
	}
	// resolve path
	if u.Transport == "unix" {
		if host == "" {
			dbname = "/" + dbname
		}
		host, dbname = resolveSocket(stdpath.Join(host, dbname))
		port = ""
	}
	// save host, port, dbname
	if u.hostPortDB == nil {
		u.hostPortDB = []string{host, port, dbname}
	}
	// if host or proto is not empty
	if u.Transport != "unix" {
		if host == "" {
			host = "127.0.0.1"
		}
		if port == "" {
			port = "3306"
		}
	}
	if port != "" {
		port = ":" + port
	}
	// add proto and database
	dsn += u.Transport + "(" + host + port + ")" + "/" + dbname
	return dsn + genQueryOptions(u.Query()), nil
}

// GenMyMySQL generates a MyMySQL MySQL DSN from the passed URL.
func GenMyMySQL(u *URL) (string, error) {
	host, port, dbname := u.Hostname(), u.Port(), strings.TrimPrefix(u.Path, "/")
	// resolve path
	if u.Transport == "unix" {
		if host == "" {
			dbname = "/" + dbname
		}
		host, dbname = resolveSocket(stdpath.Join(host, dbname))
		port = ""
	}
	// save host, port, dbname
	if u.hostPortDB == nil {
		u.hostPortDB = []string{host, port, dbname}
	}
	// if host or proto is not empty
	if u.Transport != "unix" {
		if host == "" {
			host = "127.0.0.1"
		}
		if port == "" {
			port = "3306"
		}
	}
	if port != "" {
		port = ":" + port
	}
	// build dsn
	dsn := u.Transport + ":" + host + port
	dsn += genOptions(
		convertOptions(u.Query(), "true", ""),
		",", "=", ",", " ", false,
	)
	dsn += "*" + dbname
	if u.User != nil {
		pass, _ := u.User.Password()
		dsn += "/" + u.User.Username() + "/" + pass
	} else if strings.HasSuffix(dsn, "*") {
		dsn += "//"
	}
	return dsn, nil
}

// GenOracle generates a Go Driver for Oracle (godror) DSN from the passed URL.
func GenOracle(u *URL) (string, error) {
	// Easy Connect Naming method enables clients to connect to a database server
	// without any configuration. Clients use a connect string for a simple TCP/IP
	// address, which includes a host name and optional port and service name:
	// CONNECT username[/password]@[//]host[:port][/service_name][:server][/instance_name]
	host, port, service := u.Hostname(), u.Port(), strings.TrimPrefix(u.Path, "/")
	// grab instance name from service name
	var instance string
	if i := strings.LastIndex(service, "/"); i != -1 {
		instance, service = service[i+1:], service[:i]
	}
	// build dsn
	dsn := host
	if port != "" {
		dsn += ":" + port
	}
	if u.User != nil {
		if n := u.User.Username(); n != "" {
			if p, ok := u.User.Password(); ok {
				n += "/" + p
			}
			dsn = n + "@//" + dsn
		}
	}
	if service != "" {
		dsn += "/" + service
	}
	if instance != "" {
		dsn += "/" + instance
	}
	return dsn, nil
}

// GenFirebird generates a firebirdsql DSN from the passed URL.
func GenFirebird(u *URL) (string, error) {
	z := &url.URL{
		User:     u.User,
		Host:     u.Host,
		Path:     u.Path,
		RawPath:  u.RawPath,
		RawQuery: u.RawQuery,
		Fragment: u.Fragment,
	}
	return strings.TrimPrefix(z.String(), "//"), nil
}

// GenADODB generates a adodb DSN from the passed URL.
func GenADODB(u *URL) (string, error) {
	// grab data source
	host, port := u.Hostname(), u.Port()
	dsname, dbname := strings.TrimPrefix(u.Path, "/"), ""
	if dsname == "" {
		dsname = "."
	}
	// check if data source is not a path on disk
	if mode(dsname) == 0 {
		if i := strings.IndexAny(dsname, `\/`); i != -1 {
			dbname = dsname[i+1:]
			dsname = dsname[:i]
		}
	}
	// build q
	q := u.Query()
	q.Set("Provider", host)
	q.Set("Port", port)
	q.Set("Data Source", dsname)
	q.Set("Database", dbname)
	if u.User != nil {
		q.Set("User ID", u.User.Username())
		pass, _ := u.User.Password()
		q.Set("Password", pass)
	}
	if u.hostPortDB == nil {
		n := dsname
		if dbname != "" {
			n += "/" + dbname
		}
		u.hostPortDB = []string{host, port, n}
	}
	return genOptionsODBC(q, true), nil
}

// GenODBC generates a odbc DSN from the passed URL.
func GenODBC(u *URL) (string, error) {
	// save host, port, dbname
	host, port, dbname := u.Hostname(), u.Port(), strings.TrimPrefix(u.Path, "/")
	if u.hostPortDB == nil {
		u.hostPortDB = []string{host, port, dbname}
	}
	// build q
	q := u.Query()
	q.Set("Driver", "{"+strings.Replace(u.Transport, "+", " ", -1)+"}")
	q.Set("Server", host)
	if port == "" {
		proto := strings.ToLower(u.Transport)
		switch {
		case strings.Contains(proto, "mysql"):
			q.Set("Port", "3306")
		case strings.Contains(proto, "postgres"):
			q.Set("Port", "5432")
		case strings.Contains(proto, "db2") || strings.Contains(proto, "ibm"):
			q.Set("ServiceName", "50000")
		default:
			q.Set("Port", "1433")
		}
	} else {
		q.Set("Port", port)
	}
	q.Set("Database", dbname)
	// add user/pass
	if u.User != nil {
		q.Set("UID", u.User.Username())
		p, _ := u.User.Password()
		q.Set("PWD", p)
	}
	return genOptionsODBC(q, true), nil
}

// GenOLEODBC generates a oleodbc DSN from the passed URL.
func GenOLEODBC(u *URL) (string, error) {
	props, err := GenODBC(u)
	if err != nil {
		return "", nil
	}
	return `Provider=MSDASQL.1;Extended Properties="` + props + `"`, nil
}

// GenClickhouse generates a clickhouse DSN from the passed URL.
func GenClickhouse(u *URL) (string, error) {
	z := &url.URL{
		Scheme:   "tcp",
		Opaque:   u.Opaque,
		Host:     u.Host,
		Path:     u.Path,
		RawPath:  u.RawPath,
		RawQuery: u.RawQuery,
		Fragment: u.Fragment,
	}
	if z.Port() == "" {
		z.Host += ":9000"
	}
	// build q
	q := z.Query()
	if u.User != nil {
		if user := u.User.Username(); len(user) > 0 {
			q.Set("username", user)
		}
		if pass, ok := u.User.Password(); ok {
			q.Set("password", pass)
		}
	}
	z.RawQuery = q.Encode()
	return z.String(), nil
}

// GenVoltDB generates a VoltDB DSN from the passed URL.
func GenVoltDB(u *URL) (string, error) {
	host, port := "localhost", "21212"
	if h := u.Hostname(); h != "" {
		host = h
	}
	if p := u.Port(); p != "" {
		port = p
	}
	return host + ":" + port, nil
}

// GenPresto generates a Presto DSN from the passed URL.
func GenPresto(u *URL) (string, error) {
	z := &url.URL{
		Scheme:   "http",
		Opaque:   u.Opaque,
		User:     u.User,
		Host:     u.Host,
		RawQuery: u.RawQuery,
		Fragment: u.Fragment,
	}
	// change to https
	if strings.HasSuffix(u.OriginalScheme, "s") {
		z.Scheme = "https"
	}
	// force user
	if z.User == nil {
		z.User = url.User("user")
	}
	// force host
	if z.Host == "" {
		z.Host = "localhost"
	}
	// force port
	if z.Port() == "" {
		if z.Scheme == "http" {
			z.Host += ":8080"
		} else if z.Scheme == "https" {
			z.Host += ":8443"
		}
	}
	// add parameters
	q := z.Query()
	dbname, schema := strings.TrimPrefix(u.Path, "/"), ""
	if dbname == "" {
		dbname = "default"
	} else if i := strings.Index(dbname, "/"); i != -1 {
		schema, dbname = dbname[i+1:], dbname[:i]
	}
	q.Set("catalog", dbname)
	if schema != "" {
		q.Set("schema", schema)
	}
	z.RawQuery = q.Encode()
	return z.String(), nil
}

// GenCassandra generates a cassandra DSN from the passed URL.
func GenCassandra(u *URL) (string, error) {
	host, port, dbname := "localhost", "9042", strings.TrimPrefix(u.Path, "/")
	if h := u.Hostname(); h != "" {
		host = h
	}
	if p := u.Port(); p != "" {
		port = p
	}
	q := u.Query()
	// add user/pass
	if u.User != nil {
		q.Set("username", u.User.Username())
		if pass, _ := u.User.Password(); pass != "" {
			q.Set("password", pass)
		}
	}
	// add dbname
	if dbname != "" {
		q.Set("keyspace", dbname)
	}
	return host + ":" + port + genQueryOptions(q), nil
}

// GenIgnite generates an ignite DSN from the passed URL.
func GenIgnite(u *URL) (string, error) {
	host, port, dbname := "localhost", "10800", strings.TrimPrefix(u.Path, "/")
	if h := u.Hostname(); h != "" {
		host = h
	}
	if p := u.Port(); p != "" {
		port = p
	}
	q := u.Query()
	// add user/pass
	if u.User != nil {
		q.Set("username", u.User.Username())
		if pass, _ := u.User.Password(); pass != "" {
			q.Set("password", pass)
		}
	}
	// add dbname
	if dbname != "" {
		dbname = "/" + dbname
	}
	return "tcp://" + host + ":" + port + dbname + genQueryOptions(q), nil
}

// GenSnowflake generates a snowflake DSN from the passed URL.
func GenSnowflake(u *URL) (string, error) {
	host, port, dbname := u.Hostname(), u.Port(), strings.TrimPrefix(u.Path, "/")
	if host == "" {
		return "", ErrMissingHost
	}
	if port != "" {
		port = ":" + port
	}
	// add user/pass
	if u.User == nil {
		return "", ErrMissingUser
	}
	user := u.User.Username()
	if pass, _ := u.User.Password(); pass != "" {
		user += ":" + pass
	}
	return user + "@" + host + port + "/" + dbname + genQueryOptions(u.Query()), nil
}

// GenCosmos generates a azure cosmos DSN from the passed URL.
func GenCosmos(u *URL) (string, error) {
	host, port, dbname := u.Hostname(), u.Port(), strings.TrimPrefix(u.Path, "/")
	if port != "" {
		port = ":" + port
	}
	q := u.Query()
	q.Set("AccountEndpoint", "https://"+host+port)
	// add user/pass
	if u.User == nil {
		return "", ErrMissingUser
	}
	q.Set("AccountKey", u.User.Username())
	if dbname != "" {
		q.Set("Db", dbname)
	}
	return genOptionsODBC(q, true), nil
}

// GenSpanner generates a google spanner DSN from the passed URL.
func GenSpanner(u *URL) (string, error) {
	project, instance, dbname := u.Hostname(), "", strings.TrimPrefix(u.Path, "/")
	if project == "" {
		return "", ErrMissingHost
	}
	i := strings.Index(dbname, "/")
	if i == -1 {
		return "", ErrMissingPath
	}
	instance, dbname = dbname[:i], dbname[i+1:]
	if instance == "" || dbname == "" {
		return "", ErrMissingPath
	}
	return fmt.Sprintf(`project/%s/instances/%s/databases/%s`, project, instance, dbname), nil
}

// GetSchemeTruncate generates a DSN by truncating the scheme://.
func GenSchemeTruncate(u *URL) (string, error) {
	s := u.String()
	if i := strings.Index(s, "://"); i != -1 {
		return s[i+3:], nil
	}
	return s, nil
}

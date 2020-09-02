#!/bin/sh
host=$1
port=$2

while ! nc -z $host $port;
do
    sleep 1;
done;

echo "$host:$port is up"

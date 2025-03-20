#!/bin/bash

# Parameters
HOST="${POSTGRES_HOST:-postgres}"
PORT="${POSTGRES_PORT:-5432}"

echo "Waiting for Postgres at $HOST:$PORT..."

until pg_isready -h "$HOST" -p "$PORT" > /dev/null 2>&1; do
  sleep 1
done

echo "Postgres is up and ready!"
exec "$@"

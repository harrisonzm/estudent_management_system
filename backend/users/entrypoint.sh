#!/bin/sh
set -e

# Function to wait for Postgres to be ready
wait_for_postgres() {
  echo "Waiting for Postgres at ${POSTGRES_HOST}:${DB_PORT}..."
  until pg_isready -h "${POSTGRES_HOST}" -p "${DB_PORT}" > /dev/null 2>&1; do
    sleep 1
  done
  echo "Postgres is up and ready!"
}

# Wait until Postgres is ready
wait_for_postgres

# Run Prisma migrations and generate client if using Prisma
if [ -f "prisma/schema.prisma" ]; then
  echo "Running Prisma migrations..."
  npx prisma migrate deploy
  echo "Generating Prisma client..."
  npx prisma generate
fi

# Start the NestJS application
echo "Starting NestJS..."
npm run start:prod

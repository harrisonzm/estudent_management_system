#!/bin/bash
set -e

echo "${POSTGRES_PASSWORD:-postgres}"
echo "${POSTGRES_USER:-postgres}"
echo "${POSTGRES_HOST:-postgres}"
# Export password for non-interactive authentication
export PGPASSWORD="${POSTGRES_PASSWORD:-postgres}"

# Function: wait for external Postgres to be ready
wait_for_postgres() {
  echo "Waiting for Postgres at ${POSTGRES_HOST:-postgres}:${DB_PORT:-5432}..."
  until pg_isready -h "${POSTGRES_HOST:-postgres}" -p "${DB_PORT:-5432}" > /dev/null 2>&1; do
    sleep 1
  done
  echo "Postgres is up and ready!"
}

# Wait until external Postgres is ready
wait_for_postgres

# Create the database if it does not exist
echo "Checking if database '$POSTGRES_DB' exists..."
if psql -U "$POSTGRES_USER" -h "$POSTGRES_HOST" -tc "SELECT 1 FROM pg_database WHERE datname = '$POSTGRES_DB'" | grep -q 1; then
  echo "Database '$POSTGRES_DB' already exists."
else
  echo "Creating database '$POSTGRES_DB'..."
  psql -U "$POSTGRES_USER" -h "$POSTGRES_HOST" -c "CREATE DATABASE $POSTGRES_DB"
fi

# Create the "users" table in the database if it does not exist
echo "Checking if table 'users' exists in database '$POSTGRES_DB'..."
if psql -U "$POSTGRES_USER" -h "$POSTGRES_HOST" -d "$POSTGRES_DB" -tc "SELECT to_regclass('public.users');" | grep -q users; then
  echo "Table 'users' already exists, skipping creation."
else
  echo "Creating table 'users' in database '$POSTGRES_DB'..."
  psql -U "$POSTGRES_USER" -h "$POSTGRES_HOST" -d "$POSTGRES_DB" -c "
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  "
fi

# (Optional) Run Prisma migrations & generate client if you use Prisma
#echo "Running Prisma migrations..."
#npx prisma migrate deploy
#echo "Generating Prisma client..."
#npx prisma generate

# Finally, start your application (e.g., NestJS)
echo "Starting NestJS..."
npm run build
npm run start:prod

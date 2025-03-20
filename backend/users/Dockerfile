FROM node:18-alpine

# Install Postgres
RUN apk add --no-cache postgresql postgresql-contrib su-exec bash

# Create Postgres data directory
RUN mkdir -p /var/lib/postgresql/data

# ENV variables (can be overridden by docker-compose)
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=usersDB

WORKDIR /usr/src/app

# Install Node dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build
# Custom entrypoint to launch both Postgres and NestJS

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
EXPOSE 5432


CMD ["/entrypoint.sh"]


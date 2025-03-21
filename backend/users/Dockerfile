# FROM node:18-alpine AS builder

# # Set working directory
# WORKDIR /app

# # Install dependencies
# COPY package*.json ./
# RUN npm install

# # Copy source code
# COPY . .

# # Build the NestJS application
# RUN npm run build

# # Use a smaller base image for the production environment
# FROM node:18-alpine AS production

# # Set working directory
# WORKDIR /app

# # Install PostgreSQL client
# RUN apk add --no-cache postgresql-client

# # Copy only necessary files from the builder stage
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/entrypoint.sh ./entrypoint.sh

# # Ensure the entrypoint script is executable
# RUN chmod +x ./entrypoint.sh

# # Expose application port
# EXPOSE 3001
# EXPOSE 5432

# # Set the entrypoint
# ENTRYPOINT ["./entrypoint.sh"]

# Dockerfile para el gateway
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start"]

# Stage 1: Build the Frontend
FROM node:22-alpine AS builder

ARG VITE_G_API_URL
ARG RAILWAY_ENVIRONMENT
ARG RAILWAY_SERVICE_NAME

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy root package.json, pnpm-workspace.yaml, and pnpm-lock.yaml
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

# Install all dependencies
RUN pnpm install

# Copy all workspace packages (includes API, Backend, Frontend)
COPY . .

# Build the Frontend
RUN pnpm --filter frontend run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Install gettext for envsubst (environment variable substitution)
RUN apk add --no-cache gettext

# Copy custom Nginx configuration template
COPY Frontend/nginx.conf.template /etc/nginx/nginx.conf.template

# Copy entrypoint script
COPY Frontend/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built Frontend code from builder
COPY --from=builder /app/Frontend/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Set entrypoint to handle dynamic configuration and start Nginx
ENTRYPOINT ["/entrypoint.sh"]
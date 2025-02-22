#!/bin/sh

# Generate final nginx.conf using environment variables
envsubst < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Start Nginx
exec "$@"
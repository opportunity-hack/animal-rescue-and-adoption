#!/bin/sh

# Replace $VITE_G_API_URL with the environment variable value
envsubst '$VITE_G_API_URL' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Start Nginx
nginx -g 'daemon off;'
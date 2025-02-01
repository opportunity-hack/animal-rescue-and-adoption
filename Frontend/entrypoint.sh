#!/bin/sh

# Replace $API_URL with the environment variable value
envsubst '$API_URL' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Start Nginx
nginx -g 'daemon off;'
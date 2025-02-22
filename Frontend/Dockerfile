# syntax = docker/dockerfile:1

ARG NODE_VERSION=20.10.0
FROM node:${NODE_VERSION}-slim

LABEL fly_launch_runtime="Vite"

WORKDIR /app

ENV NODE_ENV="production"
ENV VITE_G_API_URL="https://backend-young-log-855.fly.dev/api"
ENV VITE_G_CLIENT_ID="26525210223-bpf7edsqfarqju9prhint6a9ipjqebrm.apps.googleusercontent.com"

COPY package.json ./
# Copy vite.config.js to /app
COPY vite.config.ts ./
RUN npm install
RUN npm install -g serve



COPY . .
RUN npm run build



EXPOSE 4173
CMD ["serve", "-s", "dist", "-l", "4173"]

# -------------------------
# 1) Base build environment
# -------------------------
    FROM node:22-alpine AS build

    # Install pnpm globally
    RUN npm install -g pnpm
    
    # Create the working directory
    WORKDIR /app
    
    # Copy the backend's package.json
    COPY Backend/package.json ./
    
    # Install dependencies
    RUN pnpm install
    
    # Copy the rest of your backend folder
    COPY Backend/ .
    
    # Build your production files if you have a separate build step
    RUN pnpm run build
    
    # -------------------------
    # 2) Production environment
    # -------------------------
    FROM node:22-alpine AS production
    
    # Reinstall pnpm globally or copy from build if you prefer
    RUN npm install -g pnpm
    
    # Create a clean working directory
    WORKDIR /app
    
    # Copy over everything from the build stage
    COPY --from=build /app .
    
    # Expose the port
    EXPOSE 4000
    
    # Launch
    CMD ["pnpm", "run", "start"]
    
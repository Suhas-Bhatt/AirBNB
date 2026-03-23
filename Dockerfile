# ---- Base Stage ----
FROM node:22-alpine AS base
WORKDIR /app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev

# ---- Final Stage ----
FROM node:22-alpine
WORKDIR /app

# Copy installed node_modules from base stage
COPY --from=base /app/node_modules ./node_modules

# Copy application source code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Use NODE_ENV=production for the container
ENV NODE_ENV=production

# Start the application
CMD ["node", "app.js"]

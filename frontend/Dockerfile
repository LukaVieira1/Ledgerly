# 🛠 Stage 1: Build (Uses a larger image to compile everything)
FROM node:18-alpine AS builder

# Define the working directory
WORKDIR /app

# Copies only the necessary files to install dependencies
COPY package.json yarn.lock ./

# Installs dependencies (excluding devDependencies to reduce size)
RUN yarn install --frozen-lockfile --production=false

# Copies the source code and generates the Next.js build
COPY . .
RUN yarn build

# 🏗 Stage 2: Runtime (Final image, lighter and more secure)
FROM node:18-alpine

# Define the working directory
WORKDIR /app

# Copies only the necessary files to run the app
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules

# Railway automatically exposes the port, but we ensure port 3000
EXPOSE 8080

# Final command to run the application on Railway
CMD ["yarn", "start"]

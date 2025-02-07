FROM node:18-alpine

# Install necessary dependencies
RUN apk add --no-cache openssl libc6-compat netcat-openbsd



WORKDIR /app

# Copy configuration files first
COPY package*.json ./
COPY yarn.lock ./
COPY prisma ./prisma/
COPY tsconfig.json ./

# Create scripts directory and copy
RUN mkdir -p scripts
COPY scripts/start.sh ./scripts/
COPY scripts/wait-for-it.sh ./scripts/

# Make scripts executable
RUN chmod +x ./scripts/start.sh
RUN chmod +x ./scripts/wait-for-it.sh

# Ensure migrations directory exists and has correct permissions
RUN mkdir -p prisma/migrations && chmod -R 777 prisma/migrations

# Install dependencies
RUN yarn install

# Copy remaining files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Make scripts executable
RUN chmod +x /app/scripts/*.sh

EXPOSE 5050
EXPOSE 5555

# Use start script
CMD ["sh", "./scripts/start.sh"] 

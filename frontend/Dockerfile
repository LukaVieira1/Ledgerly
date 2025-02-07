# Use the base Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Build the project
RUN yarn build

# Copy the rest of the files
COPY . .

# Expose the port that Next.js will use
EXPOSE 3000

# Command to start the production server
CMD ["yarn", "start"] 
# Base image
FROM node:16.16.0-alpine

# Set working directory
WORKDIR /app/auth-service

# Copy the package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Expose port
EXPOSE 4002

# Start the app
CMD ["yarn", "start:dev"]
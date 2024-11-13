# Use official Node.js image as base image
FROM node:lts-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the entire project (including source code and .env) into the container
COPY . .

# Run Prisma generate to create Prisma client
RUN npx prisma generate

# Expose the application port (adjust as needed)
EXPOSE 80

RUN npm run build
# Start the application
CMD ["npm", "start"]

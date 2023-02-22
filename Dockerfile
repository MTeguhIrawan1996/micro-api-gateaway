# Use Node.js 16.15.1 as the base image
FROM node:16.15.1-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json file to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port 3001
EXPOSE 3001

# Start the API Gateway service
CMD [ "npm", "start" ]

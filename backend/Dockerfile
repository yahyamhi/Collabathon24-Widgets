# Use Red Hat Alpine-based image for the backend
FROM registry.access.redhat.com/ubi8/nodejs-14-minimal

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Start the application
CMD ["npm", "run", "start"]

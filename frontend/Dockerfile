# Use Red Hat Alpine-based image for the frontend
FROM registry.access.redhat.com/ubi8/nodejs-20-minimal

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install --production

# Adjust permissions for ESLint cache
RUN chmod -R 777 /app/node_modules/.cache

# Copy the rest of the application code
COPY . .

# Add missing Babel plugin to prevent build errors
RUN npm install --save-dev @babel/plugin-proposal-private-property-in-object

# Build the React app
RUN npm run build

# Use NGINX to serve the static frontend files
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]

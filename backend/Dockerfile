# Use a lightweight Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /src

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose the port the production app will run on
EXPOSE 5000

# Use a lightweight static server for production builds (optional)
CMD ["npm", "run", "start"] 

# Specify a base image
FROM node:alpine

# Specify a work directory in the container
WORKDIR /usr/app

# Copy static files to the container (avoids a cache bust)
COPY ./package.json ./

# Install npm dependencies
RUN npm install

# Copy source files
COPY ./ ./

# Tell the image what to do when it starts as a container
# 'npm start'
CMD [ "npm", "start" ]


# Build with 'docker build .'
# Run with 'docker run [identifier]'
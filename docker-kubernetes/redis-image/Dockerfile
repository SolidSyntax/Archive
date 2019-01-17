# Use an existing docker image as a base
FROM alpine

# Download and install a dependecy
RUN apk add --update redis
# unused - RUN apk add --update gcc

# Tell the image what to do when it starts as a container
CMD [ "redis-server" ]


# Build with 'docker build .'
# Run with 'docker run [identifier]'
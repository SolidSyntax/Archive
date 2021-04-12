FROM node:14-alpine

WORKDIR /app

# Limit the image to a specified application
ENTRYPOINT ["npm"]


# docker build -t node-util .                       --> build image

# docker run -it -v /home/hans/Documents/Archive/academind-docker-kubernetes/utility-container:/app node-util npm init             
# -> run a command in the container and mirror the output to the local machine, WITHOUT ENTRYPOINT

# docker run -it -v /home/hans/Documents/Archive/academind-docker-kubernetes/utility-container:/app node-util init             
# -> run a command in the container and mirror the output to the local machine, WITH ENTRYPOINT

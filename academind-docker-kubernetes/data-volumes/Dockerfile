FROM node:14

ARG DEFAULT_PORT=80

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ENV PORT $DEFAULT_PORT

EXPOSE $PORT

# VOLUME ["/app/feedback"]  # anonymous value, not persistent

CMD [ "npm", "start" ]

# docker build -t feedback-node:volumes .
# docker build -t feedback-node:other-port --build-arg DEFAULT_PORT=8000.
# docker run -d --rm -p 3000:800 --env PORT=8000 --name feedback-app -v feedback:/app/feedback -v "/home/hans/Documents/Archive/academind-docker-kubernetes/data-volumes:/app:ro" -v /app/temp -v /app/node_modules feedback-node:volumes
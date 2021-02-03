FROM node:14

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ENV PORT 80

EXPOSE $PORT

# VOLUME ["/app/feedback"]  # anonymous value, not persistent

CMD [ "npm", "start" ]

# docker build -t feedback-node:volumes .
# docker run -d --rm -p 3000:800 --env PORT=8000 --name feedback-app -v feedback:/app/feedback -v "/home/hans/Documents/Archive/academind-docker-kubernetes/data-volumes-01-starting-setup:/app:ro" -v /app/temp -v /app/node_modules feedback-node:volumes
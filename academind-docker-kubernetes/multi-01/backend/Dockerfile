FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

ENV MONGODB_USER=admin
ENV MONGODB_PASSWORD=admin

CMD [ "npm", "start" ]

# docker network create goals-net
# docker build -t goals-node .
# docker run --name goals-backend -v /home/hans/Documents/Archive/academind-docker-kubernetes/multi-01/backend:/app -v logs:/app/logs -v /app/node_modules -d --rm -p 80:80 --network goals-net -e MONGODB_USER=admin -e MONGODB_PASSWORD=admin goals-node
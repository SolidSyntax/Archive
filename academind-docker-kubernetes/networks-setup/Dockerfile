FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["node", "app.js"]


# docker run -d --name mongodb mongo
# docker container inspect mongodb   --> Ip zoeken en gebruiken in de applicatie

# docker build -t favorites-node .
# docker run --name favorites -d --rm -p 3000:000 favorites-node



# Docker networks
# docker network create favorites-net
# docker run -d --name mongodb --network favorites-net mongo

# docker run --name favorites -d --rm --network favorites-net -p 3000:000 favorites-node
FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

CMD [ "node", "app.js" ]

# docker build -t goals-node .
# docker run --name goals-backend -d --rm -p 80:80 goals-node
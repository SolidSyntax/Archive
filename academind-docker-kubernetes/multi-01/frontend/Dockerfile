FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]

# docker build -t goals-react .
# docker run --name goals-frontend -d --rm -p 3000:3000 goals-react
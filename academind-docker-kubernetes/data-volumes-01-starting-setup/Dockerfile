FROM node:14

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

EXPOSE 80

# VOLUME ["/app/feedback"]  # anonymous value, not persistent

CMD [ "node", "server.js" ]
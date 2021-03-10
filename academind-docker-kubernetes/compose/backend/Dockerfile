FROM node:14

WORKDIR /app

RUN mkdir -p /app/logs

RUN chown -R 1000:1000 /app/logs

RUN chmod a+wr /app/logs

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

ENV MONGODB_USERNAME=root
ENV MONGODB_PASSWORD=secret

CMD ["npm", "start"]
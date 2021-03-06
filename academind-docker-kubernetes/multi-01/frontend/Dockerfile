FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]

# docker build -t goals-react .
# docker run --name goals-frontend -it --rm --network goals-net -v /home/hans/Documents/Archive/academind-docker-kubernetes/multi-01/frontend/src:/app/src -p 3000:3000 goals-react    -> interactive mode, nodig om de development server te starten
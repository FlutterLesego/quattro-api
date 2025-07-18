FROM node:20.10.0-alpine3.18

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./

EXPOSE 8000

CMD ["node", "src/server.js"]
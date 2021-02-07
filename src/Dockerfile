FROM node:latest

COPY package.json /app/package.json
WORKDIR /app
RUN npm install

cmd ["node", "public/index.js"]
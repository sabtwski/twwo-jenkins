FROM node:10.23-alpine

RUN mkdir -p /app
COPY . /app
WORKDIR /app

RUN npm install

EXPOSE 3000

ENTRYPOINT npm run dev

FROM node AS builder

WORKDIR /app

COPY public ./public
COPY package*.json .env ./
COPY server ./server
RUN npm install \
  && npm run compile \
  && rm -rf server node_modules \
  && npm install --production


FROM alpine

WORKDIR /app/example_app/

COPY --from=builder /app .

RUN apk add --no-cache --update nodejs nodejs-npm

ENV NODE_ENV production

# DB Connection String
ENV PGCONNECTURL postgres://postgres:12345@host.docker.internal:5432/examplePg
ENV MONGOCONNECTURL mongodb://mongo:12345@host.docker.internal:27017/exampleMongo
ENV REDISCONNECTURL redis://:12345@host.docker.internal:6379/0

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]

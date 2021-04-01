FROM node AS builder

WORKDIR /app

COPY public ./public
COPY package*.json .env ./
COPY server ./server
RUN npm install \
  && npm run compile \
  && rm -rf server \
  && rm -rf node_modules \
  && npm install --production

FROM alpine

WORKDIR /app/example_app/

COPY --from=builder /app .

RUN apk add --no-cache --update nodejs nodejs-npm \
  && mkdir /app/log

ENV NODE_ENV production
EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]

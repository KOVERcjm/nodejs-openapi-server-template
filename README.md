# Node.js OpenAPI Server Template
A backend API server template based on express, with DB connection of PostgreSQL, Redis and MongoDB.

This server is built using [Node.js](https://nodejs.org/) as programming language and [express](http://expressjs.com/) as web framework, following OpenAPI 3.0 Specification. Due to Node.js [following](https://nodejs.org/en/knowledge/getting-started/what-is-require/) the CommonJS module system, this server will also follow the same specification.

[Koa](https://koajs.com/) version can be found in [this branch](https://github.com/KOVERcjm/nodejs-openapi-server-template/tree/Koa_based).

# 0 Getting started
Install dependency and initialize DB via Docker (if not existed):

``` shell
npm install

# Generate self-signed cert if necessary.
openssl req -x509 -new -nodes -sha256 -utf8 -days 365 -newkey rsa:4096 -subj '/CN=localhost' -keyout server/cert/private.key -out server/cert/certificate.crt

# Start DB via Docker if necessary
docker run --name PostgreSQL --restart always -e POSTGRES_PASSWORD=12345 -e POSTGRES_DB=examplePg -p 5432:5432 -d postgres

docker run --name Mongo --restart always -e MONGO_INITDB_ROOT_USERNAME=mongo -e MONGO_INITDB_ROOT_PASSWORD=12345 -e MONGO_INITDB_DATABASE=exampleMongo -p 27017:27017 -d mongo

docker run --name Redis --restart always -p 6379:6379 -d redis redis-server --appendonly yes --requirepass "12345"
```

Test server:

```shell
npm test
```

Run server in development:

```shell
npm run dev
```

Run server in production (compile and then start):

```shell
npm run compile
npm start
```


# 2 How to use

1. Search and replace all 'templatevalue' in this project with your project name or description.
2. Replace all '3000' in `.env Dockerfile api.yml` with actual port number you want to use.
3. Have fun.


# 3 Project Directories

- `/public` - Swagger pages for illustration for APIs
- `/server` - API server
  - `/api` - server endpoints source code
    - `/handlers` - handlers for all endpoints, refer to path of x-eov-operation-handler and x-eov-operation-id in `/server/common/api.yml`
    - `/services` - internal services for controllers to use, like DB service and internal API call service 
  - `/cert` - place the server's HTTPS crt and key file here (remind to use the HTTPS codes in `server/app.js`)
  - `/common` - `api.yml` for describe the API server following OpenAPI specification, `db.connection.js` for establishing DB connection in basic level, and `logger.js` using `log4js` library to prettier the log output
  - `/middlewares` - store express middlewares like error handler
  - `app.js` - create a server application
- `/test` - testing programs using `Mocha` framework to test the endpoints or code unit tests


# 4 Dockerize

Replace the DB connection string in Dockerfile if not have DB server in local.

Run `docker build` command to pack the server into an image. The following is for your reference:

``` shell
docker build -t my_app .
docker run -d --name my_app -p 3000:3000 my_app
```


# 5 Reference

- [OpenAPI 3.0 Specification](https://swagger.io/specification/)
- [express-openapi-validator](https://github.com/cdimascio/express-openapi-validator)

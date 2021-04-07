# nodejs-express-server-template
A Node.js server template based on express, with DB connection of Sequelize.

The example API connects PostgreSQL, Redis and MongoDB database.

# 0 Getting started
Install dependency and initialize DB if not existed:

``` shell
npm install

docker run --name PostgreSQL -e POSTGRES_PASSWORD=12345 -e POSTGRES_DB=exampleDB -p 5432:5432 -d postgres

```

Run server in development:

```shell
npm run dev
```

Test server:

```shell
npm run test
```

# 1 Summary

To build this server, we using [Node.js](https://nodejs.org/) as programming language and [express](http://expressjs.com/) as web framework, following OpenAPI 3.0 Specification. Due to Node.js [following](https://nodejs.org/en/knowledge/getting-started/what-is-require/) the CommonJS module system, we will also follow the same specification.

# 2 Technical Details

## 2.1 Modules to launch a server

In `./package.json`, describes scripts to launch the server. Like `"dev": "nodemon index.js --exec babel-node --config .nodemonrc.json | pino-pretty"` means that when you type `npm run dev`, it will use `nodemon` tool to launch `index.js`running under babel-node CLI. 

> **nodemon** is a tool that helps develop node.js based applications by automatically restarting the node application when file changes.
>
> **babel-node** is a CLI that works exactly the same as the Node.js CLI, with the added benefit of compiling (ES6 code) with Babel presets and plugins before running it.

### 2.1.1 index.js

The server starts with `./index.js`.

`dotenv`is a module to load environment variables from a `.env` file into [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env), and we must run the following codes before all others.

```js
const dotenv = require('dotenv');
dotenv.config();
```

Then we imported `./server/common/oas.js`module to make suer our server following the OpenAPI Specification and `./server/app.js` to build the application with `express` framework. Also, to ensure connection security, we imported `https` module to create server, and the TLS certification is stored under `./server/cert`.

### 2.1.2 oas.js

In `./server/common/oas.js`, we use `OpenApiValidator` to make sure the application following OpenAPI Specification with `./server/common/api.yml` setting; and then added with routes (`./server/routes.js`) to support version control of different versions of endpoints; finally added with common error handler to make standarlized error response.

### 2.1.3 app.js

In `./server/app.js`, we created an app object with `express` framework and set up the middlewares to pre-process the requests. 

## 2.2 Modules for global usage

Other modules for global usage is placed under the `/server/common` folder, namely `config.js` (to store runtime global constant values), `db.js` (to establish connection with database of three kinds) and `logger.js` (to print out colorful console messages with `pino` library). And there is the `api.yml`, which stores the [definition of OpenAPI](https://swagger.io/docs/specification/basic-structure/). 

## 2.3 Modules for functional usage

`/server/api/controllers/` - For each major version, depending on the difference of logic, there may have different conbinations of controllers and routers. In all, controllers provide the detailed implementation and routers control the API versions.

`/server/api/middlewares` - For handling errors thrown out from controllers and other parts of code, there is a middleware to standarlize the API's output, and let the server runs properly.

`/server/api/models` and `/server/api/services` - For MongoDB connection, `models` folder stores the data structures that been used by MongoDB connector, `Mongoose`. And for other separate function modules, they are been set at `services` folders for reusable.

# 3 Docker support

For compile the server to a Docker image:

- If the server can run by `npm run dev`, use the Dockerfile as default. It will copy all files, including `node_modules`, based on the latest [Node.js official Docker image](https://hub.docker.com/_/node/).
- If wants to have less copying, `.dockerignore` can also work with additional commands in `Dockerfile` like `RUN npm update && npm install`.

Some compile commands for reference:

``` shell
docker build -t my_app .
docker run -d --name my_app -p 3000:3000 my_app
```

# 4 Reference

- [OpenAPI 3.0 Specification](https://swagger.io/specification/)
- [express-no-stress](https://github.com/cdimascio/generator-express-no-stress)

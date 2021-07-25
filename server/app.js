require('dotenv').config();
// const fs = require('fs');
const http = require('http');
// const https = require('https');
const Koa = require('koa');
const logger = require('./common/logger').getLogger('[Sever]');
const router = require('./api/handlers/router');

const app = new Koa();
require('koa-onerror')(app);
app.use(require('@koa/cors')());
app.use(
  require('koa-bodyparser')({
    enableTypes: ['json', 'form', 'text']
  })
);
app.use(require('koa-json')());
app.use(require('koa-logger')());
app.use(require('koa-static')(`${__dirname}/public`));

// TODO: Add OpenAPI 3 Validator

app.use(router.routes()).use(router.allowedMethods());

app.on('error', (err, ctx) => {
  logger.error(err);
  logger.debug(ctx);
});

const port = process.env.PORT;
const welcome = () => logger.info(`Up and running in ${process.env.NODE_ENV || 'dev'} on port: ${port}\n`);

const server = http.createServer(app.callback()).listen(port);
// If would like to create https server, use the following lines to replace the above one

// const key = fs.readFileSync(`${__dirname}/cert/private.key`);
// const cert = fs.readFileSync(`${__dirname}/cert/certificate.crt`);
// const server = https.createServer({ key, cert }, app.callback()).listen(port);

server.on('listening', welcome);

process.on('exit', () => {
  server.close();
  logger.fatal(`TERMINATED.\n`);
});

module.exports = app;

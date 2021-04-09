const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const express = require('express');
require('express-async-errors');
const openApiValidator = require('express-openapi-validator');
// const fs = require('fs');
const http = require('http');
// const https = require('https');
const multer = require('multer');
const path = require('path');

const errorHandler = require('./middlewares/error.handler');
const logger = require('./common/logger').getLogger('[Server]');
const router = require('./api/controllers/router');

const app = express();
const apiSpec = path.join(__dirname, 'common/api.yml');
const validateResponses = !!(
  process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION &&
  'true' === process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase()
);

app.use(express.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
app.use(express.urlencoded({ extended: true, limit: process.env.REQUEST_LIMIT || '100kb' }));
app.use(express.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(cors());
app.use(express.static(path.normalize(`${__dirname}/../public`)));
app.use(process.env.OPENAPI_SPEC || '/spec', express.static(apiSpec));
app.use(
  openApiValidator.middleware({
    apiSpec,
    validateResponses,
    fileUploader: { storage: multer.memoryStorage() }
  })
);
Object.keys(router).forEach(v => {
  app.use(`/api/${v}/`, router[v]);
});
app.use(errorHandler);

const port = process.env.PORT;
const welcome = () =>
  logger.info(`Up and running in ${process.env.NODE_ENV || 'dev'} on port: ${port}\n`);

const server = http.createServer(app).listen(port, welcome);

// If would like to create https server, use the following lines to replace the above one

// const key = fs.readFileSync(`${__dirname}/cert/private.key`);
// const cert = fs.readFileSync(`${__dirname}/cert/certificate.crt`);
// const server = https.createServer({ key, cert }, app).listen(port, welcome);

process.on('exit', () => {
  server.close();
  logger.fatal(`TERMINATED.\n`);
});

module.export = app;

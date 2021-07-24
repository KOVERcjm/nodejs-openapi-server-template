const logger = require('../../common/logger');
const api = require('../services/api.service');
const db = require('../services/db.service');

const example = async (req, res) => {
  const l = logger.getLogger(`[${req.method} ${req.url}]`);
  l.debug(`Endpoint been called.`);

  // Test API call function (mock Microsoft website as an internal API)
  await api.call(l, 'GET', 'https://www.microsoft.com', '/');

  // Test DB connection
  await db.pgCreate('asdf', 123);
  await db.pgUpdate('asdf', 456);
  await db.pgRetrieve('asdf');
  await db.pgDelete('asdf');

  await db.mongoCreate('asdf', 123);
  await db.mongoUpdate('asdf', 456);
  await db.mongoRetrieve('asdf');
  await db.mongoDelete('asdf');

  await db.redisCreate('asdf', 123);
  await db.redisUpdate('asdf', 456);
  await db.redisRetrieve('asdf');
  await db.redisDelete('asdf');

  l.info('Endpoint responded.\n');
  res.status(200).end();
};

const fileUpload = async (req, res) => {
  const l = logger.getLogger(`[${req.method} ${req.url}]`);
  l.info(req.files);

  l.info('Endpoint responded.\n');
  res.status(200).end();
};

module.exports = { example, fileUpload };

const logger = require('../../common/logger');
const api = require('../services/api.service');
const db = require('../services/db.service');

const example = async (req, res) => {
  const l = logger.getLogger(`[${req.method} ${req.url}]`);
  l.debug('Endpoint been called.');

  // Test API call function (mock Microsoft website as an internal API)
  await api.call(l, 'GET', 'https://www.microsoft.com', '/');

  // Test DB connection
  await db.pgCreate('test', 123);
  await db.pgUpdate('test', 456);
  await db.pgRetrieve('test');
  await db.pgDelete('test');

  await db.mongoCreate('test', 123);
  await db.mongoUpdate('test', 456);
  await db.mongoRetrieve('test');
  await db.mongoDelete('test');

  await db.redisCreate('test', 123);
  await db.redisUpdate('test', 456);
  await db.redisRetrieve('test');
  await db.redisDelete('test');

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

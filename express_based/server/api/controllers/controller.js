const logger = require('../../common/logger');
const db = require('../services/db.service');

const example = async (req, res) => {
  const l = logger.getLogger(`[${req.method} ${req.url}]`);
  l.debug(`API been called.`);

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

  l.info('API responded.\n');
  res.status(200).end();
};

module.exports = { example };

const l = require('../../common/logger');
const db = require('../services/db.service');

const example = async (req, res) => {
  const functionCaller = 'POST /example -';
  l.debug(`${functionCaller} Function called.`);

  await db.pgCreate('asdf', 123);
  await db.pgUpdate('asdf', 456);
  await db.pgRetrieve('asdf');
  await db.pgDeleteId('asdf');

  await db.mongoCreate('asdf', 123);
  await db.mongoUpdate('asdf', 456);
  await db.mongoRetrieve('asdf');
  await db.mongoDeleteId('asdf');

  await db.redisCreate('asdf', 123);
  await db.redisUpdate('asdf', 456);
  await db.redisRetrieve('asdf');
  await db.redisDeleteId('asdf');

  res.status(200).end();
};

module.exports = { example };

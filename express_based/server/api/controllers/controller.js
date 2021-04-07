const l = require('../../common/logger');
const db = require('../services/db.service');

const example = async (req, res) => {
  const functionCaller = 'POST /example -';
  l.debug(`${functionCaller} Function called.`);

  await db.pg_create('asdf');

  await db.pg_update('asdf', 123);

  const data = await db.pg_retrieve('asdf');

  await db.pg_deleteId('asdf');

  res.status(200).end();
};

module.exports = { example };

const l = require('../../common/logger');

/*
const db = require('../services/db.service');

const dbExample = async (req, res) => {
  await db.create('asdf');

  await db.update('asdf', 123);

  const data = await db.retrieve('asdf');

  await db.deleteId('asdf');
};
*/

const example = async (req, res) => {
  const functionCaller = 'POST /example -';
  l.debug(`${functionCaller} Function called.`);

  res.status(200).end();
};

module.exports = { example };

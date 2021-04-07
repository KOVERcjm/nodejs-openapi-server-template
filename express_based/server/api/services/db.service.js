const db = require('../../common/db');

const pg_create = targetId => db.pg_examples.create({ id: targetId });

const pg_update = (targetId, data) =>
  db.pg_examples.update(
    { data },
    {
      where: { id: targetId }
    }
  );

const pg_retrieve = targetId => db.pg_examples.findAll({ attributes: ['data'], where: { id: targetId } });

const pg_deleteId = targetId => db.pg_examples.destroy({ where: { id: targetId } });

module.exports = { pg_create, pg_update, pg_retrieve, pg_deleteId };

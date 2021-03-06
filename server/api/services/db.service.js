const db = require('../../common/db.connection');

const pgCreate = (id, data) => db.PgExamples.create({ id, data });
const pgUpdate = (id, data) =>
  db.PgExamples.update(
    { data },
    {
      where: { id }
    }
  );
const pgRetrieve = id => db.PgExamples.findAll({ attributes: ['data'], where: { id } });
const pgDelete = id => db.PgExamples.destroy({ where: { id } });

const mongoCreate = (key, value) => db.mongoExamples.create({ key, value });
const mongoUpdate = (key, value) => db.mongoExamples.updateOne({ key }, { value });
const mongoRetrieve = key => db.mongoExamples.findOne({ key });
const mongoDelete = key => db.mongoExamples.deleteOne({ key });

const redisCreate = (key, value) => db.redisDb0.set(key, value);
const redisUpdate = (key, value) => db.redisDb0.set(key, value);
const redisRetrieve = key => db.redisDb0.get(key);
const redisDelete = key => db.redisDb0.del(key);

module.exports = {
  pgCreate,
  pgUpdate,
  pgRetrieve,
  pgDelete,
  mongoCreate,
  mongoUpdate,
  mongoRetrieve,
  mongoDelete,
  redisCreate,
  redisUpdate,
  redisRetrieve,
  redisDelete
};

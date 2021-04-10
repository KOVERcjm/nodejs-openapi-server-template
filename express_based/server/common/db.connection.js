const { Sequelize, DataTypes } = require('sequelize');
const mongoose = require('mongoose');
const Redis = require('ioredis');

const logger = require('./logger').getLogger('[DB Connection]');

// PostgreSQL Connection
const _pg = new Sequelize(process.env.PGCONNECTURL, {
  logging: sql => logger.trace(sql),
  dialectOptions: { ssl: false }
});

(async () => {
  await _pg.authenticate().catch(err => {
    logger.fatal(`[PostgreSQL DB] ${err}`);
    process.exit();
  });
  await _pg.sync({ alter: true });
})();

const pgExamples = _pg.define(
  'example',
  {
    id: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    data: { type: DataTypes.INTEGER, defaultValue: 0 }
  },
  { timestamps: false }
);

// Mongo Connection
const _mongo = mongoose
  .createConnection(process.env.MONGOCONNECTURL, {
    auth: { authSource: 'admin' },
    autoIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .on('error', err => {
    logger.fatal(`[Mongo DB] ${err}\n`);
    process.exit();
  });

const _exampleSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  value: { type: String, index: true }
});

const mongoExamples = _mongo.model('example', _exampleSchema);

// Redis Connection
const redisDb0 = new Redis(process.env.REDISCONNECTURL).on('error', err => {
  logger.fatal(`[Redis DB] ${err}`);
  process.exit();
});

module.exports = { pgExamples, mongoExamples, redisDb0 };

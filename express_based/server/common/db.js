const { Sequelize, DataTypes } = require('sequelize');
const l = require('./logger');

const pg = new Sequelize(process.env.PGCONNECTURL, {
  logging: sql => l.debug(sql),
  dialectOptions: {
    ssl: false
  }
});

const pg_examples = pg.define(
  'example',
  {
    id: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    data: { type: DataTypes.INTEGER, defaultValue: 0 }
  },
  { timestamps: false }
);

(async () => {
  await pg.sync({ alter: true });
})();

module.exports = { pg_examples };

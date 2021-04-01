const l = require('pino')({
  name: process.env.APP_ID,
  level: process.env.LOG_LEVEL,
  prettyPrint: { colorize: true, ignore: 'pid,hostname', translateTime: 'SYS:m/d H:M:s' }
});

module.exports = l;

const logger = require('log4js').configure({
  appenders: {
    stdout: { type: 'stdout', layout: { type: 'pattern', pattern: '%[%d{hh:mm:ss} %p %c - %m%]' } }
  },
  categories: { default: { appenders: ['stdout'], level: process.env.LOG_LEVEL || 'trace' } }
});

module.exports = logger;

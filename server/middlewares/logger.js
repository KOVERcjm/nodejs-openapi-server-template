/**
 *  The default setting of logs will be in colorful text string.
 */
const logger = require('log4js').configure({
  appenders: {
    stdout: { type: 'stdout', layout: { type: 'pattern', pattern: '%[%d{hh:mm:ss} %p %c - %m%]' } }
  },
  categories: { default: { appenders: ['stdout'], level: process.env.LOG_LEVEL || 'trace' } }
});

/**
 *  Use the following code if you want to have the logs in JSON format.
 */
// const log4js = require('log4js');
//
// log4js.addLayout('json', function() {
//   return function(logEvent) { return JSON.stringify(logEvent); }
// });
// const logger = log4js.configure({
//   appenders: { stdout: { type: 'stdout', layout: { type: 'json' } },
//   categories: { default: { appenders: ['stdout'], level: process.env.LOG_LEVEL || 'trace' } }
// });

module.exports = logger;

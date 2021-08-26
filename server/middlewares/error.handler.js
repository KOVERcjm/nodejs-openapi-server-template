const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
  if (req) {
    const requestUrl = req.url;
    const url = requestUrl.substring(
      requestUrl.includes('/api/v') ? 7 : 0,
      requestUrl.includes('?') ? requestUrl.indexOf('?') : requestUrl.length
    );
    const l = logger.getLogger(`[${req.method} ${url}]`);
    l.debug(`${err.stack}`);
    l.info(`Error occurred. Action Failed.\n`);
    res.status(403).json({ message: err.message });
  } else {
    const l = logger.getLogger('[Server]');
    l.warn(`Error occured. Action Failed: ${err.stack}\n`);
    res.status(500).json({ message: 'Internal server error' });
  }
  next();
};

module.exports = errorHandler;

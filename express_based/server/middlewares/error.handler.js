const l = require('../common/logger');

const errorHandler = (err, req, res) => {
  if (req) {
    const requestUrl = req.url;
    const url = requestUrl.substring(
      requestUrl.includes('/api/v') ? 7 : 0,
      requestUrl.includes('?') ? requestUrl.indexOf('?') : requestUrl.length
    );
    l.debug(`${req.method} ${url} - Error: ${err.message}`);
    l.info(`${req.method} ${url} - Error occurred. Action Failed.\n`);
    res.status(403).json({ message: err.message });
  } else {
    l.warn(`[Unhandled ERROR]: ${err}\n`);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = errorHandler;

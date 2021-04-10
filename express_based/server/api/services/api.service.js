const axios = require('axios');
const https = require('https');
const { inspect } = require('util');

axios.defaults.timeout = 50000;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const call = async (l, method, baseURL, url, data) => {
  l.info(`API calling: ${baseURL}${url}`);
  const response = await axios({
    url,
    method,
    baseURL,
    data,
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    validateStatus(status) {
      return 2 === parseInt(status / 100, 10);
    }
  }).catch(error => {
    if (error.response) {
      l.debug(`API response data: ${inspect(error.response.data)}`);
      l.info(`API respond: [${error.response.status} ${error.response.statusText}]`);
      throw new Error('Internal API rejected');
    } else {
      l.warn(`API request error: ${error.message}`);
      throw new Error(`Internal API ${baseURL}${url} no response`);
    }
  });

  l.debug(`API response data: ${inspect(response.data)}`);
  l.info(`API respond: [${response.status} ${response.statusText}]`);
  
  return response.data;
};

module.exports = { call };

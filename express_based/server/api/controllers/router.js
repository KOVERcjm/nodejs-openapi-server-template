const express = require('express');
const controller = require('./controller');

const v1 = express.Router().post('/example', controller.example);

module.exports = { v1 };

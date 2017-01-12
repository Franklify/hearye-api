'use strict';

var api = require('express').Router();

api.all('*', function (request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Authorization, Accept, X-Access-Token, X-Key, Content-Type, Content-Length');
  next();
});

module.exports = api;
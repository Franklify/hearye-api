'use strict';
var express = require('express'),
    app = express(),
    database = require('./dist/db'),
    helmet = require('helmet'),
    responseTime = require('response-time');

app.use(helmet()); // Hides dangerous headers like X-powered-by, etc.
app.use(responseTime()); // Creates X-Response-Time header 

var api = require('./dist');
app.use('/', api);

module.exports = app;
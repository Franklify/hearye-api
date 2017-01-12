'use strict';
var express = require('express'),
    app = express(),
    database = require('./dist/db'),
    helmet = require('helmet');

app.use(helmet());

var api = require('./dist');
app.use('/', api);

module.exports = app;
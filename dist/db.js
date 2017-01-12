'use strict';

var config = require('./config');
var logger = require('./logger');
var dbConfig = require('../knexfile');

var bookshelf = require('bookshelf');
var knex = require('knex');

var KNEX_CONFIG = config.isDevelopment ? dbConfig.development : dbConfig.production;

function DatabaseManager() {
  this._knex = knex(KNEX_CONFIG);
  this._bookshelf = bookshelf(this._knex);
  this._bookshelf.plugin('pagination');
  this._bookshelf.plugin('registry');
}

DatabaseManager.prototype.constructor = DatabaseManager;

DatabaseManager.prototype.instance = function () {
  return this._bookshelf;
};

DatabaseManager.prototype.connection = function () {
  return this._knex;
};

if (config.isDevelopment) {
  logger.info('🗂  Connected to local database %s as %s', dbConfig.development.connection.database, dbConfig.development.connection.user);
}

module.exports = new DatabaseManager();
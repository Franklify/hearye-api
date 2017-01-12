'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var config = require('./config');
var logger = require('./logger');
var dbConfig = require('../knexfile');

var bookshelf = require('bookshelf');
var knex = require('knex');

var KNEX_CONFIG = config.isDevelopment ? dbConfig.development : dbConfig.production;

var DatabaseManager = function () {
  function DatabaseManager(knexConfig) {
    _classCallCheck(this, DatabaseManager);

    this._knex = knex(knexConfig);
    this._bookshelf = bookshelf(this._knex);
    this._bookshelf.plugin('pagination');
    this._bookshelf.plugin('registry');
  }

  _createClass(DatabaseManager, null, [{
    key: 'instance',
    value: function instance() {
      return this._bookshelf;
    }
  }]);

  return DatabaseManager;
}();

if (config.isDevelopment) {
  logger.info('🗂  Connected to database %s as %s', dbConfig.development.connection.database, dbConfig.development.connection.user);
}

module.exports = new DatabaseManager(KNEX_CONFIG);
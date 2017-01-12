const config = require('./config')
const logger = require('./logger')
const dbConfig = require('../knexfile')

const bookshelf = require('bookshelf')
const knex = require('knex')

const KNEX_CONFIG = config.isDevelopment ? dbConfig.development : dbConfig.production

class DatabaseManager {
  constructor (knexConfig) {
    this._knex = knex(knexConfig)
    this._bookshelf = bookshelf(this._knex)
    this._bookshelf.plugin('pagination')
    this._bookshelf.plugin('registry')
  }

  static instance () {
    return this._bookshelf
  }
}

if (config.isDevelopment) {
  logger.info('🗂  Connected to local database %s as %s', dbConfig.development.connection.database, dbConfig.development.connection.user)
}

module.exports = new DatabaseManager(KNEX_CONFIG)
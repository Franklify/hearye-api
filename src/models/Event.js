const Model = require('./Model')
const _Promise = require('bluebird')
const _ = require('lodash')
const database = require('../db')
const bookshelf = database.instance()


let Event = Model.extend({
  tableName: 'events',
  idAttribute: 'id',
  hasTimestamps: ['created', 'updated'],
  validations: {
    name: ['required', 'string'],
    description: 'string'
  }
})
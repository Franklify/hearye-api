const inflection = require('inflection')
const _ = require('lodash')
const checkit = require('checkit')
const database = require('../db')
const bookshelf = database.instance()

/**
 * Generates a datastore transaction
 * @param  {Function} callback method to initiate transaction
 * @return {Promise}  the result of the callback
 */
function _transaction (cb) {
  return bookshelf.transaction(cb)
}

/**
 * Fetches a model by its ID
 * @param  {Number|String} id the ID of the model with the appropriate type
 * @return {Promise<Model>} a Promise resolving to the resulting model or null
 */
function _findById (id) {
  let model = new this()
  let queryParams = {}
  queryParams[model.idAttribute] = id
  return model.query({ where: queryParams }).fetch()
}


let Model = bookshelf.Model.extend(
  { validations: {} },
  {
    transaction: _transaction,
    findById: _findById 
  }
)


/*
 * Initializes the model by setting up all event handlers
 */
Model.prototype.initialize = function () {
  this.on('saving', this.validate)
}

/**
 * Ensures keys being inserted into the datastore have the correct format
 * @param  {Object} attrs the attributes to transform
 * @return {Object} the transformed attributes (underscored)
 */
Model.prototype.format = function (attrs) {
  return _.mapKeys(attrs, (v, k) => inflection.underscore(k, true))
}

/**
 * Ensures keys being retrieved from the datastore have the correct format
 * @param  {Object} attrs the attributes to transform
 * @return {Object} the transformed attributes (camel-cased)
 */
Model.prototype.parse = function (attrs) {
  return _.mapKeys(attrs, (v, k) => inflection.camelize(k, true))
}

/**
 * Validates the attributes of this model based on the assigned validations
 * @return {Promise} resolving to the validity of the attributes, as decided by
 * the Checkit library
 */
Model.prototype.validate = function () {
  return checkit(this.validations).run(this.attributes)
}

module.exports = Model

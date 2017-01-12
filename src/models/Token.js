const _Promise = require('bluebird')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const Model = require('./Model')
const User = require('./User')
const config = require('../config')
const database = require('../db')
const bookshelf = database.instance()

const JWT_SECRET = config.auth.secret
const JWT_CONFIG = {
  expiresIn: config.auth.expiresIn
}

let Token = Model.extend({
  tableName: 'tokens',
  idAttribute: 'id',
  hasTimestamps: ['created'],
  user: () => {
    return this.belongsTo(User)
  },
  validations: {
    value: ['required', 'string']
  }
})

/* Forges a token model and saves it to the tokens table
 * based on a generated JSON web token
 * @param {Object} payload - the content to claim the token 
 * @param {String} subject (optional) - the subject of the claim
 * @returns {String} - an authorization token with an expiration date
 * @throws an Json Web Token Error 
 */
Token.create = function (payload, subject) {
  subject = subject.toString()
  let token = Token.forge({ user_id: subject })

  return Token
    .transaction((t) => {
      return token.generate(payload, subject)
        .then((result) => {
          return result.save(null, { transacting : t })
        })
        .then((result) => {
          return result.get('value')
        })
    })
}

/* Creates a JSON Web Token value based on a payload and user
 * @param {Object} payload - the content to claim the token 
 * @param {String} subject (optional) - the subject of the claim
 * @returns {String} - an authorization token with an expiration
 * @throws an JSON Web Token Error
 */
Token.prototype.generate = function (payload, subject) {
  const parameters = _.clone(JWT_CONFIG)
  if (arguments.length > 1) {
    parameters.subject = subject
  }
  return _Promise.resolve(this.set({ value: jwt.sign(payload, JWT_SECRET, parameters) }))
}


/* Finds a token given the Token value
 * @param {String} value The Token's value
 * @return {Promise} resolving to the associated Token Model
 */
Token.findByValue = function (value) {
  return this.collection().query({ where: { value: value }}).fetchOne({ withRelated: ['user'] } )
}

bookshelf.model('Token', Token)
module.exports = Token

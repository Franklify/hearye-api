const _Promise = require('bluebird')

const Token = require('../models/Token')
const config = require('../config')
const errors = require('../errors')
const milliseconds = require('ms')

/**
 * Finds a token given the Token value
 * @param {String} value The Token's value
 * @param {String} scope The Scope the token is for
 * @return {_Promise} resolving to the associated Token Model
 * @throws {NotFoundError} when the requested token cannot be found
 * @throws {TokenExpirationError} when the request token has expired
 * @throws {TypeError} when the scope was not found
 */
module.exports.findTokenByValue = (value, scope) => {
  if (!(scope in config.token.expiration)) {
    return _Promise.reject(new TypeError('An invalid or non-existent scope was provided'))
  }

  return Token
    .findByValue(value)
    .then((result) => {
      if (!result) {
        throw new errors.NotFoundError('The provided token does not exist')
      }

      const expiration = milliseconds(config.token.expiration[scope])
      const tokenExpiration = Date.parse(result.get('created')) + expiration
      if (tokenExpiration < Date.now()) {
        result.destroy()
        throw new errors.TokenExpirationError()
      }

      return _Promise.resolve(result)
    })
}


module.exports.createToken = (payload, userId) => {
  return Token
    .where({ user_id: userId }).fetchAll()
    .then((tokens) => {
      return tokens.invokeThen('destroy')
        .then(() => {
          return Token.create(payload, userId)
        })
    })
}
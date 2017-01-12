const _Promise = require('bluebird')
const checkit = require('checkit')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const { TokenService } = require('../services')
const errors = require('../errors')
const config = require('../config')

/* Issues a token for the parameterized user
 * @param  {User} user the User model holding the information to claim
 * @return {_Promise} resolving to the auth token
 */
module.exports.issueTokenForUser = (user) => {
  const subject = user.get('id')
  const payload = {
    email: user.get('email')
  }
  return _Promise
    .try(() => {
      const token = TokenService.createToken(payload, subject)
      return _Promise.resolve(token)
    })
}

/* Verifies the parameterized token's signature and expiration
 * @param  {String} token an authentication token
 * @return {_Promise} resolving to the validity of the token, or a rejected
 * _Promise resolving to an UnprocessableRequestError
 */
module.exports.verify = (token) => {
  return _Promise
    .try(() => {
      return _Promise.resolve(jwt.verify(token, config.secret))
    })
    .catch(jwt.JsonWebTokenError, (error) => {
      const message = error.message
      throw new errors.BadRequestError(message)
    })
}
const { AuthService } = require('../services')
const User = require('../models/User')
const config = require('../config')
const errors = require('../errors')


module.exports = (request, response, next) => {
  const auth = request.header(config.auth.header)

  if (!auth) {
    return next()
  }

  return AuthService.verify(auth)
    .then((decoded) => {
      request.auth = true
      return User.findById(decoded.sub)
    })
    .then((user) => {
      request.user = user

      next()
      return null
    })
    .catch(errors.BadRequestError, (error) => {
      const message = `The provided token was invalid ${error.message}`
      const source = config.auth.header

      next(new errors.InvalidHeaderError(message, source))
      return null
    })
}
const _ = require('lodash')
const errors = require('../errors')

module.exports = (allowed, isOwner) => {
  if (!_.isArray(allowed)) {
    allowed = [allowed]
  }

  return (request, response, next) => {
    if (!request.auth) {
      return next(new errors.UnauthorizedError())
    }

    else if (isOwner) {
        var result = isOwner(request)

        if ('function' === typeof result.then) {
          result.then((truth) => {
            if (!truth) {
              next(new errors.UnauthorizedError())
            } else {
              next()
            }
          })
          .catch((error) => {
            next(error)
          })
          
        } else if (!result) {
          return next(new errors.UnauthorizedError())

        } else {
          next()
        }
      }

    else {
      return next(new errors.UnauthorizedError()) // Ummm, try again, sweetie ;)
    }
  }
}
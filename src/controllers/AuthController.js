
const bodyParser = require('body-parser')

const errors = require('../errors')
const middleware = require('../middleware')
const requests = require('../requests')
const services = require('../services')

let router = require('express').Router()


/**
 * Issues a token using the provided email address,
 * @param  {String} email    a user's email address
 * @param  {String} password the associated user's password (optional)
 * @return {_Promise} a _Promise resolving to an auth token
 * @throws {NotFoundError} when there is no user associated with the email
 * @throws {InvalidParameterError} when the provided password is incorrect
 */
function _issueTokenByEmail (email, password) {
  return services.UserService
    .findUserByEmail(email)
    .then((user) => {
      if (!password) {
        return services.AuthService.issueTokenForUser(user)
      }

      return services.UserService
        .verifyPassword(user, password)
        .then(() => {
          return services.AuthService.issueTokenForUser(user)
        })
    })
}


function createToken (request, response, next) {
  _issueTokenByEmail(request.body.email, request.body.password) // Password must be valid 
    .then((auth) => {
      response.body = {}
      response.body.auth = auth

      next()
      return null
    })
    .catch((error) => {
      next(error)
      return null
    })
}

function refreshToken (request, response, next) {
  if (!request.auth) {
    const message = 'A refresh token cannot be issued without a valid token'
    return next(new errors.InvalidHeaderError(message))
  }

  _issueTokenByEmail(request.user.email)
    .then((auth) => {
      response.body = {}
      response.body.auth = auth

      next()
      return null
    })
    .catch((error) => {
      next(error)
      return null
    })
}

router.use(bodyParser.json())
router.use(middleware.auth)

router.post('', middleware.request(requests.AuthRequest), createToken)
router.get('/refresh', refreshToken)

router.use(middleware.response)
router.use(middleware.errors)

module.exports.createToken = createToken
module.exports.router = router
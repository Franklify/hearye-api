const ApiError = require('./ApiError')

class TokenExpirationError extends ApiError {
  constructor(message, source) {
    super(message, source)

    this.type = 'TokenExpirationError'
    this.status = 401
    this.title = 'Token Expired'
    this.message = message ? message : 'The provided token has expired'
    this.source = source ? source : null
  }
}

module.exports = TokenExpirationError

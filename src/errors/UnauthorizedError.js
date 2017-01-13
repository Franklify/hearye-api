const ApiError = require('./ApiError')

class UnauthorizedError extends ApiError {
  constructor(message, source) {
    super(message, source)

    this.type = 'UnauthorizedError'
    this.title = 'Unauthorized'
    this.status = 401
    this.message = message ? message : 'You have unauthorized privileges and cannot access this resource'
    this.source = source ? source : null
  }
}

module.exports = UnauthorizedError

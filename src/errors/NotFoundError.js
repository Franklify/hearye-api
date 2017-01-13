const ApiError = require('./ApiError')

class NotFoundError extends ApiError {
  constructor(message, source) {
    super(message, source)

    this.type = 'NotFoundError'
    this.title = 'Not Found'
    this.status = 404
    this.message = message ? message : 'This resource you are trying to access cannot be found'
    this.source = source ? source : null
  }
}

module.exports = NotFoundError

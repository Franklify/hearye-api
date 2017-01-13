const BadRequestError = require('./BadRequestError')

class InvalidHeaderError extends BadRequestError {
  constructor(message, source) {
    super(message, source)

    this.type = 'InvalidHeaderError'
    this.title = 'Invalid Header'
    this.message = message ? message : 'One or more headers in the request are invalid'
    this.source = source ? source : null
  }
}

module.exports = InvalidHeaderError

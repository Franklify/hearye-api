const BadRequestError = require('./BadRequestError')

class InvalidParameterError extends BadRequestError {
  constructor(message, source) {
    super(message, source)

    this.type = 'InvalidParameterError'
    this.title = 'Invalid Parameter Error'
    this.message = message ? message : 'One or more parameters in the request were invalid'
    this.source = source ? source : null
  }
}

module.exports = InvalidParameterError

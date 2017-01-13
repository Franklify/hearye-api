const BadRequestError = require('./BadRequestError')

class MissingHeaderError extends BadRequestError {
  constructor(message, source) {
    super(message, source)

    this.type = 'MissingHeaderError'
    this.title = 'Missing Header'
    this.message = message ? message : 'One or more headers are missing in the request'
    this.source = source ? source : null
  }
}

module.exports = MissingHeaderError

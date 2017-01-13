const ApiError = require('./ApiError')

class BadRequestError extends ApiError {
  constructor(message, source) {
    super(message, source)

    this.type = 'BadRequestError'
    this.title = 'Bad Request Error'
    this.status = 400
    this.message = message ? message : 'The server received a request that could not be processed'
    this.source = source ? source : null
  }
} 

module.exports = BadRequestError

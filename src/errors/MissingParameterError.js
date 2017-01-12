const BadRequestError = require('./BadRequestError')

class MissingParameterError extends BadRequestError {
  constructor(message, source) {
    super(message, source)
    
    this.type = 'MissingParameterError'
    this.title = 'Missing Parameter'
    this.message = message ? message : 'One or more parameters are missing in your request'
    this.source = source ? source : null
  }
}

module.exports = MissingParameterError

const Request = require('./Request')

let bodyRequired = ['email', 'password']
let bodyValidations = {
  'email': ['required', 'email'],
  'password': ['required', 'string']
}

class AuthRequest extends Request {
  constructor(headers, body) {
    super(headers, body)

    this.bodyRequired = bodyRequired
    this.bodyValidations = bodyValidations
  }
}

module.exports = AuthRequest

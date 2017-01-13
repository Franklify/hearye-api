const Request = require('./Request')

let bodyRequired = ['email', 'password']
let bodyValidations = {
  'email': ['required', 'email'],
  'password': ['required', 'string'],
}
let bodyAllowed = ['email', 'password', 'firstName', 'lastName', 'phoneNumber']

class UserCreationRequest extends Request {
  constructor(headers, body) {
    super(headers, body)

    this.bodyRequired = bodyRequired
    this.bodyValidations = bodyValidations
    this.bodyAllowed = bodyAllowed
  }
}

module.exports = UserCreationRequest

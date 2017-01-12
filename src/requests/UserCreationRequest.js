const Request = require('./Request')

let bodyRequired = ['email', 'password']
let bodyValidations = {
  'email': ['required', 'email'],
  'password': ['required', 'string'],
}
let bodyAllowed = ['email', 'password', 'firstName', 'lastName', 'phoneNumber']

function UserCreationRequest (headers, body) {
  Request.call(this, headers, body)
  this.bodyRequired = bodyRequired
  this.bodyValidations = bodyValidations
  this.bodyAllowed = bodyAllowed
}

UserCreationRequest.prototype = Object.create(Request.prototype)
UserCreationRequest.prototype.constructor = UserCreationRequest

module.exports = UserCreationRequest

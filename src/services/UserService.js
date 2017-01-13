const checkit = require('checkit')
const _Promise = require('bluebird')
const _ = require('lodash')

const User = require('../models/User')
const errors = require('../errors')
const { handleValidationError } = require('../utils')


module.exports.createUser = (firstName, lastName, email, password, phoneNumber) => {
  email = email.toLowerCase()
  let user = User.forge({ first_name: firstName, last_name: lastName, email: email, password: password, phone_number: phoneNumber })

  return user
    .validate()
    .catch(checkit.Error, handleValidationError)
    .then((validated) => {
      return User.findByEmail(email)
    })
    .then((result) => {
      if (!_.isNull(result)) {
        const message = 'A user with the given email already exists'
        const source = 'email'
        throw new errors.InvalidParameterError(message, source)
      }
      return User.create(firstName, lastName, email, password, phoneNumber)
    })
    .then((result) => {
      return _Promise.resolve(result)
    })
}

/**
 * Finds a user by querying for the given ID
 * @param  {Number} id the ID to query
 * @return {_Promise} resolving to the associated User model
 * @throws {NotFoundError} when the requested user cannot be found
 */
module.exports.findUserById = (id) => {
  return User
    .findById(id)
    .then((result) => {
      if (_.isNull(result)) {
        const message = 'A user with the given ID cannot be found'
        const source = 'id'
        throw new errors.NotFoundError(message, source)
      }

      return _Promise.resolve(result)
    })
}

/**
 * Finds a user by querying for the given email
 * @param  {String} email the email to query
 * @return {_Promise} resolving to the associated User model
 * @throws {NotFoundError} when the requested user cannot be found
 */
module.exports.findUserByEmail = (email) => {
  return User
    .findByEmail(email)
    .then((result) => {
      if (_.isNull(result)) {
        const message = 'A user with the given email cannot be found'
        const source = 'email'
        throw new errors.NotFoundError(message, source)
      }
      return _Promise.resolve(result)
    })
}

/**
 * Verifies that the provided password matches the user's password
 * @param  {User} user a User model
 * @param  {String} password the value to verify
 * @return {_Promise} resolving to the validity of the provided password
 * @throws {InvalidParameterError} when the password is invalid
 */
module.exports.verifyPassword = (user, password) => {
  return user
    .hasPassword(password)
    .then((result) => {

      if (!result) {
        const message = 'The provided password is incorrect'
        const source = 'password'
        throw new errors.InvalidParameterError(message, source)
      }

      return _Promise.resolve(true)
    })
}
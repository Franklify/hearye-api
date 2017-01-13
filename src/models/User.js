const Model = require('./Model')
const _Promise = require('bluebird')
const bcrypt = _Promise.promisifyAll(require('bcrypt'))
const _ = require('lodash')
const database = require('../db')
const bookshelf = database.instance()


let User = Model.extend({
  tableName: 'users',
  idAttribute: 'id',
  hasTimestamps: ['created', 'updated'],
  validations: {
    email: ['required', 'string'],
    password: ['required', 'string'],
    phone_number: ['required', 'string'],
    first_name: ['string'],
    last_name: ['string']
  }
})

/* Creates new user */
User.create = function (firstName, lastName, email, password, phoneNumber) {
  let user = User.forge({ first_name: firstName, last_name: lastName, email: email, phone_number: phoneNumber })

  return User
    .transaction((t) => {
      return user.setPassword(password)
        .then((result) => {
          return result.save(null, { transacting: t })
        })
        .then(() => {
          return User.where({ id: user.get('id') }).fetch({ transacting: t })
        })
    })
}

/*
 * Finds a user by its ID
 * @param  {Number|String} id the ID of the model with the appropriate type
 * @return {_Promise<Model>}  a Promise resolving to the resulting model or null
 */
User.findById = function (id) {
  return User.where({ id: id }).fetch()
}


/*
 * Finds a user by email
 * @param  {Number|String} the email of the model 
 * @return {_Promise<Model>} a Promise resolving to the resulting model or null
 */
User.findByEmail = function (email) {
  email = email.toLowerCase()
  return User.where({ email: email }).fetch({})
}


/**
 * Determines whether or not a password matches this user's password
 * @param  {String}  a password 
 * @return {_Promise} resolving to a Boolean representing the validity of the password
 */
User.prototype.hasPassword = function (password) {
  return _Promise
    .bind(this)
    .then(() => {
      return bcrypt.compareAsync(password, this.get('password'))
    })
}

/* Hashes password and sets the hashed password to the User model
 * @param  {Number|String} password for model
 * @return {_Promise<Model>}  a Promise resolving to the resulting model or null
 */
User.prototype.setPassword = function (password) {
  return bcrypt
    .hashAsync(password, 12)
    .bind(this)
    .then((p) => {
      return _Promise.resolve(this.set({ password: p }))
    })
}


bookshelf.model('User', User)
module.exports = User

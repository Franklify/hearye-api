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


/* Hashes password and sets the hashed password to the User model
 * @param  {Number|String} password for model
 * @return {_Promise<Model>}  a Promise resolving to the resulting model or null
 */
User.prototype.setPassword = (password) => {
  return bcrypt
    .hashAsync(password, 12)
    .bind(this)
    .then(function (p) {
      return _Promise.resolve(this.set({ password: p }))
    })
}

/*
 * Finds a user by its ID
 * @param  {Number|String} id the ID of the model with the appropriate type
 * @return {_Promise<Model>}  a Promise resolving to the resulting model or null
 */
User.findById = (id) => {
  return User.where({ id: id }).fetch()
}


/*
 * Finds a user by email
 * @param  {Number|String} the email of the model 
 * @return {_Promise<Model>} a Promise resolving to the resulting model or null
 */
User.findByEmail = (email) => {
  email = email.toLowerCase()
  return User.where({ email: email }).fetch({})
}


/**
 * Determines whether or not a password matches this user's password
 * @param  {String}  a password 
 * @return {_Promise} resolving to a Boolean representing the validity of the password
 */
User.hasPassword = (password) => {
  return _Promise
    .bind(this)
    .then(function() {
      return bcrypt.compareAsync(password, this.get('password'))
    })
}

bookshelf.model('User', User)
module.exports = User

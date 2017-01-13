const checkit = require('checkit')
const _Promise = require('bluebird')
const _ = require('lodash')

const errors = require('../errors')

let headerValidations = {}
let headerRequired = []

let bodyValidations = {}
let bodyRequired = []
let bodyAllowed = []

class Request {
  constructor(headers, body) {
    this.headerValidations = headerValidations
    this.bodyValidations = bodyValidations
    this.headerRequired = headerRequired
    this.bodyRequired = bodyRequired
    this.bodyAllowed = bodyAllowed

    this._headers = headers
    this._body = body
    this._audited = false
    this._cleaned = false
  }

  _isRaw() {
    return (this._body instanceof Buffer || this._body instanceof String)
  }

  body() {
    return this._body
  }

  checkRequiredParameters() {
    let missingHeaders = []
    let missingParameters = []

    _.forEach(this.headerRequired, _.bind((requiredHeader) => {
      if (!_.has(this._headers, requiredHeader.toLowerCase())) {
        missingHeaders.push(requiredHeader)
      }
    }, this))

    if (missingHeaders.length) {
      throw new errors.MissingHeaderError(null, missingHeaders)
    }

    if (_.isUndefined(this._body) || _.isNull(this._body)) {
      const errMessage = 'The request body could not be parsed'
      throw new errors.BadRequestError(errMessage, null)
    }

    if (!this._isRaw()) {
      _.forEach(this.bodyRequired, _.bind((requiredParameter) => {
        if (!_.has(this._body, requiredParameter)) {
          missingParameters.push(requiredParameter)
        }
      }, this))
      
      if (missingParameters.length) {
        throw new errors.MissingParameterError(null, missingParameters)
      }
    }

    this._audited = true
  }

  removeExtraneousParameters() {
    if (this._isRaw()) {
      this._cleaned = true
      return
    }

    this._body = _.pick(this._body, _.merge(this.bodyRequired, this.bodyAllowed))
    this._cleaned = true
  }

  validate() {
    if (!this._audited) { this.checkRequiredParameters() }
    if (!this._cleaned) { this.removeExtraneousParameters() }

    const self = this
    return checkit(self.headerValidations).run(self._headers)
      .then((validatedFields) => {
        if (self._isRaw()) {
          return _Promise.resolve(true)
        }
        return checkit(self.bodyValidations).run(self._body)
      })
  }

}

module.exports = Request
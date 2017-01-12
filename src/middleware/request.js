const checkit = require('checkit')

const errors = require('../errors')
const { handleValidationError } = require('../utils')

module.exports = (Request) => {
  return (req, res, next) => {
    if (!Request) {
      return next()
    }

    let request = new Request(req.headers, req.body)
    request.validate()
      .then((validated) => {
        req.body = request.body()

        next()
        return null
      })
      .catch(checkit.Error, handleValidationError)
      .catch((error) => {
        next(error)
        return null
      })
  }
}
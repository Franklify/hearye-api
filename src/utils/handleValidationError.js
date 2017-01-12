
const { InvalidParameterError } = require('../errors');

/**
 * Re-throws a checkit validation error as an InvalidParameter Error
 * @param  {Checkit.Error} error the error to re-throw
 * @throws {InvalidParameterError} the re-thrown error
 */
module.exports.handleValidationError = (error) => {
  const errorKey = error.keys()[0]
  let err = error.errors[errorKey]

  let errMessage = err.message
  let errSource
  while (err.key) {
    errSource = err.key
    err = (err.errors) ? err.errors[0] : undefined
  }

  throw new InvalidParameterError(errMessage, errSource)
}
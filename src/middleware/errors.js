const errors = require('../errors')
const logger = require('../logger')

module.exports = (err, req, response, next) => {
  if (!(err instanceof Error)) {
    logger.info('Caught an unknown error')
    logger.error(err)

    err = new errors.ApiError()
  }

  else if (err instanceof Error && err.status === 413) {
    // TODO: create error for entity being too large
    err = new errors.ApiError('The entity is too large')
  }

  else if (err instanceof SyntaxError && err.status === 400) {
    err = new errors.BadRequestError()
  }

  else if (!err.isApiError) {
    logger.info('Caught an unhandled error')
    logger.error(err.stack)

    err = new errors.ApiError()
  }

  const ret = {
    meta: null,
    error: err
  }

  response.status(err.status).json(ret)
}
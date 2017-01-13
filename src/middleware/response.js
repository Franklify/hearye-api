module.exports = (request, response, next) => {
  if (!response.headersSent) {
    let ret = {
      meta: (response.meta) ? response.meta : null,
      data: (response.body) ? response.body : {}
    }
    response.json(ret);
  }

  next()
}
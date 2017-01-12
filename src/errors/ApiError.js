class ApiError extends Error {
  constructor(message, source) {
    super(message)

    this.type = 'ApiError'
    this.title = 'API Error'
    this.status = 500
    this.message = message ? message : 'An unknown error has occurred'
    this.source = source ? source : null
    this.isApiError = true

    this.toJSON = () => {
      return {
        type: this.type,
        title: this.title,
        status: this.status,
        message: this.message,
        source: this.source
      }
    }
  }
}

module.exports = ApiError

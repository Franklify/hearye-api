let api = require('express').Router()
const controllers = require('./controllers')

api.all('*', (request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS')
  response.header('Access-Control-Allow-Headers', 'Authorization, Accept, X-Access-Token, X-Key, Content-Type, Content-Length')
  next()
})

api.use('/user', controllers.UserController.router);

module.exports = api

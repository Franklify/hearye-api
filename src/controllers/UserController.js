const bodyParser = require('body-parser')

const services = require('../services')
const middleware = require('../middleware')
const requests = require('../requests')

let router = require('express').Router()

router.use(bodyParser.json())

function hasOwnership (request) {
  return parseInt(request.user.get('id')) === parseInt(request.params.id);
}

function createUser (request, response, next) {
  services.UserService
    .createUser(request.body.first_name, request.body.last_name, request.body.email, request.body.password)
    .then(function (user) {
      return services.AuthService.issueTokenForUser(user);
    })
    .then(function (auth) {
      response.body = {};
      response.body.auth = auth;

      next();
      return null;
    })
    .catch(function (error) {
      next(error);
      return null;
    });
}

function getUser (request, response, next) {
  var id = request.params.id;

  services.UserService
    .findUserById(id)
    .then(function (user) {
      response.body = user.toJSON();

      next();
      return null;
    })
    .catch(function (error) {
      next(error);
      return null;
    });
}


router.use(middleware.response)
router.use(middleware.errors)

module.exports = router

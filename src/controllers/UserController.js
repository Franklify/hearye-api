const bodyParser = require('body-parser')

const services = require('../services')
const middleware = require('../middleware')
const requests = require('../requests')
let router = require('express').Router()

function hasOwnership (request) {
  return parseInt(request.user.get('id')) === parseInt(request.params.id);
}

function createUser (request, response, next) {
  services.UserService
    .createUser(request.body.firstName, request.body.lastName, request.body.email, request.body.password, request.body.phoneNumber)
    .then((user) => {
      console.log(user)
      return services.AuthService.issueTokenForUser(user);
    })
    .then((auth) => {
      response.body = {};
      response.body.auth = auth;

      next();
      return null;
    })
    .catch((error) => {
      next(error);
      return null;
    });
}

function getUser (request, response, next) {
  const id = request.params.id;

  services.UserService
    .findUserById(id)
    .then((user) => {
      response.body = user.toJSON();

      next();
      return null;
    })
    .catch((error) => {
      next(error);
      return null;
    });
}

router.use(bodyParser.json())
router.use(middleware.auth)

router.post('/', middleware.request(requests.UserCreationRequest), createUser)
router.get('/:id', middleware.permission(hasOwnership), getUser)


router.use(middleware.response)
router.use(middleware.errors)

module.exports.router = router

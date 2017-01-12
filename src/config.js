const logger = require('./logger')

const DEV = 'development'
const PROD = 'production'

const environment = process.env.NODE_ENV
const isDevelopment = environment === DEV 
const isProduction = environment === PROD

if (!isDevelopment && !isProduction) {
  logger.error('No node environment was provided! Please set the NODE_ENV letiable!')
  process.exit(1)
}

let config = {
  database: {
    local: {},
    prod: {}
  }
}

config.isDevelopment = isDevelopment
config.isProduction = isProduction
config.port = process.env.PORT || 8080
config.secret = process.env.SECRET

config.database.local = {
  host: process.env.LOCAL_DB_HOST,
  port: process.env.LOCAL_DB_PORT,
  user: process.env.LOCAL_DB_USER,
  pass: process.env.LOCAL_DB_PASS,
  name: process.env.LOCAL_DB_NAME
}

config.database.prod = {
  host: process.env.PROD_DB_HOST,
  port: process.env.PROD_DB_PORT,
  user: process.env.PROD_DB_USER,
  pass: process.env.PROD_DB_PASS,
  name: process.env.PROD_DB_NAME
}

logger.info('🏠 Configured %s environment', environment)

module.exports = config

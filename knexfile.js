var config = require('./dist/config');

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host : config.database.local.host,
      user : config.database.local.user,
      password : config.database.local.pass,
      database : config.database.local.name,
      charset : 'utf8'
    },
    migrations: {
      directory: __dirname + 'database/migrations'
    },
    pool: {
      min: 0,
      max: 7500,
      idleTimeout: 5000
    }
  },
  production: {
    client: 'mysql',
    connection: {
      host : config.database.prod.host,
      user : config.database.prod.user,
      password : config.database.prod.pass,
      database : config.database.prod.name
    },
    migrations: {
      directory: __dirname + 'database/migrations'
    },
    pool: {
      min: 0,
      max: 7500,
      idleTimeout: 5000
    }
  }
};
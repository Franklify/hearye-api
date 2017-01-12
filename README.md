HearYe Backend API

An API built in Express/NodeJS using Bookshelf as an Object Relational Mapper (ORM), MySQL as a relational database management system (RDBMS), and a Redis store as a caching layer for some extra speed 😎

## Getting started

### Environment variables
  Create a `./bin/env.sh` file and export the following environment variables

|  Variable       | Description                                 |
| -------------   | ------------------------------------------- |
| `NODE_ENV`      | Either `production` or `development`        |
| `PORT`          | A specified port to host the API on         |
| `SECRET`        | Shh..                                       |
| `LOCAL_DB_HOST` | Where your local MySQL instance is located  |
| `LOCAL_DB_PORT` | The port of local database instance         |
| `LOCAL_DB_USER` | Username for your local database instance   |
| `LOCAL_DB_PASS` | Corresponding password to log into local db |
| `LOCAL_DB_NAME` | Local MySQL database name                   |

### Installation
  `npm install`

### Running
  `npm start` to transpile es2015 code in `src`, output to `dist`, and run the server
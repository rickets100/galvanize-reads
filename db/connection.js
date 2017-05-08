const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile.js')[env]
const connection = require('knex')(config)

module.exports = connection

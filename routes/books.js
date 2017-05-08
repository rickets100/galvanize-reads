var express = require('express')
var router = express.Router()
var knex = require('../db/connection')

// ===== GET ALL BOOKS =====
router.get('/', function(req, res, next) {
  res.send('respond with a resource')
});

module.exports = router

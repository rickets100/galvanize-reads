var express = require('express')
var router = express.Router()
var knex = require('../db/connection')

// ===== HOME PAGE =====
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Galvanize Reads' })
});

module.exports = router

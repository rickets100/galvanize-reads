const express = require('express')
const router = express.Router()
const knex = require('../db/connection')

// ===== HOME PAGE =====
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Galvanize Reads' })
})

module.exports = router

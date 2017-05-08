var express = require('express')
var router = express.Router()
var knex = require('../db/connection')

// ===== GET ALL AUTHORS =====
  router.get('/', function(req, res, next) {
    console.log('Get All Authors')
    console.log('req.body is ', req.body)
  knex('authors').select('*')
  .then(authors => {
    res.render('authors', { authors })
  })
  .catch((err) => {
    next(err)
  })
})

// ===== GET ONE AUTHOR =====
  router.get('/:id', function(req, res, next) {
    console.log('Get One Author')
    console.log('req.params.id is ', req.params.id)

  let id = req.params.id

  knex('authors')
  .select('*')
  .where('id', id)
  .first()
  .then(author => {
    res.render('show_author', { author })
  })
  .catch((err) => {
    next(err)
  })
})
module.exports = router

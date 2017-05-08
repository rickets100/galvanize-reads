const express = require('express')
const router = express.Router()
const knex = require('../db/connection')

// ===== GET ALL BOOKS =====
  router.get('/', function(req, res, next) {
    console.log('Get All Books')
    console.log('req.body is ', req.body)
  knex('books').select('*')
  .then(books => {
    res.render('books', { books })
  })
  .catch((err) => {
    next(err)
  })
})

// ===== GET ONE BOOK =====
  router.get('/:id', function(req, res, next) {
    console.log('Get One Book')
    console.log('req.params.id is ', req.params.id)

  let id = req.params.id

  knex('books')
  .select('*')
  .where('id', id)
  .first()
  .then(book => {
    res.render('show_book', { book })
  })
  .catch((err) => {
    next(err)
  })
})

module.exports = router

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

// ======== FORM ========
router.get('/new', (req, res, next) => {
  res.render('new')
})

// ===== GET ONE BOOK =====
  router.get('/:id', function(req, res, next) {
    console.log('req.params.id is ', req.params.id)

  let id = req.params.id

  knex('books')
  .select('*')
  .where('id', id)
  .first()
  .then(book => {
    console.log('get one book, book is ', book)
    res.render('show_book', { book })
  })
  .catch((err) => {
    next(err)
  })
})

// ======== ADD ONE BOOK ========
router.post('/', function (req, res, next) {
  console.log('ADD ONE BOOK ', book)

  let error = {status: 400, message: 'Not a valid entry.'}
  let itemToAdd = req.body

  if (!(itemToAdd.name)) {
    next(error)
  } else {
    knex('books')
    .insert(itemToAdd, '*')
    .then((newItem) => {
      let id = newItem[0]
      res.redirect('/')
    })
    .catch((err) => {
      console.error(err)
      res.send(err)
    })
  }
})
// ======== DELETE ONE BOOK ========
router.delete('/:id', (req, res, next) => {
  let id = req.params.id

  knex('books')
  .del()
  .where('id', id)
  .then((result) => {
    res.redirect('/books')
  })
  .catch((err) => {
    res.send(err)
  })
})

// let truckSched = knex('books_authors')
// .innerJoin('books', 'books.id', 'books_authors.book_id')
// .where('books_authors.book_id', id)
// .select('books.title', 'books_authors.author_id')
module.exports = router

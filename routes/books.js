const express = require('express')
const router = express.Router()
const knex = require('../db/connection')

// ===== GET ALL BOOKS =====
  router.get('/', function(req, res, next) {
    console.log('***********Get All Books')
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
  console.log('***********ADD A BOOK Form')
  res.render('newbook')
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

// ===== EDIT A BOOK =====
router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id

  knex('books')
  .select('*')
  .where({ id })
  .first()
  .then(book => {
    res.render('newbook', { book })
  })
})

// ======== ADD ONE BOOK ========
router.post('/', function (req, res, next) {

  let error = {status: 400, message: 'Not a valid entry.'}
  let itemToAdd = req.body
  console.log('*********ADD ONE BOOK ', itemToAdd)

  if (!(itemToAdd.title)) {
    next(error)
  } else {
    console.log('made it to the else statement');
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

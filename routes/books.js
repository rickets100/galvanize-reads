const express = require('express')
const router = express.Router()
const knex = require('../db/connection')

// ===== GET ALL BOOKS =====
router.get('/', function(req, res, next) {
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
  res.render('newbook')
})

// ===== GET ONE BOOK =====
router.get('/:id', function(req, res, next) {
  let bookId = req.params.id

  knex('books')
  .select('*')
  .where('id', bookId)
  .first()
  .then(bookInfo => {
    knex('books_authors')
    .innerJoin('authors', 'authors.id', 'books_authors.author_id')
    .select('*')
    .where('books_authors.book_id', bookInfo.id)
    .then(author => {
      let authorFirst = author[0].first_name
      let authorLast = author[0].last_name
      let authorFull = `${authorFirst} ${authorLast}`

      let book = {
        bookId: bookInfo.id,
        title: bookInfo.title,
        genre: bookInfo.genre,
        description: bookInfo.description,
        cover_url: bookInfo.cover_url,
        authorId: author[0].id,
        author_first: authorFirst,
        author_last: authorLast,
        author_full: authorFull
      }
      res.render('show_book', { book })
    })
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

  if (!(itemToAdd.title)) {
    next(error)
  } else {
    knex('books')
    .insert(itemToAdd, '*')
    .then((newItem) => {
      let id = newItem[0]
      res.redirect('/books')
    })
    .catch((err) => {
      console.error(err)
      res.send(err)
    })
  }
})

// ======== UPDATE ONE BOOK ========
router.put ('/:id', function(req, res, next) {
  let id = req.params.id
  console.log('update one book, req.body is', req.body)
  console.log('and req.params.id is ', req.params.id)
  let book = req.body
  knex('books')
  .where('id', id)
  .update({
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.cover_url
  })
  .then((result) => {
    console.log('made it to the then', result)
    res.redirect('/')
  })
  .catch((err) => {
    res.send(err)
  })
})


knex('books')
.where('published_date', '<', 2000)
.update({
  status: 'archived',
  thisKeyIsSkipped: undefined
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

module.exports = router

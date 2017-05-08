const express = require('express')
const router = express.Router()
const knex = require('../db/connection')

// ===== GET ALL AUTHORS =====
  router.get('/', function(req, res, next) {
  knex('authors').select('*')
  .then(authors => {
    res.render('authors', { authors })
  })
  .catch((err) => {
    next(err)
  })
})

// ======== FORM ========
router.get('/new', (req, res, next) => {
  console.log('*********** get /new')
  res.render('newauthor')
})

// ===== GET ONE AUTHOR =====
  router.get('/:id', function(req, res, next) {

  let authorId = req.params.id

  knex('authors')
  .select('*')
  .where('id', authorId)
  .first()
  .then(authorInfo => {
    knex('books_authors')
    .innerJoin('books', 'books.id', 'books_authors.book_id')
    .select('*')
    .where('books_authors.author_id', authorInfo.id)
    .then(book => {
      let bookTitle = book[0].title
      let bookGenre = book[0].genre
      let bookDescription = book[0].description

      let author = {
        authorId: authorInfo.id,
        first_name: authorInfo.first_name,
        last_name: authorInfo.last_name,
        biography: authorInfo.biography,
        portrait_url: authorInfo.portrait_url,
        bookId: book[0].id,
        book_title: bookTitle,
        book_genre: bookGenre,
        book_description: bookDescription
      }
      res.render('show_author', { author })
    })
  })
  .catch((err) => {
    next(err)
  })
})

// ===== EDIT AN AUTHOR =====
router.get('/:id/edit', (req, res, next) => {
  console.log('edit an author ++++++++++');
  let id = req.params.id

  knex('authors')
  .select('*')
  .where({ id })
  .first()
  .then(author => {
    res.render('newauthor', { author })
  })
})

// ======== ADD ONE AUTHOR ========
router.post('/', function (req, res, next) {
  let error = {status: 400, message: 'Not a valid entry.'}
  let itemToAdd = req.body

  if (!(itemToAdd.last_name)) {
    next(error)
  } else {
    knex('authors')
    .insert(itemToAdd, '*')
    .then((newItem) => {
      let id = newItem[0]
      res.redirect('/authors')
    })
    .catch((err) => {
      console.error(err)
      res.send(err)
    })
  }
})

// ======== UPDATE ONE AUTHOR ========
router.put ('/:id', function(req, res, next) {
  let id = req.params.id
  let author = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    biography: req.body.biography,
    portrait_url: req.body.portrait_url
  }
  knex('authors')
  .update('author', '*')
  .where('id', id)
  .then((result) => {
  })
  .catch((err) => {
    res.send(err)
  })
})

// ======== DELETE ONE AUTHOR ========
router.delete('/:id', (req, res, next) => {
  let id = req.params.id

  knex('authors')
  .del()
  .where('id', id)
  .then((result) => {
    res.redirect('/authors')
  })
  .catch((err) => {
    res.send(err)
  })
})


module.exports = router

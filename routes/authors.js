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

// ===== EDIT AN AUTHOR =====
router.get('/:id/edit', (req, res, next) => {

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

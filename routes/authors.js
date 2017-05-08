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

// ======== ADD ONE AUTHOR ========
router.post('/', function (req, res, next) {
  let error = {status: 400, message: 'Not a valid entry.'}
  let itemToAdd = req.body

  if (!(itemToAdd.name)) {
    next(error)
  } else {
    knex('authors')
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

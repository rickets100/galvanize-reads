'use strict'

exports.seed = function(knex) {
  return knex('books_authors').del()
  .then(function () {
    return knex('books_authors').insert([
      {
        id: 1,
        book_id: '',
        author_id: '',
      },
      {
        id: 2,
        book_id: '',
        author_id: '',
      },
      {
        id: 3,
        book_id: '',
        author_id: '',
      },
      {
        id: 4,
        book_id: '',
        author_id: '',
      },
      {
        id: 5,
        book_id: '',
        author_id: '',
      },
      {
        id: 6,
        book_id: '',
        author_id: '',
      }
      ])
    })
  .then (() => {
    return knex.raw(
      "SELECT setval('books_authors_id_seq', (SELECT MAX(id) FROM books_authors))"
    )
  })
}

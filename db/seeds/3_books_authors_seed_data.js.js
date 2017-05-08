'use strict'

exports.seed = function(knex) {
  return knex('books_authors').del()
  .then(function () {
    return knex('books_authors').insert([
      {
        id: 1,
        book_id: '1',
        author_id: '1',
      },
      {
        id: 2,
        book_id: '1',
        author_id: '2',
      },
      {
        id: 3,
        book_id: '1',
        author_id: '3',
      },
      {
        id: 4,
        book_id: '2',
        author_id: '4',
      },
      {
        id: 5,
        book_id: '3',
        author_id: '5',
      },
      {
        id: 6,
        book_id: '4',
        author_id: '6',
      },
      {
        id: 7,
        book_id: '5',
        author_id: '6',
      },
      {
        id: 8,
        book_id: '6',
        author_id: '6',
      }

      ])
    })
  .then (() => {
    return knex.raw(
      "SELECT setval('books_authors_id_seq', (SELECT MAX(id) FROM books_authors))"
    )
  })
}

'use strict'

  exports.up = function(knex) {
  return knex.schema.createTable('books', (table) => {
    table.increments()
    table.string('title', 255).notNullable()
    table.string('genre', 255).notNullable()
    table.text('description').notNullable()
    table.string('cover_url', 255).notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('books')
}

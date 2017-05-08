'use strict'

  exports.up = function(knex) {
  return knex.schema.createTable('authors', (table) => {
    table.increments()
    table.string('first_name', 255).notNullable()
    table.string('last_name', 255).notNullable()
    table.text('biography').notNullable()
    table.string('portrait_url', 255).notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('authors')
}


exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('tokens', function (table) {
      table.bigIncrements('id').primary().unsigned();
      table.integer('user_id').unsigned().notNullable();
      table.string('value').notNullable();
      table.timestamp('created').defaultTo(knex.fn.now())
      table.timestamp('updated').defaultTo(knex.fn.now())
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('tokens')
  ])
};
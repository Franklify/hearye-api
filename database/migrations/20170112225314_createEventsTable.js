
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('events', function (table) {
      table.bigIncrements('id').primary().unsigned();
      table.integer('location_id').unsigned().notNullable();
      table.string('name').notNullable();
      table.string('description');
      table.string('')
      table.timestamp('created').defaultTo(knex.fn.now());
      table.timestamp('updated').defaultTo(knex.fn.now());
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('events')
  ])
};
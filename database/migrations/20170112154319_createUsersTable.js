
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.bigIncrements('id').primary().unsigned();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.string('first_name');
      table.string('last_name');
      table.string('phone_number');
      table.timestamp('created').defaultTo(knex.fn.now());
      table.timestamp('updated').defaultTo(knex.fn.now());
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('users')
  ])
};


exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.text('userName', 128).notNullable().unique().index();
    table.text('password', 255).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};

exports.up = function (knex) {
  return knex.schema.createTable('characters', table => {
    table.increments();
    table.string('name').notNullable();
    table.string('class').notNullable();
    table.integer('weapon').notNullable();
    table.integer('level').notNullable();
    table.integer('health').notNullable();
    table.integer('attack').notNullable();
    table.integer('defense').notNullable();
    table.integer('magic').notNullable();
    table.integer('magicResist').notNullable();
    table.integer('speed').notNullable();
  })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('characters')
};

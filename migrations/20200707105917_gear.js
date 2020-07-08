exports.up = function (knex) {
  return knex.schema
    .createTable('armor', table => {
      table.increments();
      table.string('name').notNullable();
      table.string('type').notNullable();
      table.integer('health').notNullable();
      table.integer('attack').notNullable();
      table.integer('defense').notNullable();
      table.integer('magic').notNullable();
      table.integer('magicResist').notNullable();
      table.integer('speed').notNullable();
    })
    .createTable('cape', table => {
      table.increments();
      table.string('name').notNullable();
      table.string('type').notNullable();
      table.integer('health').notNullable();
      table.integer('attack').notNullable();
      table.integer('defense').notNullable();
      table.integer('magic').notNullable();
      table.integer('magicResist').notNullable();
      table.integer('speed').notNullable();
    })
    .createTable('boots', table => {
      table.increments();
      table.string('name').notNullable();
      table.string('type').notNullable();
      table.integer('health').notNullable();
      table.integer('attack').notNullable();
      table.integer('defense').notNullable();
      table.integer('magic').notNullable();
      table.integer('magicResist').notNullable();
      table.integer('speed').notNullable();
    })
    .createTable('orb', table => {
      table.increments();
      table.string('name').notNullable();
      table.string('type').notNullable();
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
    .dropTableIfExists('armor')
    .dropTableIfExists('cape')
    .dropTableIfExists('orb')
    .dropTableIfExists('boots')
};

/////////////////////////////////////////////////
// knex migrations for SQL database            //
// SQLite is used in this project              //
// More information can be found here:         //
// http://knexjs.org/                          //
// https://www.youtube.com/watch?v=JWMf7AUzMkA //
/////////////////////////////////////////////////


exports.up = function (knex) {
  return knex.schema.createTable('weapons', table => {
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
    .createTable('headGear', table => {
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
  return knex.schema.dropTableIfExists('weapons')
    .dropTableIfExists('headGear')

};

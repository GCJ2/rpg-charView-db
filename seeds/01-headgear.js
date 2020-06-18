// Seed file to populate database for testing purposes

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('headGear').del()
    .then(function () {
      // Inserts seed entries
      return knex('headGear').insert([
        {name: 'Nothing', id: 0, type: 'headGear', health: 0, attack: 0, defense: 0, magic: 0, magicResist: 0, speed: 0},
        {name: 'Hat', id: 1, type: 'headGear', health: 10, attack: 0, defense: 2, magic: 0, magicResist: 3, speed: 0},
        {name: 'Helmet', id: 2, type: 'headGear', health: 30, attack: 0, defense: 4, magic: 1, magicResist: 4, speed: 0}
      ]);
    });
};

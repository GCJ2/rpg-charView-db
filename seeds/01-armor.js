
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('armor').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('armor').insert([
        {name: 'Nothing', id: 0, type: 'armor', health: 0, attack: 0, defense: 0, magic: 0, magicResist: 0, speed: 0},
        {name: 'Leather', id: 1, type: 'armor', health: 30, attack: 0, defense: 15, magic: 1, magicResist: 14, speed: 0},
        {name: 'Plate', id: 2, type: 'armor', health: 20, attack: 0, defense: 20, magic: 0, magicResist: 3, speed: 0}
      ]);
    });
};

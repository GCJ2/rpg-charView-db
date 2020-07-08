
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('boots').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('boots').insert([
        {name: 'Nothing', id: 0, type: 'boot', health: 0, attack: 0, defense: 0, magic: 0, magicResist: 0, speed: 0},
        {name: 'Leather', id: 1, type: 'boot', health: 20, attack: 0, defense: 6, magic: 0, magicResist: 8, speed: 6},
        {name: 'Plate', id: 2, type: 'boot', health: 30, attack: 0, defense: 10, magic: 1, magicResist: 4, speed: 2}
      ]);
    });
};

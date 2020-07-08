
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cape').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cape').insert([
        {name: 'Nothing', id: 0, type: 'cape', health: 0, attack: 0, defense: 0, magic: 0, magicResist: 0, speed: 0},
        {name: 'Wool', id: 1, type: 'cape', health: 20, attack: 0, defense: 6, magic: 20, magicResist: 8, speed: 12},
        {name: 'Denim', id: 2, type: 'cape', health: 10, attack: 0, defense: 40, magic: 9, magicResist: 14, speed: 8}
      ]);
    });
};


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('weapons').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('weapons').insert([
        {name: 'Nothing', id: 0, type: 'weapon', health: 0, attack: 0, defense: 0, magic: 0, magicResist: 0, speed: 0},
        {name: 'Hammer', id: 1, type: 'weapon', health: 140, attack: 15, defense: 2, magic: 1, magicResist: 2, speed: 1},
        {name: 'Sword', id: 2, type: 'weapon', health: 110, attack: 12, defense: 3, magic: 2, magicResist: 2, speed: 3},
        {name: 'Dagger', id: 3, type: 'weapon', health: 80, attack: 9, defense: 1, magic: 2, magicResist: 2, speed: 6}
      ]);
    });
};

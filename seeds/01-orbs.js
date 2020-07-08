
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('orb').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('orb').insert([
        {name: 'Nothing', id: 0, type: 'orb', health: 0, attack: 0, defense: 0, magic: 0, magicResist: 0, speed: 0},
        {name: 'Power', id: 1, type: 'orb', health: 0, attack: 20, defense: 0, magic: 20, magicResist: 0, speed: 8},
        {name: 'Vitality', id: 2, type: 'orb', health: 0, attack: 0, defense: 40, magic: 0, magicResist: 20, speed: 4}
      ]);
    });
};

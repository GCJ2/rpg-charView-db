/////////////////////////////////////////////////
// Knew queries written here                   //
// More information can be found here:         //
// https://www.youtube.com/watch?v=JWMf7AUzMkA //
// https://www.youtube.com/watch?v=lgBrR9Mvork //
/////////////////////////////////////////////////

// Bring in knex
const knex = require('knex');

// Import config file
const config = require('../knexfile');

// Connect database
const db = knex(config.development);


// As new methods are added, export them like so to be used in routes
module.exports = {
  add,
  find,
  findById,
  remove,
  update
};

// Insert methods need to be async to ensure that data is retrieved from DB before id assignment happens
async function add(headgear) {
  const [id] = await db('headgear').insert(headgear);
  return id;
}

function find() {
  return db('headgear')
}

function findById(id) {
  return db('headgear')
    .where({ id })
    .first();
}

function remove(id) {
  return db('headgear')
    .where({id})
    .del();
}

function update(id, changes) {
  return (db('headgear')
      .where({id})
      .update(changes)
      .then(() => {
        return findById(id)
      })
  )
}


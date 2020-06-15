// Knew queries written here
const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

module.exports = {
  add,
  find,
  findById,
  remove,
  update
};

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


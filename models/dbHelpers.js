// Knew queries written here
const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

module.exports = {
  add,
  find,
  findById,
  remove
};

async function add(weapon) {
  const [id] = await db('weapons').insert(weapon);
  return id;
}

function find() {
  return db('weapons')
}

function findById(id) {
  return db('weapons')
    .where({ id })
    .first();
}

function remove(id) {
  return db('weapons')
    .where({id})
    .del();
}
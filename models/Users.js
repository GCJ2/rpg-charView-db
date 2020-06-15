// Knew queries written here
const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

module.exports = {
  add,
  find,
  findByUserName
};

async function add(user) {
  return await db('users').insert(user, ['id', 'username'])
}

function find() {
  return db('users')
}

function findByUserName(username) {
  return db('users')
    .where({ username })
    .first();
}


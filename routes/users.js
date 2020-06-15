const express = require('express');
const Users = require('../models/Users');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/register', (req, res) => {
  const credentials = req.body;
  const {username, password} = credentials;
  if (!(username && password)){
    return res.status(400).json({message: 'Username and Password are required'})
  }
  credentials.password = bcrypt.hashSync(credentials.password, 12);

  Users.add(credentials)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      if (error.errno === 19) {
        res.status(400).json({message: 'Username already taken.'})
      } else {
        res.status(500).json(error)
      }
    })
});

router.post('/login', (req, res) => {
  const {username, password} = req.body;
  if (!(username && password)){
    return res.status(400).json({message: 'Username and Password are required'})
  }
  Users.findByUserName(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({message: `Welcome back ${username}`})
      } else {
        res.status(401).json({message: 'Invalid credentials '})
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
});

router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(500).json({message: 'Unable to get users'})
    })
});

router.get('/:username', (req, res) => {
  const {username} = req.params;
  Users.findByUserName(username)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      res.status(500).json(error)
    })
});

module.exports = router;
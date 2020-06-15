const express = require('express');
const Users = require('../models/Users');
const router = express.Router();

router.post('/register', (req, res) => {
  const credentials = req.body;
  const {username, password} = credentials;
  if (!(username && password)){
    return res.status(400).json({message: 'Username and Password are required'})
  }
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

router.get('/', (req, res) => {
  Users.find()
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      res.status(500).json({message: 'Unable to get users'})
    })
});

module.exports = router;
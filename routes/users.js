const express = require('express');
const Users = require('../models/Users');
const router = express.Router();

router.get('/', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
});

router.get('/:username', (req, res) => {
  const {username} = req.params;
  Users.findByUserName(username)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((error) => {
      res.status(500).json(error)
    })
});

module.exports = router;
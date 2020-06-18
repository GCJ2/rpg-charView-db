const express = require('express');
const Users = require('../models/Users');
const router = express.Router();
const bcrypt = require('bcrypt');
const generateToken = require('./generateToken');

router.post('/register', (req, res) => {
  const credentials = req.body;
  const {username, password} = credentials;
  if (!(username && password)){
    return res.status(400).json({message: 'Username and Password are required'})
  }
  credentials.password = bcrypt.hashSync(credentials.password, 12);

  Users.add(credentials)
    .then((user) => {
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
        // req.session.user = {
        //   id: user.id,
        //   username: username
        // };
        const token = generateToken(user);
        res.status(200).json({message: `Welcome back ${username}`, token})
      } else {
        res.status(401).json({message: 'Invalid credentials '})
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res.status(500).json({message: 'Error ending session.'})
      } else {
        res.status(200).json({message: 'Logged out'})
      }
    })
  } else {
    res.status(200).json({message: 'Not logged in.'})
  }
});

module.exports = router;
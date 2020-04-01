const express = require('express');
const Weapons = require('./models/dbHelpers');

const server = express();

server.use(express.json());

const PORT = 5000;

server.get('/', (req, res) => {
  res.json({message: 'Working'})
});

// server.get('/api/weapons', (req, res) => {
//   res.json({message: 'Working'})
// });

server.post('/api/weapons', (req, res) => {
  Weapons.add(req.body)
    .then(weapon => {
      res.status(200).json(weapon)
    })
    .catch(error => {
      res.status(500).json({message: "Cannot add weapon"})
    })
});

server.get('/api/weapons', (req, res) => {
  Weapons.find()
    .then(weapons => {
      res.status(200).json(weapons)
    })
    .catch(error => {
      res.status(500).json({message: 'Unable to get weapons'})
    })
});

server.get('/api/weapons/:id', (req, res) => {
  const {id} = req.params;
  Weapons.findById(id)
    .then(weapon => {
      if (weapon) {
        res.status(200).json(weapon)
      } else {
        res.status(404).json({message: "Record not found"})
      }
    })
    .catch(error => {
      res.status(500).json({message: error})
    })
});

server.delete('/api/weapons/:id', (req, res) => {
  const {id} = req.params;
  Weapons.remove(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({message: 'Deleted'})
      } else {
        res.status(404).json({message: 'Record not found'})
      }
    })
    .catch(error => {
      res.status(500).json({message: error})
    })
});

server.listen(PORT, () => {
  console.log(`Now listening on PORT ${PORT}`)
});


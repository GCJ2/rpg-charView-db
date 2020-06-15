const express = require('express');
const morgan = require('morgan'); // logging
const helmet = require('helmet'); // security on return headers
const Weapons = require('./models/Weapons');
const Headgear = require('./models/HeadGear');
const cors = require('cors');

const server = express();
server.use(helmet());
server.use(morgan('dev'));

server.use(express.json());
server.use(cors());
const PORT = 5000;

server.get('/', (req, res) => {
  res.json({message: 'Working'})
});

server.get('/api/weapon', (req, res) => {
  Weapons.find()
    .then(weapons => {
      res.status(200).json(weapons)
    })
    .catch(error => {
      res.status(500).json({message: 'Unable to get weapons'})
    })
});

server.get('/api/weapon/:id', (req, res) => {
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

server.post('/api/weapon', (req, res) => {
  Weapons.add(req.body)
    .then(weapon => {
      res.status(200).json(weapon)
    })
    .catch(error => {
      res.status(500).json({message: "Cannot add weapon"})
    })
});

server.patch('/api/weapon/:id', (req, res) => {
  const {id} = req.params;
  const changes = req.body;
  Weapons.update(id, changes)
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

server.delete('/api/weapon/:id', (req, res) => {
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

server.get('/api/headgear', (req, res) => {
  Headgear.find()
    .then(weapons => {
      res.status(200).json(weapons)
    })
    .catch(error => {
      res.status(500).json({message: 'Unable to get headgear'})
    })
});

server.get('/api/headgear/:id', (req, res) => {
  const {id} = req.params;
  Headgear.findById(id)
    .then(headgear => {
      if (headgear) {
        res.status(200).json(headgear)
      } else {
        res.status(404).json({message: "Record not found"})
      }
    })
    .catch(error => {
      res.status(500).json({message: error})
    })
});

server.post('/api/headgear', (req, res) => {
  Headgear.add(req.body)
    .then(headgear => {
      res.status(200).json(headgear)
    })
    .catch(error => {
      res.status(500).json({message: "Cannot add weapon"})
    })
});

server.patch('/api/headgear/:id', (req, res) => {
  const {id} = req.params;
  const changes = req.body;
  Headgear.update(id, changes)
    .then(headgear => {
      if (headgear) {
        res.status(200).json(headgear)
      } else {
        res.status(404).json({message: "Record not found"})
      }
    })
    .catch(error => {
      res.status(500).json({message: error})
    })
});

server.delete('/api/headgear/:id', (req, res) => {
  const {id} = req.params;
  Headgear.remove(id)
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

server.use((req, res) => {
  res.status(404).send('Invalid endpoint.')
});

server.listen(PORT, () => {
  console.log(`Now listening on PORT ${PORT}`)
});


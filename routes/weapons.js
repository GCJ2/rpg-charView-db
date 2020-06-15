const express = require('express');
const Weapons = require('../models/Weapons');
const router = express.Router();

router.get('/', (req, res) => {
  Weapons.find()
    .then(weapons => {
      res.status(200).json(weapons)
    })
    .catch(error => {
      res.status(500).json({message: 'Unable to get weapons'})
    })
});

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
  Weapons.add(req.body)
    .then(weapon => {
      res.status(200).json(weapon)
    })
    .catch(error => {
      res.status(500).json({message: "Cannot add weapon"})
    })
});

router.patch('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;
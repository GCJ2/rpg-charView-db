const express = require('express');
const Headgear = require('../models/HeadGear');
const router = express.Router();


router.get('/api/headgear', (req, res) => {
  Headgear.find()
    .then(weapons => {
      res.status(200).json(weapons)
    })
    .catch(error => {
      res.status(500).json({message: 'Unable to get headgear'})
    })
});

router.get('/api/headgear/:id', (req, res) => {
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

router.post('/api/headgear', (req, res) => {
  Headgear.add(req.body)
    .then(headgear => {
      res.status(200).json(headgear)
    })
    .catch(error => {
      res.status(500).json({message: "Cannot add weapon"})
    })
});

router.patch('/api/headgear/:id', (req, res) => {
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

router.delete('/api/headgear/:id', (req, res) => {
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

module.exports = router;
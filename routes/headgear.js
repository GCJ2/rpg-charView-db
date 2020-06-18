/////////////////////////////////////////////////////
// Headgear will be annotated, weapons and users   //
// will not be as they perform identical functions //
// on different tables                             //
/////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////
// Due to server now being modular,                             //
// server.use('/api/headgear/.....')                            //
// Now becomes server.use('/api/headgear') in server.js         //
// With the rest of the endpoint populated by the modular files //
//////////////////////////////////////////////////////////////////

// Import express
const express = require('express');

// Bring in helpers
const Headgear = require('../models/HeadGear');

// Now that the server is modular, we are using router instead of server
const router = express.Router();


router.get('/', (req, res) => { // Default path
  Headgear.find() // Use DB method find()
    .then(weapons => {  // Take the object
      res.status(200).json(weapons) // And return it in the response
    })
    .catch(error => { // If not found
      res.status(500).json({message: 'Unable to get headgear'}) // Throw error/return message
    })
});

router.get('/:id', (req, res) => {
  const {id} = req.params;  // Destructure id off of req.params
  Headgear.findById(id) // Find object with id using helper method
    .then(headgear => {
      if (headgear) { // If found...
        res.status(200).json(headgear)  // Return it
      } else {  // Otherwise...
        res.status(404).json({message: "Record not found"}) // Throw error
      }
    })
    .catch(error => { // In case of a different error
      res.status(500).json({message: error})  // Throw that
    })
});

router.post('/', (req, res) => {
  Headgear.add(req.body)  // Use .add helper
    .then(headgear => { // Take the object
      res.status(200).json(headgear)  // Return it upon successful addition
    })
    .catch(error => { // Otherwise...
      res.status(500).json({message: "Cannot add weapon"})  // Throw an error
    })
});

router.patch('/:id', (req, res) => {  // Update a record
  const {id} = req.params;  // Deconstruct ID
  const changes = req.body; // Take the body of the request and set it to changes
  Headgear.update(id, changes)  // Into the update helper, pass in the id of the record to change and the changes
    .then(headgear => {
      if (headgear) { // If the record is found and changed...
        res.status(200).json(headgear)  // Return success
      } else {  // If record is not found...
        res.status(404).json({message: "Record not found"}) // Throw error
      }
    })
    .catch(error => { // If different error...
      res.status(500).json({message: error})  // Throw it
    })
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;  // Pull record ID off req.params
  Headgear.remove(id) // Run remove helper function passing in ID of record to be deleted
    .then(count => {  // the del() helper returns the number of affected rows from the database
      if (count > 0) {  // If count is > 0, at least 1 row was affected by the delete
        res.status(200).json({message: 'Deleted'})  // Return success
      } else {  // If record is not found...
        res.status(404).json({message: 'Record not found'}) // Throw error
      }
    })
    .catch(error => { // If other error...
      res.status(500).json({message: error})  // Throw it
    })
});

module.exports = router;
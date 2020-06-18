const express = require('express');

// Import DB helpers/model
const Users = require('../models/Users');

// Now that the server is modular, we are using router instead of server
const router = express.Router();

//////////////////////////////////////////////////////////////
// bcrypt is a hashing package for storing hashed passwords //
// Additional information can be found here                 //
// https://www.npmjs.com/package/bcrypt                     //
//////////////////////////////////////////////////////////////

const bcrypt = require('bcrypt');

// Bring in our function to generate a JWT
const generateToken = require('./generateToken');

router.post('/register', (req, res) => {
  const credentials = req.body; // pull credentials off of the request body
  const {username, password} = credentials; // destructure (if you want)
  if (!(username && password)) {  // if both username and password are not present
    return res.status(400).json({message: 'Username and Password are required'})  // throw an error
  }
  credentials.password = bcrypt.hashSync(credentials.password, 12); // hashes our password 12 times and updates creds.password

  Users.add(credentials)  // use our DB helper/model method to add a user based on passed in credentials
    .then((user) => {
      res.status(200).json(user)  // return the user in the response
    })
    .catch(error => {
      if (error.errno === 19) { // Error #19 is specific to a username already being taken
        res.status(400).json({message: 'Username already taken.'})  // Throw error
      } else {  // If username isn't taken but there is still an error
        res.status(500).json(error) // Throw an error
      }
    })
});

router.post('/login', (req, res) => {
  const {username, password} = req.body;
  if (!(username && password)) {
    return res.status(400).json({message: 'Username and Password are required'})
  }
  Users.findByUserName(username)  // Use our DB helper to find the user by their username
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {  // Use bcrypt to compare the user input to their stored hashed password

        //////////////////////////
        // This is for cookies  //
        //////////////////////////

        // req.session.user = { // add a user to the req.session
        //   id: user.id, // with the id
        //   username: username // and user name
        // };

        //////////////////////
        // This is for JWT //
        /////////////////////

        const token = generateToken(user);  // Create a token with our generateToken function taking the user as the argument
        res.status(200).json({message: `Welcome back ${username}`, token})  // Return a message (optional) and the token (mandatory)
      } else {  // If login creds are not valid...
        res.status(401).json({message: 'Invalid credentials '}) // Throw an error
      }
    })
    .catch(error => { // If an error happens during the request outside of invalid credentials...
      res.status(500).json(error) // Throw said error
    })
});

router.get('/logout', (req, res) => {

  //////////////////////////
  // This is for cookies  //
  //////////////////////////

  if (req.session) {  // If there is a current session
    req.session.destroy(error => {  // Destroy it
      if (error) {  // If there is an error...
        res.status(500).json({message: 'Error ending session.'})  // Throw it
      } else {  // If session is destroyed successfully...
        res.status(200).json({message: 'Logged out'}) // Return a logged out message (optional, but suggested)
      }
    })
  } else {  // If there isn't a session to destroy...
    res.status(200).json({message: 'Not logged in.'}) // Throw response
  }

  ///////////////
  // For JWT  //
  //////////////

  // The front end will delete the token from local storage and push the user back to wherever the app requires.
  // A direct /logout endpoint is not mandatory, however, some technologies
  // can/will use it to invalidate the token on the back end in case it is
  // not deleted on the front end.

});

module.exports = router;
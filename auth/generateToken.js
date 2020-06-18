/////////////////////////////////////////////////
// jsonwebtoken let's us create JWTs with ease //
// Additional information can be found here    //
// https://github.com/auth0/node-jsonwebtoken  //
// https://jwt.io/                             //
//////////////////////////////////////////////////

// Import JWT
const jwt = require('jsonwebtoken');

module.exports = user => {
  // need 3 things to create a token: payload, secret, options
  // Configure payload for token return
  const payload = {
    id: user.id,
    username: user.username
    // more non-confidential data can be added
  };

  // Bring in secret for token decoding
  const secret = process.env.JWTSECRET;

  // Configuring options (expiration shown here)
  const options = {
    expiresIn: '1d'
  };

  // Return the signed token with the payload, secret, and options
  return jwt.sign(payload, secret, options)
};
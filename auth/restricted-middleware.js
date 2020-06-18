// module.exports = (req, res, next) => {

  /////////////////////////
  // This is for Cookies //
  /////////////////////////

  // console.log(req.session);
  // if (req.session && req.session.user) { // If the req.session has a user object (only present from login route)
  //   next();  // Move on
  // } else { // If there was no user attached to the session
  //   res.status(401).json({message: 'Unauthorized.'}) // Throw an error
  // }
// };

  /////////////////////
  // This is for JWT //
  /////////////////////
  const jwt = require('jsonwebtoken');

  module.exports = (req, res, next) => {
    const token = req.headers.authorization;  // Grab token from headers
    const secret = process.env.JWTSECRET;   // User secret from .env to decode token

    if (token) {  // If there is a token
      jwt.verify(token, secret, (err, decodedToken) => {  // Verify the token with the secret
        if (err) {  // If token is not valid
          res.status(401).json({message: 'Invalid token'}) // Throw error
        } else {  // If token is valid
          req.decodedToken = decodedToken; // Set a decoded token on the req to token decoded by server
          next(); // Advance to next middleware/route
        }
      })
    } else {  // If no token was found
      res.status(401).json({message: 'No token found'}) // Throw an error
    }
  };


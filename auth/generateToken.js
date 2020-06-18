const jwt = require('jsonwebtoken');

module.exports = user => {
  // need 3 things to create a token: payload, secret, options
  const payload = {
    id: user.id,
    username: user.username
    // more non-confidential data can be added
  };
  const secret = 'secret';

  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, secret, options)
};
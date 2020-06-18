// Allows us to access our .env file for secrets
require('dotenv').config();

// Import server from server.js
const server = require('./api/server');

// Establish port with .env secret
const port = process.env.PORT || 5001;
console.log(port);

// Have server listen on said port
server.listen(port, () => {
  console.log(`Now listening on PORT ${port}`)
});


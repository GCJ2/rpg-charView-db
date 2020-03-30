const express = require('express');

const server = express();

server.use(express.json());

const PORT = 5000;

server.get('/', (req, res) => {
  res.json({message: 'Working'})
});

server.listen(PORT, () => {
  console.log(`Now listening on PORT ${PORT}`)
});


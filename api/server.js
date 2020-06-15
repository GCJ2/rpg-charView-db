const express = require('express');
const weaponsRouter = require('../routes/weapons');
const headgearRouter = require('../routes/headgear');
const morgan = require('morgan'); // logging
const helmet = require('helmet'); // security on return headers
const cors = require('cors'); // cross origin resource sharing
const server = express();
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());
server.use(cors());


server.get('/api', (req, res) => {
  res.json({message: 'Working'})
});

server.use('/api/weapon', weaponsRouter);
server.use('/api/headgear', headgearRouter);

server.use((req, res) => {
  res.status(404).send('Invalid endpoint.')
});




module.exports = server;
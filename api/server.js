const express = require('express');
const weaponsRouter = require('../routes/weapons');
const headgearRouter = require('../routes/headgear');
const userRouter = require('../routes/users');
const helmet = require('helmet'); // security on return headers
const cors = require('cors'); // cross origin resource sharing
const server = express();
const logger = require('../logger');
server.use(helmet());
server.use(express.json());
server.use(cors());

// server.use((req, res, next) => {
//   console.log(
//     `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
//       'origin'
//     )}`
//   );
//   next();
// });


server.get('/api', logger, (req, res) => {
  res.json({message: 'Working'})
});

server.use('/api/weapon', logger, weaponsRouter);
server.use('/api/headgear', logger, headgearRouter);
server.use('/api/user', logger, userRouter);

server.use((req, res) => {
  res.status(404).send('Invalid endpoint.')
});



module.exports = server;
const express = require('express');
const session = require('express-session');
const weaponsRouter = require('../routes/weapons');
const headgearRouter = require('../routes/headgear');
const userRouter = require('../routes/users');
const authRouter = require('../auth/authRoutes');
const helmet = require('helmet'); // security on return headers
const cors = require('cors'); // cross origin resource sharing
const server = express();
const logger = require('../logger');
server.use(helmet());
server.use(express.json());

const sessionConfig = {
  name: 'monster',
  secret: 'this is not secure',
  cookie: {
    maxAge: 1000 * 60 * 60,  // Good for one hour
    secure: false, // false for dev, true for production
    httpOnly: true  // no JS access
  },
  resave: false,
  saveUninitialized: true // Set to false in production because of GDPR laws
};

server.use(session(sessionConfig));
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

server.use('/api/auth', logger, authRouter);
server.use('/api/weapon', logger, weaponsRouter);
server.use('/api/headgear', logger, headgearRouter);
server.use('/api/user', logger, userRouter);

server.use((req, res) => {
  res.status(404).send('Invalid endpoint.')
});



module.exports = server;
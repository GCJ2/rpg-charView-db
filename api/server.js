const express = require('express'); // Bring in express so we can use it to create our server
// const session = require('express-session');  // This is used when using sessions/cookies
const weaponsRouter = require('../routes/weapons'); // The following imports let us break up our server into a modular server
const headgearRouter = require('../routes/headgear');
const userRouter = require('../routes/users');
const authRouter = require('../auth/authRoutes');
const helmet = require('helmet'); // security on return headers
const cors = require('cors'); // cross origin resource sharing
const server = express(); // Create our server
const logger = require('../logger');  // Custom logging middleware (you can use morgan as well)
const restricted = require('../auth/restricted-middleware');  // Custom auth middleware
server.use(helmet()); // Use helmet to secure headers
server.use(express.json()); // Allow our server to parse JSON

/////////////////////////////////////////////
// This is for Cookies                     //
// Additional information can be found here//
// https://github.com/expressjs/session    //
/////////////////////////////////////////////

// const sessionConfig = {  // Create a session object
//   name: 'monster', // Give it a name
//    secret: process.env.SESSIONSECRET  // Create a secure secret
//   cookie: {  // Create the cookie object
//     maxAge: 1000 * 60 * 60,  // Good for one hour
//     secure: false, // false for dev, true for production
//     httpOnly: true  // no JS access
//   },
//   resave: false, // Does not set the session to resave
//   saveUninitialized: true // Set to false in production because of GDPR laws
// };

// server.use(session(sessionConfig));

server.use(cors()); // Tell our server to use CORS (Cross Origin Resource Sharing)
// This will allow other sources to access our server; Can be used server-wide or on particular routes

/////////////////////////////////////////////
// Confirmation route with custom logger   //
// to ensure that API is up and running    //
/////////////////////////////////////////////

server.get('/api', logger, (req, res) => {
  res.json({message: 'Working'})
});

/////////////////////////////////////////////////////
// Modular routes with logger and auth middleware //
////////////////////////////////////////////////////

server.use('/api/auth', logger, authRouter);
// server.use('/api/weapon', logger, restricted, weaponsRouter);
// server.use('/api/headgear', logger, restricted, headgearRouter);
// server.use('/api/user', logger, restricted, userRouter);

//////////////////////////////////////////////
// Routes with no auth for testing purposes //
/////////////////////////////////////////////

server.use('/api/weapon', logger, weaponsRouter);
server.use('/api/headgear', logger,  headgearRouter);
server.use('/api/user', logger, userRouter);

////////////////////////////////////
// Default invalid endpoint route //
////////////////////////////////////

server.use((req, res) => {
  res.status(404).send('Invalid endpoint.')
});

//////////////////////////////////////////////////////
// Don't forget to export your server into index.js //
//////////////////////////////////////////////////////

module.exports = server;
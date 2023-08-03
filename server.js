// server.js
const express = require('express');
const session = require('express-session');
const db = require('./db');
const signupRouter = require('./signup');
const loginRouter = require('./login');

const app = express();
const PORT = 3000;

// Set up express-session (You can use other session options as needed)
app.use(
  session({
    secret: 'mysecret', // Change this to a random secret key for production
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());

// Routes
app.use(signupRouter);
app.use(loginRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

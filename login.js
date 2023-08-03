// login.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./user');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the entered password with the hashed password in the database 
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    /*
    req.session.user = user;
    return res.status(200).json({ message: 'Login successful' });
    */

    const token = jwt.sign({userId:'user._id'},'secret_key');
    return res.status(200).json({token});

  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }

});

module.exports = router;

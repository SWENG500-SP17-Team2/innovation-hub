const express = require('express');
const router = new express.Router();
const passport = require('passport');

router.get('/dashboard', (req, res) => {
  if(!req.body) console.log('Entering api/dashboard has empty request body');
  if(!req.body.email) console.log('Entering api/dashboard has empty email');
  else console.log('Entering api/dashboard with req.body.email '+ req.body.email);
  res.status(200).json({
    message: "You're authorized to see this secret message."
  });
});

router.get('/users', (req, res) => {
  if(!req.body) console.log('Entering api/users has empty request body');
  if(!req.body.email) console.log('Entering api/users has empty email');
  else console.log('Entering api/users with req.body.email '+ req.body.email);
  res.status(200).json({
    message: "You're authorized to see this secret message.",
    name: 'Admin'
  });
});

module.exports = router;

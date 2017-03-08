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
/*
router.post('/users', (req, res) => {
  if(!req.body) console.log('Querying api/users has empty request body');
  if(!req.body.email) console.log('Querying api/users has empty email');
  else console.log('Entering api/users with req.body.email '+ req.body.email);

  return passport.authenticate('local-query', (err, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }


    return res.json({
      success: true,
      message: 'api/users is working ...!',
      user: userData
    });
  })(req, res);

  console.log('EXITING api/users');

});
*/
module.exports = router;

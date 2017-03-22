const express = require('express');
const passport = require('passport');
const router = new express.Router();

router.post('/users', (req, res, next) => {

  //console.log('ENTERING query post');
  //if(!req.body) console.log('Query has empty request body');
  //if(!req.body.email) console.log('Query has empty email');
  //else console.log('Query has email ' + req.body.email);

  return passport.authenticate('local-query', (err, userData) => {
     if (err) {
        return res.status(400).json({
        success: false,
        message: 'Could not process the quering user(s).'
        });
     }

     return res.status(200).json({
       success: true,
       message: 'Message from query.js',
       queryUser: userData
     });
  })(req, res, next);

});

module.exports = router;

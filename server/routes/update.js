const express = require('express');
const passport = require('passport');
const router = new express.Router();

router.post('/updateLockAttr', (req, res, next) => {

  return passport.authenticate('local-update', (err, userData) => {
     if (err) {
        return res.status(400).json({
        success: false,
        message: 'Could not process the updating user(s).'
        });
     }

     return res.status(200).json({
       success: true,
       message: 'Message from updating',
       updateUser: userData
     });
  })(req, res, next);

});

router.post('/deleteAccount', (req, res, next) => {

  return passport.authenticate('local-delete', (err, userData) => {
     if (err) {
        return res.status(400).json({
        success: false,
        message: 'Could not process deleting an account.'
        });
     }

     return res.status(200).json({
       success: true,
       message: 'Message from deleting an account',
       updateUser: userData
     });
  })(req, res, next);

});

module.exports = router;

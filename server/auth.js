const express = require ('express');
const validator = require ('validator');

const router = new express.Router();

// TODO: Need to get token from MongoDB server
var token = Math.floor(Math.random() * 1000);

// Validate the sign up form
function validateSignupForm(payload) {
   const errors = {};
   let isFormValid = true;
   let message = '';

   // TODO: Adding validation logic here ...
   return {
      success: isFormValid,
      message,
      errors
   };
}

// Validate the Login form
function validateLoginForm(payload) {
   const errors = {};
   let isFormValid = true;
   let message = '';

   // TODO: Adding validation logic here ...
   return {
      success: isFormValid,
      message,
      errors
   };
}

router.post('/signup', (req, res) => {
   const validationResult = validateSignupForm(req.body);
   if(!validationResult.success){
      return res.status(400).json({
         success: false,
         message: validationResult.message,
         errors: validationResult.errors
      });
   } else {
      //return res.status(200).end();
      return res.status(200).json({
         success: true,
         message: 'You have successfully signup!  Now you should be able to login.'
      });
   }
});

router.post('/login', (req, res) => {
   const validationResult = validateLoginForm(req.body);
   if(!validationResult.success){
      return res.status(400).json({
         success: false,
         message: validationResult.message,
         errors: validationResult.errors
      });
   } else {
      //return res.status(200).end();
      return res.json({
          success: true,
          message: 'You have successfully logged in!',
          token
      });
   }
});

module.exports = router;

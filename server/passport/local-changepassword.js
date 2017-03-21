const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;

console.log('inside passport');
/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {

  var user = req.user;
  user.password = password;
  console.log('this is current user' + user.name);
  console.log('this is new password' + user.password);
  User.save((err) => {
    if (err) { return done(err); }

    return done(null);
  });
});

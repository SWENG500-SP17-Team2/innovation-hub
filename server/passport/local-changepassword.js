const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../config');
const bcrypt = require('bcrypt');

console.log('inside passport');
/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {

    var userData = {
        email: email.trim(),
        password: password.trim()
    };

    // encriypting password before saving it
    return bcrypt.genSalt((saltError, salt) => {
        if (saltError) {
            return done(saltError);
        }

        return bcrypt.hash(userData.password, salt, (hashError, hash) => {
            if (hashError) {
                return done(hashError);
            }

            // replace a password string with hash value
            userData.password = hash;

            return User.findOneAndUpdate({
                email: userData.email
            }, {
                $set: {
                    password: userData.password
                }
            }, (err, user) => {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    const error = new Error('Incorrect email or password');
                    error.name = 'IncorrectCredentialsError';

                    return done(error);
                }
                const data = {
                    name: user
                };

                return done(null, data);
            });

        });
    });

});

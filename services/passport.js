const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys'); //.. means go up one directory, then into config
                                        //. would be same file

const User = mongoose.model('users');//single argument, pull out of it
//getting this through mongoose instead of requiring otherwise mongoose can get confused and try to make multiple

//google strategy has internal identifier of 'google'
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, 
    (accessToken, refreshToken, profile, done) => {
        // this is async, returns a promise
        //promise is handled with the .then
        User.findOne({ googleId: profile.id }).then((existingUser) => {
            if(existingUser){
                //already have a record with this profile id
                done(null, existingUser); //first arg is error, no error here
            } else {
                new User({ googleId: profile.id })
                    .save()
                    .then(user => done(null, user));
            }
        })
    })
);
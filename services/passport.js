const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys'); //.. means go up one directory, then into config
                                        //. would be same file

//google strategy has internal identifier of 'google'
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, 
    (accessToken, refreshToken, profile, done) => {
        console.log('access token: '+ accessToken);
        console.log('refresh token: '+refreshToken);
        console.log(profile);
    })
);
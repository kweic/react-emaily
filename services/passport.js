const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys'); //.. means go up one directory, then into config
                                        //. would be same file

const User = mongoose.model('users');//single argument, pull out of it
//getting this through mongoose instead of requiring otherwise mongoose can get confused and try to make multiple


//used to create cookie
passport.serializeUser((user, done) => {
    // console.log("serializing usser")
    // console.log(user.id)
    done(null, user.id);//use the actual record id so this works with multiple authentication methods
});

//getting a user back from a cookie
passport.deserializeUser((id, done) => {
    console.log("deserialize user called");
    User.findById(id).then(user => {
        console.log("deserialize user, got user");
        console.log(user);
        done(null, user);
    });
});

//google strategy has internal identifier of 'google'
//proxy true will keep the https
//other option is to determine the beginning of the url at runtime with environment check
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
        // this is async, returns a promise
        //promise is handled with the .then
        const existingUser = await User.findOne({ googleId: profile.id });
        
        if(existingUser){
            //already have a record with this profile id
            return done(null, existingUser); //first arg is error, no error here
        }

        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
    })
);

passport.use(
    new FacebookStrategy({
        clientID: keys.facebookClientID,
        clientSecret: keys.facebookClientSecret,
        callbackURL: '/auth/facebook/callback',
        enableProof: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
        // this is async, returns a promise
        //promise is handled with the .then
        const existingUser = User.findOne({ facebookId: profile.id });
        console.log('Facebook stategy being used');
        console.log(profile)

        if(existingUser){
            //already have a record with this profile id
            return done(null, existingUser); //first arg is error, no error here
        }
        
        const user = await new User({ facebookId: profile.id }).save();
        done(null, user);
    })
);
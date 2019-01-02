const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

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

app.get(
    '/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

app.get('/auth/google/callback', passport.authenticate('google'));

//run with 'node index.js'
//ctrl + c to stop node

// app.get('/', (req, res) => {
//     res.send({hi: 'there'});
// });



//get get info
//post send info
//put update all the properties of something
//delete delete something
//patch update one or two properties of something

const PORT = process.env.PORT || 5000; //port declared by heroku
app.listen(PORT);
//instructs express to tell node.js (the runtime) to listen to this port

//releasing on Heroku
// 'heroku create'
// outputs the url & the git link
// git push heroku master
// heroku open to open the browser from command line to this location
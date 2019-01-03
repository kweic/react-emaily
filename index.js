const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
//user has to require first because it's used in passport
require('./models/User'); //when app boots up, inform mongoose of this file to make or get users


mongoose.connect(keys.mongoURI);

const app = express();


//setup use of cookies, keys takes an array of keys for encryption for extra security
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./services/passport');

require('./routes/authRoutes')(app); //invokes the required function with app

//run with 'node index.js'
// or run with script, 'npm run dev'
//ctrl + c to stop node

// app.get('/', (req, res) => {
//     res.send({hi: 'there'});
// });

//mlab dev database
//user: admin
//password: password1



//get get info
//post send info
//put update all the properties of something
//delete delete something
//patch update one or two properties of something

const PORT = process.env.PORT || 5000; //port declared by heroku or default
app.listen(PORT);
//instructs express to tell node.js (the runtime) to listen to this port

//releasing on Heroku
// 'heroku create'
// outputs the url & the git link
// git push heroku master
// heroku open to open the browser from command line to this location
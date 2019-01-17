const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
//user has to require first because it's used in passport
require('./models/User'); //when app boots up, inform mongoose of this file to make or get users


mongoose.connect(keys.mongoURI);

const app = express();

//with bodyParser anytime a post, put, patch or anything with a request body
// comes in to the application the middleware parses it and
// assigns to req.body property of incoming request object
app.use(bodyParser.json());


//app.use wires up middleware
//setup use of cookies, keys takes an array of keys for encryption for extra security
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

//another cookie option: express-session, can store more information, cookie only
// holds a reference to the session that is looked up so the session info has no size limit
//has a lot of setup

//cookie-session stores what is needed in the cookie, session is the cookie,
// in this case only the id of the user


app.use(passport.initialize());
app.use(passport.session());

require('./services/passport');

require('./routes/authRoutes')(app); //invokes the required function with app
require('./routes/billingRoutes')(app);

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
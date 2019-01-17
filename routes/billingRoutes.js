const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');


//sets up the route for api/stripe
//passed in is the request handler

//the post can take an arbitrary number of functions to call
// so requireLogin is a middleware used in this case
module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        //console.log(req.body)
        // front end 500 is basically an authorization to say we want to charge that amount
        // back end to actually charge that amount
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });

        req.user.credits += 5;
        const user = await req.user.save();

        res.send(user);
    });
};
const passport = require('passport'); //original npm passport module

module.exports = app => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/google/callback', passport.authenticate('google'));
    app.get('/auth/facebook/callback', passport.authenticate('facebook'));

    app.get('/api/logout', (req, res) => {
        req.logout();//kills the cookie id
        res.send(req.user);
    });

    app.get('/api/current_user', (req, res) => {
        //current user from the cookie session
        res.send(req.user);
    });
};
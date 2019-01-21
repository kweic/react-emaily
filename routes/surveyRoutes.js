const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

//surveys brought in this way because
// a bug can occur with testing involving mongoose 
// if a model is required in multiple times
const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for Voting.');
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        //es6 syntax of 'title'
        // because key and value are the same
        // instead of 'title: title'
        const survey = new Survey({
            title,
            subject,
            body,
            //recipients: recipients.split(',').map(email => {email: email})
            //es6 shortened
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });



        //send email
        const mailer = new Mailer(survey, surveyTemplate(survey));
        //method (req,res) is marked async for this
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -=1;
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};
const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: { type: Number, default: 0},
    no: { type: Number, default: 0},
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    dateSent: Date,
    lastResponded: Date
});
//the underscore _user is not required but used to
//make it obvious that it is a reference

//mongoose will create if it doesn't see it, or re-use
//this line loads it into mongoose library
mongoose.model('surveys', surveySchema);
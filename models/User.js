const mongoose = require('mongoose');
//const Schema = mongoose.Schema; //this would do the same thing as line 3
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    facebookId: String,
    credits: { type: Number, default: 0 }
});

//mongoose will create if it doesn't see it, or re-use
mongoose.model('users', userSchema); //double argument, put something in
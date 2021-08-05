// user model

const mongoose = require('mongoose');



// reference to passport
const plm = require('passport-local-mongoose');

// create schema
var userSchema = new mongoose.Schema({
  username: String,
  password: String
})

userSchema.plugin(plm);


module.exports = mongoose.model('User', userSchema )
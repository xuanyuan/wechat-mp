const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  no: String
}, {
  versionKey: false
});
const User = mongoose.model('User', userSchema, 'User');
module.exports = User;
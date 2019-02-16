const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  no: String
});
const User = mongoose.model('User', userSchema, 'User');
module.exports = User;
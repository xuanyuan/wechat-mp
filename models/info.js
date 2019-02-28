const mongoose = require('mongoose');

const infoSchema = mongoose.Schema({
  community: String,
  title: String,
  content: String,
  images: Array
});
const Info = mongoose.model('Info', infoSchema, 'Info');
module.exports = Info;
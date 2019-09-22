const mongoose = require('mongoose'),
  moment = require('moment');

const infoSchema = mongoose.Schema({
  title: String, // 帖子标题
  content: String, // 帖子内容  
  time: {
    type: Date,
    default: Date.now
  }, // 最后发表（修改时间）
  region: Array,
  images: Array //上传图片
}, {
  versionKey: false
});
const Info = mongoose.model('Info', infoSchema, 'Info');
module.exports = Info;
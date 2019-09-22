const User = require('../models/user'),
  Info = require('../models/info'),
  formidable = require('formidable'),
  fs = require('fs'),
  path = require('path');
exports.home = function(req, res, next) {
  User.find(function(err, users) {
    if (err) {
      return next();
    }
    res.json(users);
  });
};
exports.infos = function(req, res, next) {
  // res.send("info");
  Info.find(function(err, infos) {
    if (err) {
      return next();
    }
    res.json(infos);
  });
};

exports.upload = function(req, res, next) {
  const form = new formidable.IncomingForm(); //既处理表单，又处理文件上传
  //设置文件上传文件夹/路径，__dirname是一个常量，为当前路径
  let uploadDir = path.join(__dirname, "../upload/");
  form.uploadDir = uploadDir; //本地文件夹目录路径
  form.parse(req, (err, fields, files) => {
    let oldPath = files.file.path; //这里的路径是图片的本地路径
    let filename = files.file.name.substr(-20);
    let newPath = path.join(path.dirname(oldPath), filename);
    //这里我传回一个下载此图片的Url
    var downUrl = "/upload/" + filename; //这里是想传回图片的链接
    fs.rename(oldPath, newPath, () => { //fs.rename重命名图片名称
      res.json({
        downUrl: downUrl
      })
    })
  })
};

exports.info = function(req, res, next) {
  const info = new Info(req.body);
  info.save(function(err, fluffy) {
    if (err) {
      return console.error(err);
    }
    res.json(info);
  });
};
exports.remove = function(req, res, next) {
  Info.remove(function(err, info) {
    if (err) {
      return handleError(err);
    }
  })
}
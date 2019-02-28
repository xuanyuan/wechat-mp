const User = require('../models/user'),
  Info = require('../models/info');
exports.home = function(req, res, next) {
  User.find(function(err, users) {
    if (err) return next();
    res.json(users);
  });
};

exports.about = function(req, res, next) {
  res.send("about");
};

exports.publish = function(req, res, next) {
  console.log(req.body);
  const info = new Info(req.body);
  info.save(function(err, fluffy) {
    if (err) return console.error(err);
    res.json(info);
  });
};
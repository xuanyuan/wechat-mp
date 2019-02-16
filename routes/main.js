const User = require('../models/user');
exports.home = function(req, res, next) {
  User.find(function(err, users) {
    if (err) return next();
    res.json(users);
  });
};

exports.about = function(req, res, next) {
  res.send("about");
}
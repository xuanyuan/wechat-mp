const main = require('./routes/main.js');

module.exports = function(app) {
  app.get('/', main.home);
  app.get('/about', main.about);
}
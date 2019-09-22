const main = require('./main.js');
module.exports = function(app) {
  app.get('/', main.home);
  app.post('/info', main.info);
  app.post('/upload', main.upload);
  app.get('/infos', main.infos);
}
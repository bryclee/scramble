var express = require('express');
var app = express();

var wordnik = require('./wordnikApi/wordnikHelpers.js');

app.use('/bower_components', express.static('bower_components'));
app.use('/', express.static('public', {
  index: 'index.html'
}));

app.get('/randomWord', function(req, res) {
  wordnik.getRandomWords(function(data) {
    res.send(data);
  });
});

app.get('/checkWord/*', function(req, res) {
  wordnik.searchWords(req.params[0], function(data) {
    res.send(data);
  });
});

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Server listening on', server.address().address, server.address().port);
});


var client = require('swagger-client');
var apiKey = process.env.API_KEY || require('./api_key.js');
var ClientApiKey = new client.ApiKeyAuthorization('api_key', apiKey, 'query');

var Wordnik = new client({
  url: 'http://developer.wordnik.com/v4/words.json',
  success: function() {
    console.log('wordnik client ready');
    Wordnik.clientAuthorizations.add('apiKey', ClientApiKey);
  }
});

var RANDOM_WORDS_OPTIONS = {
  minDictionaryCount: 25,
  excludePartOfSpeech: 'proper-noun',
  minLength: 4,
  maxLength: 6,
  limit: 1
};

var ERROR_STRINGS = {
  not_ready: 'Server is still configuring, please refresh the page.',
  server: 'Please try again later.'
};

var RESPONSE_OPTIONS = {responseContentType: 'application/json'};

var makeSearchQuery = function(query) {
  return {
    excludePartOfSpeech: 'proper-noun',
    maxLength: query.length,
    query: query,
  }
};

module.exports = {
  getRandomWords: function(cb) {
    if (Wordnik.isBuilt) {
      Wordnik.words.getRandomWords(RANDOM_WORDS_OPTIONS, RESPONSE_OPTIONS, function(response) {
        var randomWord = response.obj[0].word.toLowerCase();
        cb(randomWord);
      }, function(error) {
        console.log('getRandomWords error: ', error);
        cb(error.statusText);
      });
    } else {
      cb(ERROR_STRINGS.not_ready);
    }
  },
  searchWords: function(query, cb) {
    if (Wordnik.isBuilt) {
      Wordnik.words.searchWords(makeSearchQuery(query), RESPONSE_OPTIONS, function(response) {
        if (response.obj.totalResults) {
          cb(true);
        } else {
          cb(false);
        }
      }, function(error) {
        console.log('searchWords error: ', error);
        cb(ERROR_STRINGS.server);
      });
    } else {
      cb(ERROR_STRINGS.not_ready);
    }
  }
};

var client = require('swagger-client');
var apiKey = process.env.API_KEY || require('./api_key.js');
var ClientApiKey = new client.ApiKeyAuthorization('api_key', apiKey, 'query');

var words = new client({
  url: 'http://developer.wordnik.com/v4/words.json',
  success: function() {
    console.log('wordnik client ready');
    words.clientAuthorizations.add('apiKey', ClientApiKey);
  }
});

var RANDOM_WORDS_OPTIONS = {
  minDictionaryCount: 25,
  excludePartOfSpeech: 'proper-noun',
  minLength: 5,
  maxLength: 6
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
    if (words.isBuilt) {
      words.words.getRandomWords(RANDOM_WORDS_OPTIONS, RESPONSE_OPTIONS, function(response) {
        var randomWords = response.obj.map(function(wordObj) {
          return wordObj.word;
        })
        cb(randomWords);
      }, function(error) {
        console.log('getRandomWords error: ', error);
        cb(error.statusText);
      });
    } else {
      cb(null);
    }
  },
  searchWords: function(query, cb) {
    if (words.isBuilt) {
      words.words.searchWords(makeSearchQuery(query), RESPONSE_OPTIONS, function(response) {
        console.log(query, ':', response.obj);
        if (response.obj.totalResults) {
          cb(true);
        } else {
          cb(false);
        }
      }, function(error) {
        console.log('searchWords error: ', error);
        cb(error.statusText);
      });
    } else {
      cb(null);
    }
  }
};

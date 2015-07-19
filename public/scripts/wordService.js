angular.module('scrambleApp').
  factory('wordFactory', ['$http', function($http) {

    //Shuffle function for words
    var shuffle = function(word) {
      var randomIndex, temp;
      for (var i = 0; i < word.length; i++) {
        randomIndex = Math.floor(Math.random() * (word.length - i)) + i;
        temp = word[i];
        word[i] = word[randomIndex];
        word[randomIndex] = temp;
      }
      return word;
    }

    return {

      //Takes a callback and passes in a split random word from the API
      getRandomWord: function(cb) {
        $http.get('/randomWord').
          success(function(data) {
            cb(shuffle(data.split('')));
          }).
          error(function(error) {
            cb(null, error);
          });
      },

      //Checks a word against the API
      checkWord: function(word, cb) {
        $http.get('/checkWord/' + word).
          success(function(data) {
            cb(data);
          }).
          error(function(error) {
            cb(null, error);
          })
      }
    }
  }]);

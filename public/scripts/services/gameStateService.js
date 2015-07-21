angular.module('scrambleApp').
  factory('gameStateService', ['STATES', function(STATES) {
    //Service to hold the state of the app across different controllers
    var _data = {
      state: STATES.start,
      score: 0,
      word: ''
    };

    var extend = function(src, dest) {
      var keys = Object.keys(dest);
      for (var i = 0; i < keys.length; i++) {
        src[keys[i]] = dest[keys[i]];
      }
      return src
    };

    return {
      setState: function(state) {
        _data.state = state;
      },
      setScore: function(score) {
        _data.score = score;
      },
      setWord: function(word) {
        _data.word = word;
      },

      getScore: function() {
        return _data.score;
      },
      getWord: function() {
        return _data.word;
      },
      isStart: function() {
        return _data.state === STATES.start;
      },
      isPlay: function() {
        return _data.state === STATES.play;
      },
      isScore: function() {
        return _data.state === STATES.score;
      }
    };
  }]);

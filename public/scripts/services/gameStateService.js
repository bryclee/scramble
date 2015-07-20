angular.module('scrambleApp').
  factory('gameStateService', [function() {
    //Service to hold the state of the app across different controllers
    var _data = {
      state: 'start',
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
      getState: function(state) {
        return extend({}, _data);
      },
      setState: function(state) {
        extend(_data, state);
      }
    };
  }]);

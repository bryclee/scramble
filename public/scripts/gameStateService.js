angular.module('scrambleApp').
  factory('gameStateService', [function() {
    //Service to hold the state of the app across different controllers
    var data = {
      currentState: 'start',
      score: 0
    };

    return {
      getState: function() {
        return data.currentState;
      },
      getScore: function() {
        return data.score;
      },
      setState: function(state) {
        data.currentState = state;
      },
      setScore: function(score) {
        data.score = score;
      }
    };
  }]);

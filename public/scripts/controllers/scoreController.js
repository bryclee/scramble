angular.module('scrambleApp').
  controller('scoreController',
      ['$scope', 'gameStateService', 'STATES',
      function($scope, gameStateService, STATES) {
    //Display the score at the end of the game, allows the user to restart the game

    $scope.score = gameStateService.getScore();
    $scope.word = gameStateService.getWord();

    $scope.handleKeypress = function(e) {
      if (e.which === 8) {
        e.preventDefault();
      } else if (e.which === 13) {
        gameStateService.setState(STATES.play);
      }
    };

  }]);

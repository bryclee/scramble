angular.module('scrambleApp').
  controller('scoreController', ['$scope', 'gameStateService',
             function($scope, gameStateService) {
    //Display the score at the end of the game, allows the user to restart the game

    var currentState = gameStateService.getState();
    $scope.score = currentState.score;
    $scope.word = currentState.word;

    $scope.handleKeypress = function(e) {
      if (e.which === 8) {
        e.preventDefault();
      } else if (e.which === 13) {
        $scope.$apply(function() {
          gameStateService.setState({state: 'play'});
        });
      }
    };

  }]);

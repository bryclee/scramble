angular.module('scrambleApp').
  controller('scoreController', ['$scope', 'gameStateService',
             function($scope, gameStateService) {
    //Display the score at the end of the game, allows the user to restart the game

    $scope.score = gameStateService.getScore();

    $scope.handleKeypress = function(e) {
      if (e.which === 13) {
        $scope.$apply(function() {
          gameStateService.setState('play');
        });
      }
    };

  }]);

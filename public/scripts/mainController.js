angular.module('scrambleApp').
  controller('mainController', ['$scope', 'gameStateService',
             function($scope, gameStateService) {
    //Sets the current scope of the game into the scope

    $scope.state = gameStateService.getState();

    //Watch to see if the state changes, and update the scope's state when it does
    $scope.$watch(function(scope) {
      return gameStateService.getState();
    }, function(newVal, oldVal) {
      $scope.state = newVal;
    });

  }]);

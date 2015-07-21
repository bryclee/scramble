angular.module('scrambleApp').
  controller('mainController', ['$scope', 'gameStateService',
             function($scope, gameStateService) {
    //Expose state getter functions to the scope

    $scope.isStart = gameStateService.isStart;
    $scope.isPlay = gameStateService.isPlay;
    $scope.isScore = gameStateService.isScore;

  }]);

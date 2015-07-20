angular.module('scrambleApp').
  controller('startController', ['$scope', 'gameStateService',
             function($scope, gameStateService) {
    //Controller for the initial start screen that users see

    //Handler function to start the game when Enter key is pressed
    $scope.handleKeypress = function(e) {
      if (e.which === 13) {
        $scope.$apply(function() {
          gameStateService.setState({state: 'play'});
        });
      }
    };

  }]);

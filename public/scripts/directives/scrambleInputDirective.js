angular.module('scrambleApp').
  directive('scrambleInput', ['$document', function($document) {
    //Register the handleKeypress function in the current scope to the document
    return {
      restrict: 'A',

      link: function(scope, element, attr) {
        var handleKeypress = function(e) {
          scope.$apply(scope.handleKeypress.bind(null, e));
        }

        if (handleKeypress) {
          $document.on('keydown', handleKeypress);

          element.on('$destroy', function() {
            $document.off('keydown', handleKeypress);
          });
        }
      }

    };
  }]);

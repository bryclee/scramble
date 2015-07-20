angular.module('scrambleApp').
  controller('playController', ['$scope', '$interval', 'wordFactory', 'gameStateService',
             function($scope, $interval, wordFactory, gameStateService) {
    //Controls the gameplay part

    $scope.letters = [];
    $scope.userInput = [];
    $scope.score = 0;

    var inputReady = true;
    var currentWord;
    var numCharacters; //number of characters
    var startTime; //marks when word was given to give score
    var endTime = Date.now() + 60999; //set end time to 60s from current time
    var timer;

    //Set scope 'letters' to a new random word
    var getRandomWord = function() {
      inputReady = false;
      wordFactory.getRandomWord(function(randomWord, error) {
        if (error) {
          console.log(error);
        } else {
          currentWord = randomWord;
          var shuffledWord = wordFactory.shuffleWord(currentWord);
          $scope.letters = shuffledWord.map(function(letter) {return {letter:letter}});
          $scope.userInput = [];
          startTime = Date.now();
          numCharacters = shuffledWord.length;
        }
        inputReady = true;
      });
    };

    //Sets timer to the difference between current time and the end time
    var updateTimer = function() {
      $scope.timer = Math.floor((endTime - Date.now())/1000);
      if ($scope.timer <= 0) {
        //Trigger the end game
        console.log(currentWord);
        gameStateService.setState({
          state: 'score',
          score: $scope.score,
          word: currentWord
        });
      }
    };

    //Handles keypress events as either delete or letter press
    $scope.handleKeypress = function(e) {
      var character;
      var letters = $scope.letters;
      var inputs = $scope.userInput;
      var letter;

      character = String.fromCharCode(e.which).toLowerCase();

      if (e.which === 8) {
        //Delete a character and prevent browser from navigating back
        if (inputs.length && inputReady) {
          letters.unshift(inputs.pop());
        }
        e.preventDefault();
      } else if (inputReady) {
        for (var i = 0; i < letters.length; i++) {
          if (letters[i].letter === character) {
            letter = letters.splice(i, 1)[0];
            break;
          }
        }
        if (letter) {
          inputs.push(letter);
        }
      }

      //Calls the digest cycle to update the DOM
      $scope.$digest();
    };

    //Trigger the word check when the user has input all of the letters
    $scope.$watch(function(scope) {
        return scope.userInput.length === numCharacters;
      }, function(newVal, oldVal) {
        if (newVal === true) {
          inputReady = false;
          var word = $scope.userInput.map(function(letterObj) {
            return letterObj.letter;
          }).join('');
          wordFactory.checkWord(word, function(data, error) {
            if (error) {
              console.log(error);
            } else {
              if (data) {
                var time = Math.floor((Date.now() - startTime) / 1000);
                var score = Math.max(20 - time, numCharacters * 2);
                $scope.score = $scope.score + score;
                getRandomWord();
              } else {
                $scope.letters = $scope.userInput;
                $scope.userInput = [];
                inputReady = true;
              }
            }
          });
        }
      });

    //Initializing function
    (function init() {
      getRandomWord();
      updateTimer();

      timer = $interval(function() {
        updateTimer();
      }, 1000);

      $scope.$on('$destroy', function() {
        $interval.cancel(timer);
      });
    })();

  }]);

# scramble
A word-scramble game. Try to unscramble as many words as possible within the time limit.

This project was built using Angular and Node. The Wordnik API used for the random words.

## To start
Clone this repo and run **npm install**. Start a server with **npm start**, then go to **localhost:3000** in your browser.

## Future improvements
Some possible additions or improvements that could be made with more time:
- Changing the initial HTML to not show Angular templates before the framework has loaded. This could possibly be done by hiding the elements using CSS and using JavaScript to show them once the page has loaded.
- Better UI responsiveness. Currently there isn't any indication to the user that they have gotten the word right or wrong, except for the new word and their point totals going up. Some kind of indicator would make it more obvious and also more fun to play.
- Scoreboard, either by using some persistant storage on the server to keep track of all scores, or by using localstorage to show the user's high score.
- Improvements to the HTML page. Currently I use a scope state variable to track what state the game is in (start, play, score). The HTML page looks a bit cramped as a result; I would see if there was a better way to switch the view, or if not that then move those into directives to make the separation clearer.
- Error handling. One thing that should be added is error handling for when the Wordnik API isn't working. Could be a simple message asking the user to refresh the page.


var isWin = false;
var saeconds = 60;
var shuffledQuestions, currentQuestions;

// The startGame function is called when the start button is clicked
function startGame() {
    isWin = false;
    // Prevents start button from being clicked when round is in progress
    startButton.disabled = true;

  }
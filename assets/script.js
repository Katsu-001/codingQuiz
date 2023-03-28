var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");


var isWin = false;
var timer;
var timerCount;

// The startGame function is called when the start button is clicked
function startGame() {
    isWin = false;
    timerCount = 10;
    // Prevents start button from being clicked when round is in progress
    startButton.disabled = true;
    renderBlanks()
    startTimer()
  }
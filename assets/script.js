// Question, Choices, and the Answers
var questions = [
  {
    title: 'What do arrays in javascript store?',
    choices: [
      { text: 'booleans', correct: false },
      { text: 'strings', correct: false },
      { text: 'numbers', correct: false },
      { text: 'all of the above', correct: true }
    ]
  },
  {
    title: 'Which of the following is used to define a variable in Javascript?',
    choices: [
      { text: 'let', correct: false },
      { text: 'var', correct: false },
      { text: 'neither', correct: false },
      { text: 'both', correct: true }
    ]
  },
  {
    title: 'Some regularly used data types DO NOT include:',
    choices: [
      { text: 'strings', correct: false },
      { text: 'booleans', correct: false },
      { text: 'alerts', correct: true },
      { text: 'numbers', correct: false }
    ]
  },
  {
    title: 'Which is the correct HTML element used to store our JavaScript link',
    choices: [
      { text: 'script', correct: true },
      { text: 'javascript', correct: false },
      { text: 'scripting', correct: false },
      { text: 'js', correct: false }
    ]
  },
  {
    title: 'What is used encolosing a string to assign it to a variable?',
    choices: [
      { text: 'commas', correct: false },
      { text: 'quotes', correct: true },
      { text: 'curly brackets', correct: false },
      { text: 'parentheses', correct: false }
    ]
  }
];

var seconds = 60
// variables to reference DOM elements
var questionsEl = document.getElementById('questions');
var startScreenEl = document.getElementById('start-screen');
var questionTitleEl = document.getElementById('question-title');
var answerButtonsEl = document.getElementById('choices');
var counter = document.getElementById("timer");
var endScreenEl = document.getElementById('end-screen');
var feedbackEl = document.getElementById('feedback');

// The startGame function is called when the start button is clicked
function startQuiz() {
  startScreenEl.classList.add('hide');
  questionsEl.classList.remove('hide');
  // randomizes questions and creates a randomized array
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0

  clockTick();
  getQuestions();
}

// Function to retrieve selected questions
function getQuestions() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}
function showQuestion(questions) {
  if (currentQuestionIndex > 3) {
    endScreenEl.classList.add('stop-time')
    questionsEl.classList.add('hide');
    endScreenEl.classList.remove('hide');
    document.getElementById('final-score').innerHTML = counter.innerHTML
  }
  questionTitleEl.innerText = questions.title;
  questions.choices.forEach(choices => {
    const button = document.createElement('button')
    button.innerText = choices.text
    button.classList.add('button-style', 'answer-button')
    if (choices.correct === true) {
      button.classList.add('correct')
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsEl.appendChild(button)
  })
}
function resetState() {
  while (answerButtonsEl.firstChild) {
    answerButtonsEl.removeChild(answerButtonsEl.firstChild)
  }
}

// Shows correct or wrong, and deducts time if incorrect
function selectAnswer(e) {
  const selectedButton = e.target
  if (selectedButton.classList.contains('correct')) {
    feedbackEl.classList.remove('hide')
    feedbackEl.innerHTML = 'Correct'
    setTimeout(function () {
      feedbackEl.innerHTML = '';
    }, 1000);
  } else {
    seconds -= 10
    feedbackEl.classList.remove('hide')
    feedbackEl.innerHTML = 'Wrong'
    setTimeout(function () {
      feedbackEl.innerHTML = '';
    }, 1000);
  }
  currentQuestionIndex++
  getQuestions()
}

// Timer function
function clockTick() {
  seconds--;
  counter.innerHTML =
    (seconds < 10 ? "0" : "") + String(seconds);
  if (endScreenEl.classList.contains('stop-time')) {
    counter.innerHTML = document.getElementById('final-score').innerHTML
  } else if (seconds > 0) {
    setTimeout(clockTick, 1000);

  } else {
    counter.innerHTML = '00'
    questionsEl.classList.add('hide');
    endScreenEl.classList.remove('hide');
    document.getElementById('final-score').innerHTML = counter.innerHTML
  }
}

// Stores high score, adds to local storage, nav to highscores page
function saveHighscore() {
  var initials = document.getElementById('initials').value;
  var finalScore = counter.innerHTML
  if (initials == '') {
    alert('Please input at least 1 character')
    return null
  }
  var currentScore = { init: initials, score: finalScore };
  var savedScores = JSON.parse(localStorage.getItem("savedScores"));
  if (savedScores !== null) {
    savedScores.push(currentScore);
    localStorage.setItem("savedScores", JSON.stringify(savedScores));
  } else {
    savedScores = [currentScore];
    localStorage.setItem("savedScores", JSON.stringify(savedScores));
  }

  window.location.href = "./highscores.html";
}

/* CLICK EVENTS */
document.getElementById('submit-button').addEventListener('click', saveHighscore)
document.getElementById('start-button').addEventListener('click', startQuiz)
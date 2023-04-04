function printHighscores() {
    // retrieve high scores from local storage
    var scores = JSON.parse(localStorage.getItem("savedScores"));
    // sort highscores
    scores.sort( function ( a, b ) { return b.score - a.score; } );

    // list for high scores
    for(var i=0;i<scores.length;i++) {
        var li = document.createElement("li");
        li.classList.add('list-style')
        li.textContent = scores[i].init + " - " + scores[i].score;
        document.getElementById("highscores").appendChild(li);
    }
}

// Function for clearing scores
function clearHighscores() {
    localStorage.removeItem("savedScores");
    window.location.reload();
}
document.querySelector("#clear").addEventListener("click", clearHighscores);

printHighscores();
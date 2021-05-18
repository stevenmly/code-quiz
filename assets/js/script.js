var timerEl = document.querySelector("#timer")
var startButtonEL = document.querySelector("#start-btn")

// global variables
var timer = 0;
var score = 0;
var questionNum = 0;
var currentTime;

// function to start quiz
function startQuiz() {
    timer = 60
    startTimer();



}

function startTimer() {
    currentTime = setInterval(function() {
        if (timer > 0) {
            timerEl.textContent = timer;
            timer--;
        }
        else {
            clearInterval(currentTime);
            timerEl.textContent = 0
        }
    }, 1000);
}

startQuiz();

startButtonEL.addEventListener("click", startQuiz);

questionObjs = [
    {
        question: "What is the correct way to implement comments in JavaScript?",
        choices: ["&&", "//", "<!-- -->", "[]"],
        answer: "//"
    },
    {
        question: "Which of these variables correctly represents camel casing?",
        choices: ["var = TimeLeft","var = timeleft","var = timeLeft","var = Timeleft"],
        answer: "var = timeLeft"
    },
    {
        question: "Which one of these is NOT a  primitive data type in JavaScript?",
        choices: ["Number", "String", "Object", "Boolean"],
        answer: "Object"
    },
    {
        question: "Examine the following array. var names = ['steven', 'Logan', 'Lindsay', 'Taylor']. How would you select the name 'Lindsay' from the array?",
        choices: ["names[0]", "names[1]", "names[2]", "names[3]"],
        answer: "names[2]"
    },
    {
        question: "",
        choices: [],
        answer: 
    },
]

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
    score = 0;
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



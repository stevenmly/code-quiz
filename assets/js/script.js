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
        question: "Examine the following array. var names = ['Steven', 'Logan', 'Lindsay', 'Taylor']. How would you select the name 'Lindsay' from the array?",
        choices: ["names[0]", "names[1]", "names[2]", "names[3]"],
        answer: "names[2]"
    }
]

var timerEl = document.querySelector("#timer");
var scoreEL = document.querySelector("#score");
var startButtonEL = document.querySelector("#start-btn");
var quizQuestionsEl = document.querySelector("#quiz-container");
var mainEl = document.querySelector("#main");

// global variables
var timer = 0;
var score = 0;
var questionNum = 0;
var currentTime;
var highScores = [];

// function to start quiz
function startQuiz() {
    timer = 60
    score = 0;
    startTimer();
    showQuestion();
    
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

function showQuestion() {

    newQuestion();

    if (questionNum < questionObjs.length) {
        var question = document.createElement('h2');
        question.textContent = questionObjs[questionNum].question;
        quizQuestionsEl.appendChild(question);

        var answerChoices = document.createElement('ul');
        quizQuestionsEl.appendChild(answerChoices);


        for (i = 0; i < 4; i++) {
            var answersEl = document.createElement('li');
            answersEl.textContent = questionObjs[questionNum].choices[i];
            answersEl.setAttribute("class", "answer-choice");
            answerChoices.appendChild(answersEl);
        }

        answerChoices.addEventListener('click', function() {
            checkAnswer();
            questionNum++;
            showQuestion();
        })
    }
    else {
        clearInterval(currentTime);
        timerEl.textContent = 0; 
        // window.alert("Quiz Completed! Thanks for playing!");
        endGame();
    }
}

function newQuestion() {
    quizQuestionsEl.innerHTML="";
}

function checkAnswer() {
    var selectEl = event.target;

    if (selectEl.innerHTML === questionObjs[questionNum].answer) {
        console.log("Correct answer!")
        score++;
        scoreEL.textContent = score;
    }
     
    
    else {
        console.log("Wrong answer!");
        timer -=10;
    }

}

function endGame() {
    mainEl.innerHTML="";

    var submitContainerEl = document.createElement("div");
    submitContainerEl.setAttribute("class", "submit-score");
    mainEl.appendChild(submitContainerEl);

    var scoreHeaderEl = document.createElement("h2");
    scoreHeaderEl.textContent = "Congrats on completing the quiz! You finished with a score of"
    submitContainerEl.appendChild(scoreHeaderEl);

    var initialsLabelEl = document.createElement("label");
    initialsLabelEl.setAttribute("for","userInitials");

    var initialsInputEl = document.createElement("input");
    initialsInputEl.setAttribute("id","userInitials");
    initialsInputEl.setAttribute("name","userInitials");
    initialsInputEl.setAttribute("maxlength","3");
    initialsInputEl.setAttribute("size","3");

    var submitButtonEl = document.createElement("button");
    submitButtonEl.setAttribute("id", "submitBtn");
    submitButtonEl.textContent = "Submit"

    submitContainerEl.appendChild(initialsLabelEl);
    submitContainerEl.appendChild(initialsInputEl);
    submitContainerEl.appendChild(submitButtonEl); 

    var quizScore = {initials: "input", score: score}

    submitButtonEl.addEventListener("click", function() {

        quizScore.initials = document.getElementById("userInitials").value.toUpperCase();
        quizScore.score = score;

        highScores.push(quizScore)

        localStorage.setItem("highScores", JSON.stringify(highScores))

        showHighScores();
    })
    
}

function showHighScores() {
    mainEl.innerHTML="";
}


startQuiz();



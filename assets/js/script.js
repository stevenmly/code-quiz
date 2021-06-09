questionObjs = [
    {
        question: "What is the correct way to implement comments in JavaScript?",
        choices: ["&&", "//", "<!-- -->", "[]"],
        answer: "//"
    },
    {
        question: "Which of these variables correctly represents camel casing?",
        choices: ["var = timeLeft","var = timeleft","var = TimeLeft","var = Timeleft"],
        answer: "var = timeLeft"
    },
    {
        question: "Which one of these is NOT a  primitive data type in JavaScript?",
        choices: ["Number", "String", "Boolean", "Object"],
        answer: "Object"
    },
    {
        question: "Examine the following array. var names = ['Steven', 'Logan', 'Lindsay', 'Taylor']. How would you select the name 'Lindsay' from the array?",
        choices: ["names[0]", "names[1]", "names[2]", "names[3]"],
        answer: "names[2]"
    }
]

var timerContainer = document.querySelector("#timer-container")
var timerEl = document.querySelector("#timer");
var scoreEL = document.querySelector("#score");
var quizContent = document.querySelector("#quiz-content");

// global variables
var timer = 0;
var score = 0;
var questionNum = 0;
var currentTime;
var highScoreList = [];


function homeScreen() {
    clearContent();
    reset();

    timerContainer.setAttribute("style", "visibility: hidden;")

    var quizHeader = document.createElement("h2");
    quizHeader.textContent = "JavaScript Quiz for Beginners!";
    quizContent.appendChild(quizHeader);

    var quizInst = document.createElement("p");
    quizInst.textContent = "You will have 1 minute to complete this quiz. However, for every question that you answer incorrectly, 10 seconds will be deducted from your time. You will get one point for every answer you get right. Are you ready?"
    quizContent.appendChild(quizInst);

    var startQuizButton = document.createElement("button");
    startQuizButton.textContent = "Start Quiz!"
    quizContent.appendChild(startQuizButton);

    var highScoreButton = document.createElement("button");
    highScoreButton.textContent = "High Scores"
    quizContent.appendChild(highScoreButton);

    highScoreButton.addEventListener("click", showHighScores);

    startQuizButton.addEventListener("click", startQuiz);
}

// function to start quiz
function startQuiz() {
    timer = 60
    score = 0;
    startTimer();
    showQuestion();
    
}

function startTimer() {

    timerContainer.setAttribute("style", "visibility: visible;")

    currentTime = setInterval(function() {
        if (timer > 0) {
            timerEl.textContent = timer;
            timer--;
        }
        else {
            clearInterval(currentTime);
            timerEl.textContent = 0
            endGame();
        }
    }, 1000);
}

function reset() {
    score = 0;
    timer = 60;
    questionNum = 0
}

function showQuestion() {

    clearContent();

    if (questionNum < questionObjs.length) {
        var question = document.createElement('h2');
        question.textContent = questionObjs[questionNum].question;
        quizContent.appendChild(question);

        var answerChoices = document.createElement('ul');
        quizContent.appendChild(answerChoices);


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

function clearContent() {
    quizContent.innerHTML="";
}

function checkAnswer() {
    var selectEl = event.target;

    if (selectEl.innerHTML === questionObjs[questionNum].answer) {
        console.log("Correct answer!")
        score++;
        console.log(score);
    }
     
    
    else {
        console.log("Wrong answer!");
        timer -=10;
    }

}

function endGame() {
    quizContent.innerHTML="";

    var submitContainer = document.createElement("div");
    submitContainer.setAttribute("class", "submit-score");
    quizContent.appendChild(submitContainer);

    var endGameHeader = document.createElement("h2");
    endGameHeader.textContent = "The quiz is now over! Please enter your initials:"
    submitContainer.appendChild(endGameHeader);

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

    submitContainer.appendChild(initialsLabelEl);
    submitContainer.appendChild(initialsInputEl);
    submitContainer.appendChild(submitButtonEl); 

    var quizScore = {initials: "input", score: score}

    submitButtonEl.addEventListener("click", function() {

        quizScore.initials = document.getElementById("userInitials").value.toUpperCase();
        quizScore.score = score;

        highScoreList.push(quizScore)
        console.log(highScoreList)

        localStorage.setItem("highScores", JSON.stringify(highScoreList))

        showHighScores();
    })
    
    clearInterval(currentTime);
}

function showHighScores() {
    clearContent();

    var scoresContainer = document.createElement("div");
    quizContent.appendChild(scoresContainer);
    
    var scoresHeader = document.createElement("h2");
    scoresHeader.textContent = "High Scores: ";
    scoresContainer.appendChild(scoresHeader);

    var scoresList = document.createElement("ol");
    scoresContainer.appendChild(scoresList);

    var storedScores = (localStorage.getItem("highScores"));

    if (storedScores) {
        //sort scores
        highScoreList.sort((a, b) => (a.score < b.score) ? 1 : -1);

        //add scores to list
        for (var i = 0; i < highScoreList.length; i++) {

            var displayScore = document.createElement("li");
            
            displayScore.textContent = highScoreList[i].initials + " - " + highScoreList[i].score;
            displayScore.setAttribute("id", "scoresList");
            scoresList.appendChild(displayScore);
        }
    }

    var returnHomeButton = document.createElement("button");
    returnHomeButton.textContent = "Go Back";
    quizContent.appendChild(returnHomeButton);

    returnHomeButton.addEventListener("click", function() {
        homeScreen();
    })
}


homeScreen();




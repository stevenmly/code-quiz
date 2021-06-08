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
var highScoreList = [];

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
            endGame();
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

    var endGameHeader = document.createElement("h2");
    endGameHeader.textContent = "The quiz is now over! Please enter your initials"
    submitContainerEl.appendChild(endGameHeader);

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

        highScoreList.push(quizScore)
        console.log(highScoreList)

        localStorage.setItem("highScores", JSON.stringify(highScoreList))

        showHighScores();
    })
    
}

function showHighScores() {
    mainEl.innerHTML="";

    var scoresContainer = document.createElement("div");
    mainEl.appendChild(scoresContainer);
    
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

}

startButtonEL.addEventListener("click", startQuiz);





var startP = document.querySelector('.startParagraph');
var startBtn = document.querySelector('.start-btn');
var firstBtn = document.querySelector('.first-btn');
var gameBtn = document.querySelector('.game-btn');
var nextBtn = document.querySelector('.next-btn');
var instructions = document.querySelector('.instructions');
var highscoreLink = document.querySelector('.hsLink');
var cardTitle = document.querySelector('#cardH2');
var questionTitle = document.querySelector('#question');
var mainGame = document.querySelector('.main-game');
var timer = document.querySelector('.timer');
var seconds = document.querySelector('.seconds');

var score = 0;
var index = 0;

firstBtn.addEventListener('click', firstFunc);
startBtn.addEventListener('click', startFunc);
nextBtn.addEventListener('click', nextQuestion);
mainGame.addEventListener('click', checkAnswerFunc);

// First function for when the first next button is clicked.
function firstFunc() {
// This will hide the next button, the starting paragraph, and the link for the highscores.
    startP.classList.add('hide');
    firstBtn.classList.add('hide')
    highscoreLink.classList.add('hide');

// This will then show the start button, and the instructions for the game!
    startBtn.classList.remove('hide');
    instructions.classList.remove('hide');

// This will change the h2 from Quiz Game! to Instructions.
    cardTitle.textContent = 'Instructions'
}

// Second function for when the start button is clicked.
function startFunc() {
    // Hide the instructions.
    instructions.classList.add('hide');
    startBtn.classList.add('hide');

    // Show the timer.
    timer.classList.remove('hide');
    mainGame.classList.remove('hide');

    // Start the game
    questionsFunc();

    // Start the timer.
    timerFunc();
}

// Timer function
function timerFunc() {
    var interval = 60;

    var time = setInterval( function(){ 
       interval--;

       seconds.textContent = interval;

        if (interval === 30){
            timer.setAttribute('style', 'color: darkred')
        }

        if (interval === 20) {
            timer.setAttribute('style', 'color: rgb(163, 4, 4)')
        }

       if (interval === 10) {
           timer.setAttribute('style', 'color: red')
       }

       if (interval === 0) {
        clearInterval(time);
       }
    }, 1000);
}

// Question function
function questionsFunc() {
    cardTitle.textContent = `Question ${index+1}`;
    questionTitle.textContent = questions[index].question;

    // With this array and the sort function beneath it, it will allow the buttons to be random instead of being in static postions every game.
    var randomNumber = [0,1,2,3];
    randomNumber.sort(() => Math.random() - 0.5);

    for (var i = 0; i < randomNumber.length; i++) {
        document.querySelector(`.game-btn-${randomNumber[i]}`).textContent = questions[index].answers[i].item;
        document.querySelector(`.game-btn-${i}`).classList.add('enabled');

        if (questions[index].answers[i].true) {
            document.querySelector(`.game-btn-${randomNumber[i]}`).dataset.correct = 'true'
          }
    }
}

// Next question function
function nextQuestion() {
    index++;

    for (var i = 0; i < 4; i++) {
        if (document.querySelector(`.game-btn-${i}`).classList.contains('correct')) {
            document.querySelector(`.game-btn-${i}`).classList.remove('correct');
        } else {
            document.querySelector(`.game-btn-${i}`).classList.remove('wrong');
        }

        if (document.querySelector(`.game-btn-${i}`).dataset.correct === 'true') {
            document.querySelector(`.game-btn-${i}`).removeAttribute('data-correct');
        }
    }

    nextBtn.classList.add('hide')

    questionsFunc();
}

// Check Answers Function
function checkAnswerFunc(event) {
    if (event.target.matches('button')) {
        // This if statement makes it so that the player can't click on the correct answer and countinue to rack up points after the point have already been given.
        if (gameBtn.classList.contains('enabled')) {
            for (var i = 0; i < 4; i++) {
                // This line of code will remove the class of enabled from all the answer so the user can only get points once per question.
                document.querySelector(`.game-btn-${i}`).classList.remove('enabled');

                // This will check and see which answer was the correct one and add the class 'correct' on it so that will it'll show up green for the user. While every other answer will show up as red.
                if (document.querySelector(`.game-btn-${i}`).dataset.correct === 'true') {
                    document.querySelector(`.game-btn-${i}`).classList.add('correct');
                } else {
                    document.querySelector(`.game-btn-${i}`).classList.add('wrong');
                }
            }
    
            nextBtn.classList.remove('hide');
    
            if (event.target.dataset.correct === 'true') {
                cardTitle.textContent = 'Correct!'
                score += 5;
            } else {
                cardTitle.textContent = 'Wrong...'
                score -= 5;
            }
        }
    }
}

// Stop the game function
function stopGame() {
    
}

// Questions/Answers
var questions = [
    {
        question: 'What year was Microsoft founded?',
        answers: [
            {item: '1975', true: true},
            {item: '1967', true: false},
            {item: '1936', true: false},
            {item: '1988', true: false}
        ]
    },
    {
        question: 'Which NHL team started their first season in 2017?',
        answers: [
            {item: 'Winnipeg Jets', true: false},
            {item: 'Atlanta Thrashers', true: false},
            {item: 'Vegas Golden Knights', true: true},
            {item: 'Tampa Bay Lightning', true: false}
        ]
    },
    {
        question: 'What day did Google release the first Pixel phone?',
        answers: [
            {item: 'August 16th, 2006', true: false},
            {item: 'July 4th, 2011', true: false},
            {item: 'November 2nd, 1999', true: false},
            {item: 'October 20th, 2016', true: true}
        ]
    },
    // {
    //     question: '',
    // }
]
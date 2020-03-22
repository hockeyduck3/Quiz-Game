var startP = document.querySelector('.startParagraph');
var startBtn = document.querySelector('.start-btn');
var firstBtn = document.querySelector('.first-btn');
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

    
    for (var i = 0; i < 4; i++) {
        document.querySelector(`.game-btn-${i}`).textContent = questions[index].answers[i].item;

        if (questions[index].answers[i].true) {
            document.querySelector(`.game-btn-${i}`).dataset.correct = 'true'
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
        for (var i = 0; i < 4; i++) {
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
        question: 'What year did Google release the first Pixel phone?',
        answers: [
            {item: '2006', true: false},
            {item: '2011', true: false},
            {item: '1999', true: false},
            {item: '2016', true: true}
        ]
    }
]
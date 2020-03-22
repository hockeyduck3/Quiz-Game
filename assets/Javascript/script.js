var startP = document.querySelector('.startParagraph');
var startBtn = document.querySelector('.start-btn');
var firstBtn = document.querySelector('.first-btn');
var instructions = document.querySelector('.instructions');
var highscoreLink = document.querySelector('.hsLink');
var cardTitle = document.querySelector('#cardH2');
var timer = document.querySelector('.timer');
var seconds = document.querySelector('.seconds');

firstBtn.addEventListener('click', firstFunc);
startBtn.addEventListener('click', startFunc);

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
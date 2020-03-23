var startP = document.querySelector('.startParagraph');
var startBtn = document.querySelector('.start-btn');
var firstBtn = document.querySelector('.first-btn');
var gameBtn = document.querySelector('.game-btn');
var nextBtn = document.querySelector('.next-btn');
var finishBtn = document.querySelector('.finish-btn');
var instructions = document.querySelector('.instructions');
var highscoreLink = document.querySelector('.hsLink');
var cardTitle = document.querySelector('#cardH2');
var giantNum = document.querySelector('.giantNumber');
var questionTitle = document.querySelector('#question');
var mainGame = document.querySelector('.main-game');
var timer = document.querySelector('.timer');
var seconds = document.querySelector('.seconds');

var score = 0;
var index = 0;
var time;
var interval = 60;

firstBtn.addEventListener('click', firstFunc);
startBtn.addEventListener('click', countdownFunc);
nextBtn.addEventListener('click', nextQuestion);
finishBtn.addEventListener('click', stopGame);
mainGame.addEventListener('click', checkAnswerFunc);

// First function for when the first next button is clicked
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

// Countdown function for before the offcial game starts
function countdownFunc() {
    // Hide the instructions.
    instructions.classList.add('hide');
    startBtn.classList.add('hide');
    giantNum.classList.remove('hide')


    var count = 5;
    cardTitle.textContent = `Game starts in: ${count}`

    var countdownTimer = setInterval( function() {
        count--; 

        cardTitle.textContent = `Game starts in: ${count}`;
        giantNum.textContent = count;

        if (count === 0) {
            clearInterval(countdownTimer);
            giantNum.classList.add('hide')
            startFunc();
        } 
    }, 1000)
}

// This function will officially start the game
function startFunc() {
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
    time = setInterval( function() { 
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
        stopGame();
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
    
            // nextBtn.classList.remove('hide');

            if (index != questions.length - 1) {
                nextBtn.classList.remove('hide');
            } else {
                finishBtn.classList.remove('hide');
            }
    
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
    clearInterval(time);

    var finalScore = score + interval;

    if (finalScore < 0) {
        finalScore = 1;
    }

    sessionStorage.setItem('fScore', finalScore)

    window.location.href = "highscores.html";
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
    {
        question: 'Who directed the 2019 film Parasite?',
        answers: [
            {item: 'Guillermo del Toro', true: false},
            {item: 'Bong Joon-ho', true: true},
            {item: 'Steven Spielberg', true: false},
            {item: 'Christopher Nolan', true: false}
        ]
    },
    {
        question: `What is Deku's quirk in the show My Hero Academia?`,
        answers: [
            {item: 'All for one', true: false},
            {item: 'Half and Half', true: false},
            {item: 'One for All', true: true},
            {item: '4 for 4', true: false}
        ]
    },
    {
        question: 'Who does Millie Bobby Brown play in Stranger Things?',
        answers: [
            {item: 'Eleven', true: true},
            {item: 'Twelve', true: false},
            {item: 'Seven', true: false},
            {item: 'Nine', true: false}
        ]
    },
    {
        question: `Who is Tanjiro's sister in Demon Slayer?`,
        answers: [
            {item: 'Inosuke', true: false},
            {item: 'Nezuko', true: true},
            {item: 'Shinobu', true: false},
            {item: 'Hotaru', true: false}
        ]
    },
    {
        question: `What is JerryRigEverything's real name?`,
        answers: [
            {item: 'Austin Evans', true: false},
            {item: 'Linus Sebastian', true: false},
            {item: 'Zack Nelson', true: true},
            {item: 'Marques Brownlee', true: false}
        ]
    },
    {
        question: `What game did Mario first appear in?`,
        answers: [
            {item: 'Super Mario Bros', true: false},
            {item: 'Dr. Mario', true: false},
            {item: 'Super Mario Kart', true: false},
            {item: 'Donkey Kong', true: true}
        ]
    },
    {
        question: 'Which NHL team was not in the Original 6?',
        answers: [
            {item: 'Pittsburgh Penguins', true: true},
            {item: 'New York Rangers', true: false},
            {item: 'Toronto Maple Leafs', true: false},
            {item: 'Chicago Blackhawks', true: false}
        ]
    }
]

questions.sort(() => Math.random() - 0.5);
// Almost all of the button variables
var startP = document.querySelector('.startParagraph');
var startBtn = document.querySelector('.start-btn');
var firstBtn = document.querySelector('.first-btn');
var gameBtn = document.querySelector('.game-btn');
var nextBtn = document.querySelector('.next-btn');
var finishBtn = document.querySelector('.finish-btn');

// Variables for other parts of the DOM
var instructions = document.querySelector('.instructions');
var highscoreLink = document.querySelector('.hsLink');
var cardTitle = document.querySelector('#cardH2');
var giantNum = document.querySelector('.giantNumber');
var questionTitle = document.querySelector('#question');
var mainGame = document.querySelector('.main-game');
var repoLink = document.querySelector('.beforeFooter');

// Variables for the timer
var timer = document.querySelector('.timer');
var seconds = document.querySelector('.seconds');

// Almost all of the number variables
var score = 0;
var index = 0;
var time;
var interval = 60;

// Almost all of the event listeners for the game
firstBtn.addEventListener('click', firstFunc);
startBtn.addEventListener('click', countdownFunc);
nextBtn.addEventListener('click', nextQuestion);
finishBtn.addEventListener('click', stopGame);
mainGame.addEventListener('click', checkAnswerFunc);

// This function will check and see if the the user has already read the instructions. 
introCheck();

// If the user has already seen the instruction this session then it will show the start button instead of the next button.
function introCheck() {
    if (sessionStorage.getItem('skipIntro')) {
        firstBtn.classList.add('hide');
        startBtn.classList.remove('hide');
    }
}

// First function for when the first next button is clicked
function firstFunc() {

// This function will hide the next button, the starting paragraph, and the link for the highscores.
    hideStart();

// This will then show the start button, and the instructions for the game!
    startBtn.classList.remove('hide');
    instructions.classList.remove('hide');

// This will change the h2 from Quiz Game! to Instructions.
    cardTitle.textContent = 'Instructions';
}

// Countdown function for before the offcial game starts
function countdownFunc() {

    // Run the function to hide the start and instructions
    hideInstructions();
    hideStart();

    // If the user has not read the instructions before, this if statement will make sure they don't have to read the instruction again this session.
    if (sessionStorage.getItem('skipIntro') == null) {
        sessionStorage.setItem('skipIntro', true);
    }

    // Set the countdown to 5 seconds and then start it
    var count = 5;
    cardTitle.textContent = `Game starts in: 5`;

    // Countdown timer
    var countdownTimer = setInterval( function() {
        count--; 

        cardTitle.textContent = `Game starts in: ${count}`;
        giantNum.textContent = count;

        // Once the timer hits 0 the game will start
        if (count === 0) {
            clearInterval(countdownTimer);
            giantNum.classList.add('hide');
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

        // Once the timer gets to 30 seconds or less, it will go to a darkred color, letting the user know they're starting to run out of time.
        if (interval <= 30){
            timer.setAttribute('style', 'color: darkred');
        }

        // Once the timer hit's 20 seconds or less the color will get slightly brighter red
        if (interval <= 20) {
            timer.setAttribute('style', 'color: rgb(163, 4, 4)');
        }

        // Once the timer hits 10 seconds then the color will go to a very bright red
        if (interval <= 10) {
            timer.setAttribute('style', 'color: red');
        }

        // If the timer hits 0 then the game will end
        if (interval === 0) {
            clearInterval(time);
            stopGame();
        }
    }, 1000);
}

// Question function
function questionsFunc() {

    // This will update the card title above the hr to show the user what question they are on.
    cardTitle.textContent = `Question ${index+1}`;
    
    // Updates the question
    questionTitle.textContent = questions[index].question;

    // With this array and the sort function beneath it, it will allow the buttons to be random instead of being in static postions every game.
    var randomNumber = [0,1,2,3];
    randomNumber.sort(() => Math.random() - 0.5);

    // Loop through the answers and add them to the buttons
    for (var i = 0; i < randomNumber.length; i++) {
        document.querySelector(`.game-btn-${randomNumber[i]}`).textContent = questions[index].answers[i].item;

        //This will make the buttons active again 
        document.querySelector(`.game-btn-${i}`).classList.add('enabled');

        // Depending on which answer is true, this will go through and add a dataset of correct onto the only answer
        if (questions[index].answers[i].true) {
            document.querySelector(`.game-btn-${randomNumber[i]}`).dataset.correct = 'true';
          }
    }
}

// Next question function
function nextQuestion() {

    // Go to the next index
    index++;

    for (var i = 0; i < 4; i++) {
        // This will remove the green/red coloring on the buttons
        if (document.querySelector(`.game-btn-${i}`).classList.contains('correct')) {
            document.querySelector(`.game-btn-${i}`).classList.remove('correct');
        } else {
            document.querySelector(`.game-btn-${i}`).classList.remove('wrong');
        }

        // This will remove the data-correct attribute from the buttons so the next question won't have 2, 3, or even 4 correct answers. There can only be 1...
        if (document.querySelector(`.game-btn-${i}`).dataset.correct === 'true') {
            document.querySelector(`.game-btn-${i}`).removeAttribute('data-correct');
        }
    }

    // hide the next button
    nextBtn.classList.add('hide');

    // Trigger the questions function again
    questionsFunc();
}

// Check Answers Function
function checkAnswerFunc(event) {

    // This will check and see if the user clicked on a button or not.
    if (event.target.matches('button')) {

        // This if statement makes it so that the player can't click on the correct answer and countinue to rack up points after the points have already been given.
        if (gameBtn.classList.contains('enabled')) {
            for (var i = 0; i < 4; i++) {

                // This line of code will remove the class of enabled from all the answer so the user can only get points once per question.
                document.querySelector(`.game-btn-${i}`).classList.remove('enabled');

                // This will check and see which answer was the correct one and add the class of 'correct' on it so that will it'll show up green for the user. While every other answer will show up as red.
                if (document.querySelector(`.game-btn-${i}`).dataset.correct === 'true') {
                    document.querySelector(`.game-btn-${i}`).classList.add('correct');
                } else {
                    document.querySelector(`.game-btn-${i}`).classList.add('wrong');
                }
            }

            // This will check and see if the user is on the final question or not. If they are then they'll see the Finish button, if not then they'll see the Next button.
            if (index != questions.length - 1) {
                nextBtn.classList.remove('hide');
            } else {
                finishBtn.classList.remove('hide');
            }
    
            // This will check which button the user clicked on. If they clicked on the correct answer then the card title will say correct and will give the player 5 points! 
            if (event.target.dataset.correct === 'true') {
                cardTitle.textContent = 'Correct!';
                score += 5;
            } 
            // But if the user is wrong, they will lose 5 points and be told they were wrong...
            else {
                cardTitle.textContent = 'Wrong...';
                interval -= 5;
                if (interval <= 0) {
                    interval = 0;
                    stopGame();
                }
            }
        }
    }
}

// Stop the game function
function stopGame() {

    // Stop the timer
    clearInterval(time);

    // Add up the user's score and add their remaining time to it
    var finalScore = score + interval;

    // If their final score is less than or equel to zero, they get a participation point!
    if (finalScore <= 0) {
        finalScore = 1;
    }

    // Save their final score to session storage so the other Javascript file can see it
    sessionStorage.setItem('fScore', finalScore)

    // Move the user over to the other HTML page
    window.location.href = "highscores.html";
}

// Hide the starting paragraph function
function hideStart() {
    startP.classList.add('hide');
    firstBtn.classList.add('hide');
    highscoreLink.classList.add('hide');
}

// Hide the instructions/github link
function hideInstructions() {
    instructions.classList.add('hide');
    startBtn.classList.add('hide');
    giantNum.classList.remove('hide');
    repoLink.classList.add('hide');
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
        question: 'Which NHL team had their Inaugural season in 2017-18?',
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
            {item: 'August  16th, 2006', true: false},
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
            {item: '2 for 1', true: false},
            {item: 'One for All', true: true},
            {item: '4 for 4', true: false}
        ]
    },
    {
        question: 'Who does Millie Bobby Brown play in the show Stranger Things?',
        answers: [
            {item: 'Eleven', true: true},
            {item: 'Twelve', true: false},
            {item: 'Seven', true: false},
            {item: 'Nine', true: false}
        ]
    },
    {
        question: `Who is Tanjiro's sister in the show Demon Slayer?`,
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
            {item: 'Jerry Stevens', true: false},
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
        question: 'Which NHL team was not apart of the Original 6?',
        answers: [
            {item: 'Pittsburgh Penguins', true: true},
            {item: 'New York Rangers', true: false},
            {item: 'Toronto Maple Leafs', true: false},
            {item: 'Chicago Blackhawks', true: false}
        ]
    }
]

// This line will make it so that the questions will appear in random order
questions.sort(() => Math.random() - 0.5);
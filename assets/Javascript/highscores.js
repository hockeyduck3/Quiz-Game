var cardTitle = document.querySelector('#cardH2');
var submitBtn = document.querySelector('.submit-btn');

// Variables for the addUser function
var userName = document.querySelector('#user-name');
var text = document.querySelector('.createScore');
var userScore = document.querySelector('#user-score');

// variables for the highscore list
var ul = document.querySelector('.ul');
var highScoreList = document.querySelector('.high-scores');

var error = document.querySelector('.error');

// This will set userList to an empty array and grab the final score from the other HTML page
var userList = [];
var finalScore = sessionStorage.getItem('fScore');

load();

//Event listener for the submit button
submitBtn.addEventListener('click', addUser);

function load() {
    var stored = JSON.parse(localStorage.getItem('highscores'));

    // If the user does not have any previous high scores then this will show the .noScores paragraph
    if (stored === null) {
        document.querySelector('.noScores').classList.remove('hide');
    } else {
        // If the user does have previous saved scores then this will loop through them and add them to the empty userList array
        for (var i = 0; i < stored.length; i++) {
            userList.push(stored[i]);
        }

        // This will sort the userList array by who had the highest score
        userList.sort(function(a, b){return b.highscore - a.highscore});

        // This loop will will go through the userList array and grab each item and appened it to the blank ul on the page
        for (var i = 0; i < userList.length; i++) {
            var li = document.createElement('li');
            li.textContent = `${userList[i].name} - Highscore: ${userList[i].highscore}`;
            ul.appendChild(li);
        }

        highScoreList.classList.remove('hide');
    }

    // If the user has a new highscore that they need to add
    if (finalScore !== null) {
        highScoreList.classList.add('hide');
        userScore.textContent = finalScore;

        text.classList.remove('hide');
        document.querySelector('.noScores').classList.add('hide');
    }
}

// Function to add new names to the highscore list
function addUser() {
    var user = userName.value.trim();
    user = user.toUpperCase();

    if (user.match(/[0-9]/)){
        error.textContent = 'Field cannot contain numbers';
        errorFunc();
    } 

    else if (user.value === '' || user.match(/[a-z]/i) == null) {
        error.textContent = 'Field cannot be empty';
        errorFunc();
    }

    else if (user.length > 3) {
        error.textContent = 'Max character length is 3';
        errorFunc();
    }

    // If the user doesn't get any errors then the code to add them to the high score list will run. 
    else {
        var highscores = {
            name: user,
            highscore: finalScore
        }

        userList.push(highscores);

        localStorage.setItem("highscores", JSON.stringify(userList));

        sessionStorage.removeItem('fScore');
 
        location.reload();
    }
}

function errorFunc() {
    // The code above will tell the error what to say, this function will display it's message.
    $('.error').hide().removeClass('hide');
    $('.error').slideDown('slow');
}

// Event listner for the Enter Your Initials input
userName.addEventListener('keydown', function(event) {
    if (!error.classList.contains('hide')) {
        $('.error').slideUp('slow');
    }

    // If the user clicks the 'Enter' key
    if (event.keyCode === 13){
        addUser();
    }
});
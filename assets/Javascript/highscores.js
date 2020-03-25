var cardTitle = document.querySelector('#cardH2');
var submitBtn = document.querySelector('.submit-btn');

// Variables for the addUser function
var userName = document.querySelector('#user-name');
var text = document.querySelector('.createScore');
var userScore = document.querySelector('#user-score');

// variables for the highscore list
var ul = document.querySelector('.ul');
var highScoreList = document.querySelector('.high-scores');

// Variable for the error message
var error = document.querySelector('.error');

// This will set userList to an empty array and grab the final score from the other HTML page
var userList = [];
var finalScore = sessionStorage.getItem('fScore');

// Trigger the load function
load();

//Event listener for the submit button
submitBtn.addEventListener('click', addUser);

// Loading function
function load() {

    // Grab the previous high scores from the local storage
    var stored = JSON.parse(localStorage.getItem("highscores"));

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

        // This will unhide the highscore list so the user can see
        highScoreList.classList.remove('hide');
    }

    // If the user has a new highscore that they need to add then it will hide the previous high scores and give them the text input screen so they can add their name to the list!
    if (finalScore !== null) {
        highScoreList.classList.add('hide');
        userScore.textContent = finalScore;

        text.classList.remove('hide');
        document.querySelector('.noScores').classList.add('hide');
    }
}

// Function to add new names to the highscore list
function addUser() {

    // This will get rid of any extra spaces that the user may have added on accident, and make their input all uppercase letters.
    var user = userName.value.trim();
    user = user.toUpperCase();

    // If the user tries to put use numbers in their name they will be met with an error
    if (user.match(/[0-9]/)){
        error.textContent = 'Field cannot contain numbers';
        errorFunc();
    } 
    // Or if the user tries to leave the field blank, or with a ton of spaces, they will be shown this error.
    else if (user.value === '' || user.match(/[a-z]/i) == null) {
        error.textContent = 'Field cannot be empty';
        errorFunc();
    }
    // Finally this is will check and see if the user's input is more than 3 characters long, if it is, they will be shown this error. 
    else if (user.length > 3) {
        error.textContent = 'Max character length is 3';
        errorFunc();
    }
    // If the user doesn't get any errors then the code to add them to the high score list will run. 
    else {
        
        // This will grab the user's input and their final score and set them to an object
        var highscores = {
            name: user,
            highscore: finalScore
        }

        // It will then add the newly made object and add it to the userList
        userList.push(highscores);

        // Set the list in local storage and stringify it using JSON
        localStorage.setItem("highscores", JSON.stringify(userList));

        // Delete the final score from the sessionStorage
        sessionStorage.removeItem('fScore');

        //Refresh the page 
        location.reload();
    }
}

function errorFunc() {
    // The code above will tell the error what to say, this function will display it's message.
    error.classList.remove('hide');
}

// Event listner for the Enter Your Initials input
userName.addEventListener('keypress', function(event) {
    // If an error is being displayed then this will make it leave once the users hits a key.
    if (error.classList.contains('hide') === false) {
        error.classList.add('hide');
    }

    // If the user clicks the 'Enter' key, then this will run the addUser function so they don't have to click the submit button.
    if (event.keyCode === 13){
        addUser();
    }
});
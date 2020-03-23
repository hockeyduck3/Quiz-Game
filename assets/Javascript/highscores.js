var cardTitle = document.querySelector('#cardH2');
var submitBtn = document.querySelector('.submit-btn');
var userName = document.querySelector('#user-name');
var text = document.querySelector('.createScore');
var userScore = document.querySelector('#user-score');
var ul = document.querySelector('.ul');
var highScoreList = document.querySelector('.high-scores');

var userList = [];
var finalScore = sessionStorage.getItem('fScore');

load();
submitBtn.addEventListener('click', addUser);

function load() {
    var stored = JSON.parse(localStorage.getItem("highscores"));

    if (stored === null) {
        document.querySelector('.noScores').classList.remove('hide');
    } else {
        for (var i = 0; i < stored.length; i++) {
            userList.push(stored[i]);
        }

        userList.sort(function(a, b){return b.highscore - a.highscore});

        for (var i = 0; i < userList.length; i++) {
            var li = document.createElement('li');
            li.textContent = `${userList[i].name} - Highscore: ${userList[i].highscore}`;
            ul.appendChild(li);
        }

        highScoreList.classList.remove('hide');
    }

    if (finalScore !== null) {
        highScoreList.classList.add('hide');
        userScore.textContent = finalScore;

        text.classList.remove('hide');
        document.querySelector('.noScores').classList.add('hide');
    }

}

function addUser() {
    if (userName.value === '') {
        alert(`Please enter a name in the Initials field`)
    } else {
        var user = userName.value.trim();
        var li = document.createElement('li');
        li.textContent = `${user} - Highscore: ${finalScore}`;
        ul.appendChild(li);

        var highscores = {
            name: `${user}`,
            highscore: finalScore
        }

        userList.push(highscores);
        text.classList.add('hide');
        highScoreList.classList.remove('hide');

        localStorage.setItem("highscores", JSON.stringify(userList));
        sessionStorage.removeItem('fScore');
    }
}
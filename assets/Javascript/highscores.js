var cardTitle = document.querySelector('#cardH2');
var submitBtn = document.querySelector('.submit-btn');
var userName = document.querySelector('#user-name');

// load();
submitBtn.addEventListener('click', addUser);

function load() {
    var finalScore = sessionStorage.getItem('fScore');
    var stored = JSON.parse(localStorage.getItem("highscores"));

    if (finalScore !== null) {
        var userList = [];
        var ul = document.createElement('ul');
    }

    if (stored === null) {
        document.querySelector('.noScores').classList.remove('hide');
    }
}

function addUser() {
    if (userName.value === '') {
        alert(`Please enter a name in the Initials field`)
    } else {
        var user = userName.value.trim();
    }
}
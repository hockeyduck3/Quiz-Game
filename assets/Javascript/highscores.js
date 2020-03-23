var cardTitle = document.querySelector('#cardH2');

// load();

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

function addUser(event) {
    event.preventDefault();
}
var startP = document.querySelector('.startParagraph');
var startBtn = document.querySelector('.start-btn');

startBtn.addEventListener('click', startFunc);

function startFunc() {
    startP.classList.add('hide');
    startBtn.classList.add('hide');
}
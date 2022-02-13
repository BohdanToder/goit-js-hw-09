const bodyRef = document.querySelector('body');
const buttonStartRef = document.querySelector('[data-start]');
const buttonStopRef = document.querySelector('[data-stop]');

let intervalId = null;

buttonStartRef.addEventListener('click', startInterval);
buttonStopRef.addEventListener('click', stopInterval);


function startInterval() { 
    changeBgColor();
    intervalId = setInterval(changeBgColor, 1000);
    buttonStartRef.disabled = true;
    buttonStopRef.disabled = false;
}

function stopInterval () { 
    clearInterval(intervalId);
    buttonStartRef.disabled = false;
    buttonStopRef.disabled = true;
}

function changeBgColor() {
bodyRef.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
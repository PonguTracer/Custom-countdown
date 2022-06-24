const inputContainer = document.getElementById('input-container');
const countDownForm = document.getElementById('countdownForm');
const dateEle = document.getElementById('date-picker');
const countDownEle = document.getElementById('countdown');
const countDownEleTitle = document.getElementById('countdown-title');
const countDownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEle = document.getElementById('complete');
const completeEleInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countDownTitle = '';
let countDownDate = '';
let countDownValue = Date;
let countDownActive;
let savedCountDown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEle.setAttribute('min', today);

// Populate CountDown  / Complete UI
function updateDOM() {
   countDownActive = setInterval(() =>  {
    const now = new Date().getTime();
    const distance = countDownValue - now;
    
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);


    // Hide input
    inputContainer.hidden = true;

    // If the countdown has ended, show complete
    if (distance < 0) {
        countDownEle.hidden = true;
        clearInterval(countDownActive);
        completeEleInfo.textContent = `${countDownTitle} finished on ${countDownDate}`;
        completeEle.hidden = false;
    } else {
        // Populate Countdown
        countDownEleTitle.textContent = `${countDownTitle}`;
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;
        completeEle.hidden = true;
        countDownEle.hidden = false;
    }

   }, second);
};

// Take Values from Form Input
function upDateCountDown(e) {
    e.preventDefault();
    countDownTitle = e.srcElement[0].value;
    countDownDate = e.srcElement[1].value;
    savedCountDown = {
        title: countDownTitle,
        date: countDownDate,
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountDown));
      // Check for valid date
    if (countDownDate === '') {
        alert('Please select a date for the countdown')
    } else {
    // Get number version of current date, updateDOM
    countDownValue = new Date(countDownDate).getTime();
    updateDOM();
    }
}

// Reset All Values
function reset () {
    // Hide Countdowns, show input
    countDownEle.hidden = true;
    completeEle.hidden = true;
    inputContainer.hidden = false;
    // Stop Countdown
    clearInterval(countDownActive);
    // Reset values
    countDownTitle = '';
    countDownDate = '';
    localStorage.removeItem('countdown');
}

function restorePreviousCountDown() {
    // Get countdown from localstorage if available
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountDown = JSON.parse(localStorage.getItem('countdown'));
        countDownTitle = savedCountDown.title;
        countDownDate = savedCountDown.date;
        countDownValue = new Date(countDownDate).getTime();
        updateDOM();
    }
}
// Event Listener
countDownForm.addEventListener('submit', upDateCountDown);
countDownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On Load, check localStorage
restorePreviousCountDown();

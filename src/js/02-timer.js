import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const buttonStartRef = document.querySelector('[data-start]');
const inputDatetimePickerRef = document.querySelector('#datetime-picker');
const daysSpanRef = document.querySelector('[data-days]');
const hoursSpanRef = document.querySelector('[data-hours]');
const minutesSpanRef = document.querySelector('[data-minutes]');
const secondsSpanRef = document.querySelector('[data-seconds]');

let selectedDate;
let intervalId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];

        if (selectedDate <= options.defaultDate) {
            Notify.failure('Please choose a date in the future');
            return;
        }

        buttonStartRef.disabled = false;
    },
};

flatpickr(inputDatetimePickerRef, options);

buttonStartRef.addEventListener('click', onButtonStartClick);

function onButtonStartClick() {
    intervalId = setInterval(() => {
        const currentDatetime = new Date()
        const datetimeDifference = selectedDate - currentDatetime;
        const datetimeComponents = convertMs(datetimeDifference);

        if (selectedDate <= currentDatetime) {
            clearInterval(intervalId);
            return;
        }

        updateTimer(datetimeComponents);
    }, 1000);

}

function updateTimer({ days, hours, minutes, seconds }) {
    daysSpanRef.textContent = addLeadingZero(days);
    hoursSpanRef.textContent = addLeadingZero(hours);
    minutesSpanRef.textContent = addLeadingZero(minutes);
    secondsSpanRef.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}
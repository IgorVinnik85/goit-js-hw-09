import { Notify } from "notiflix/build/notiflix-notify-aio";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const myInput = document.querySelector("#datetime-picker");
// console.log(myInput);
const btnStart = document.querySelector("[data-start]");
// console.log(btnStart);
const timerValues = document.querySelectorAll(".value");
// console.log(timerValues);
btnStart.setAttribute("disabled", true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if (selectedDates[0] > Date.now()) {
      btnStart.removeAttribute("disabled", false);
    } else if (selectedDates[0] < Date.now()) {
      Notify.failure("Please choose a date in the future", {
        width: "1360px",
        svgSize: "320px",
        fontSize: "80px",
        position: "center-center",
      });
    }

    btnStart.addEventListener("click", () => {
      if (selectedDates[0] > Date.now()) {
        timeValue(selectedDates[0]);
      }
    });
  },
};

flatpickr(myInput, options);

function timeValue(value) {
  const timer = {
    start() {
      const endTime = value;
      // console.log(endTime);

      const set = setInterval(() => {
        const currentTime = Date.now();
        // console.log(currentTime);
        const timeDifference = endTime - currentTime;
        const time = convertMs(timeDifference);
        // console.log(time);
        createDisplay(time);
        if (
          time.seconds == 0 &&
          time.minutes == 0 &&
          time.hours == 0 &&
          time.days == 0
        ) {
          clearInterval(set);
        }
        scaleNumber();
      }, 1000);
      if (set !== 0) {
        btnStart.setAttribute("disabled", true);
      }
    },
  };
  timer.start();
}

let num = 1;

function scaleNumber() {
  if (num === 1) {
    num += 1;
  } else if (num === 2) {
    num -= 1;
  }
  return num;
}


function createDisplay({ days, hours, minutes, seconds }) {
  for (let i = 0; i <= timerValues.length; i += 1) {
    timerValues[0].textContent = days;
    timerValues[0].style.transform = `scale(${num})`;
    
    timerValues[1].textContent = hours;
    timerValues[1].style.transform = `scale(${num})`;
    
    timerValues[2].textContent = minutes;
    timerValues[2].style.transform = `scale(${num})`;
    
    timerValues[3].textContent = seconds;
    timerValues[3].style.transform = `scale(${num})`;
  }
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

const btnStart = document.querySelector("[data-start]");
// console.log(btnStart);
const btnStop = document.querySelector("[data-stop]");
// console.log(btnStop);
const body = document.querySelector("body");

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;

btnStart.addEventListener("click", changeColor);

function changeColor() {
  btnStart.setAttribute("disabled", true);
  btnStop.removeAttribute("disabled", false);
  timerId = setInterval(changeBackgroundColor, 1000);
}

function changeBackgroundColor() {
  body.style.backgroundColor = getRandomHexColor();
}

btnStop.addEventListener("click", stopChangeColor);

function stopChangeColor() {
  clearInterval(timerId);

  btnStart.removeAttribute("disabled", false);
  btnStop.setAttribute("disabled", true);
}

// ====================================================
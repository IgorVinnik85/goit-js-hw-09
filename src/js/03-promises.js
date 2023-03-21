import { Notify } from "notiflix/build/notiflix-notify-aio";
const form = document.querySelector(".form");

form.addEventListener("submit", getPromises);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function getPromises(event) {
  event.preventDefault();

  if (
    event.target.elements.delay.value === '' ||
    event.target.elements.step.value === '' ||
    event.target.elements.amount.value === ''
  ) {
    Notify.failure("Fill the fields, please");
    return;
  }

  let delay = +event.target.elements.delay.value;
  const step = +event.target.elements.step.value;
  const amount = +event.target.elements.amount.value;
  
  event.target.reset()

  for (let index = 1; index <= amount; index += 1) {
    createPromise(index, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

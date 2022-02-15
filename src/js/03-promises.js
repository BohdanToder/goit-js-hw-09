import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('form');

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const amount = Number(formRef.elements.amount.value);
  const step = Number(formRef.elements.step.value);
  let delay = Number(formRef.elements.delay.value);

  for (let i = 1; i <= amount; i += 1) {
    let position = i;

    createPromise(position, delay)
    .then(({ position, delay }) => {
      Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    });

    position += 1;
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

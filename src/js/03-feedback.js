import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInput, 500));
const val = {};

function onInput(e) {
  const name = e.target.name;
  val[name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(val));
  if (name === 'email') {
    val.message = form.querySelector('textarea').textContent;
  } else {
    val.email = form.querySelector('input').value;
  }
}

function onFormSubmit(event) {
  const data = {};
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const FEEDBACK = 'feedback-form-state';

  formData.forEach((val, name) => {
    data[name] = val;
    if (val === '') {
      return window.alert('всі поля повинні бути заповнені');
    }
  });
  if (data.email !== '' && data.password !== '') {
    console.log(localStorage.getItem(JSON.parse(FEEDBACK)));
    localStorage.removeItem(FEEDBACK);
    form.reset();
  }
}
const valLocalStorage = localStorage.getItem(FEEDBACK);

if (valLocalStorage) {
  const object = JSON.parse(valLocalStorage);
  if (object.email) {
    form.querySelector('input').value = object.email;
  }
  if (object.message) {
    form.querySelector('textarea').textContent = object.message;
  }
}

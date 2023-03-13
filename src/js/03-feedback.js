import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInput, 500));
const val = {};

function onInput(e) {
  const name = e.target.name;
  val[name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(val));
}

function onFormSubmit(event) {
  const data = {};
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  formData.forEach((val, name) => {
    data[name] = val;
    if (val === '') {
      return window.alert('всі поля повинні бути заповнені');
    }
  });
  if (data.email !== '' && data.password !== '') {
    console.log(localStorage.getItem('feedback-form-state'));
    localStorage.removeItem('feedback-form-state');
    form.reset();
  }
}
const valLocalStorage = localStorage.getItem('feedback-form-state');
if (valLocalStorage) {
  const object = JSON.parse(valLocalStorage);
  if (object.email) {
    form.querySelector('input').value = object.email;
  }
  if (object.message) {
    form.querySelector('textarea').textContent = object.message;
  }
}

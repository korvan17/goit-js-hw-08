import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

function setTimeToLocalStorage(e) {
  localStorage.setItem('videoplayer-current-time', e.seconds);
}

player.on('timeupdate', throttle(setTimeToLocalStorage, 1000));

const timeStart = localStorage.getItem('videoplayer-current-time');

player
  .setCurrentTime(timeStart)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });

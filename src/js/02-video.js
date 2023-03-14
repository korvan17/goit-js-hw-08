import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const VIMEO_SECONDS = 'videoplayer-current-time';

function setTimeToLocalStorage(e) {
  localStorage.setItem(VIMEO_SECONDS, e.seconds);
}

player.on('timeupdate', throttle(setTimeToLocalStorage, 1000));

const timeStart = localStorage.getItem(VIMEO_SECONDS);

if (timeStart) {
  player.setCurrentTime(timeStart);
}

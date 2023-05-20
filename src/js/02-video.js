import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Vimeo(iframe);

const KEY_STORAGE = 'videoplayer-current-time';

const savedTime = localStorage.getItem(KEY_STORAGE);

if (savedTime) {
  player.setCurrentTime(savedTime);
}
player.on(
  'timeupdate',
  throttle(() => {
    const currentTime = player.getCurrentTime();
    localStorage.setItem(KEY_STORAGE, currentTime);
  }, 1000)
);

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

const saveCurrentTime = time => {
  localStorage.setItem('videoplayer-current-time', time);
};

const getCurrentTime = () => {
  return localStorage.getItem('videoplayer-current-time');
};

player.on(
  'timeupdate',
  throttle(event => {
    const currentTime = event.seconds;
    saveCurrentTime(currentTime);
  }, 1000)
);

const storedTime = getCurrentTime();
if (storedTime) {
  player.setCurrentTime(storedTime);
}

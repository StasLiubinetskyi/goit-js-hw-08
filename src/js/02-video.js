import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

const THROTTLE_DELAY = 1000; // 1 second
const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

// Отримання збереженого часу відтворення з локального сховища
function getSavedTime() {
  const savedTime = localStorage.getItem(LOCAL_STORAGE_KEY);
  return savedTime ? parseFloat(savedTime) : 0;
}

// Збереження поточного часу відтворення у локальне сховище
function saveTime(time) {
  localStorage.setItem(LOCAL_STORAGE_KEY, time.toString());
}

// Встановлення часу відтворення після завантаження сторінки
function restoreTime() {
  const savedTime = getSavedTime();
  player.setCurrentTime(savedTime).catch(error => {
    if (error.name === 'RangeError') {
      // Обробка помилки, якщо збережений час виходить за межі відео
      console.error('Invalid saved time:', savedTime);
    } else {
      console.error('Error restoring time:', error);
    }
  });
}

// Відстежування події оновлення часу відтворення з певною затримкою
const throttledSaveTime = throttle(time => {
  saveTime(time);
}, THROTTLE_DELAY);

// Оновлення часу відтворення при зміні
player.on('timeupdate', event => {
  const currentTime = event.seconds;
  throttledSaveTime(currentTime);
});

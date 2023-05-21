import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
const galleryRef = document.querySelector('.gallery');
const createGalleryItem = ({ preview, original, description }) => {
  return `  
     <li class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
};
const makeGalleryItemMarup = galleryItems.map(createGalleryItem).join('');
galleryRef.insertAdjacentHTML('beforeend', makeGalleryItemMarup);
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

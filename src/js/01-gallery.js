import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line

import { galleryItems } from './gallery-items';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
function createGalleryItemMarkup({ preview, original, description }) {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          alt="${description}"
        />
      </a>
    </li>
  `;
}
function renderGalleryItems() {
  const galleryMarkup = galleryItems
    .map(item => createGalleryItemMarkup(item))
    .join('');
  galleryContainer.innerHTML = galleryMarkup;
}
renderGalleryItems();
const gallery = new SimpleLightbox('.gallery__item a', {
  captions: true,
  captionDelay: 250,
  captionsData: 'alt',
  captionPosition: 'top',
});
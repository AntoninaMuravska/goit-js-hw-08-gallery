import images from "./gallery-items.js";

const galleryListRef = document.querySelector('.gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const modalImg = document.querySelector('.lightbox__image');;
const btnClose = document.querySelector('.lightbox__button');
const lightboxOverlay = document.querySelector('.lightbox__overlay');

// создаем шаблонную строку
const createGalleryHtml = ({ preview, original, description }) => {
    return `<li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`;
  }
// добавляем строку в ДОМ
const createGalleryMurkup = images.map(createGalleryHtml).join('');
// console.log(createGalleryMurkup);

galleryListRef.insertAdjacentHTML('beforeend', createGalleryMurkup);

// вешаем слушателя на ul
galleryListRef.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(event) {
  event.preventDefault();
  const isSwatchImageEl = event.target.classList.contains('gallery__image'); // целевой элемент
  const originalImageUrl = event.target.dataset.source; //получаем url большого изображения

  if (!isSwatchImageEl) {
    return;
  }
  
  openModal(); // при нажатии на элемент добавляем класс открытия модального окна
  modalImg.src = originalImageUrl; // подмена значений
  modalImg.alt = event.target.alt;
 
}

function openModal() {
  window.addEventListener('keydown', onPressEscape);
  lightboxRef.classList.add('is-open');
}

btnClose.addEventListener('click', closeModal)

function closeModal() {
   window.removeEventListener('keydown', onPressEscape);
  lightboxRef.classList.remove('is-open');
  modalImg.src = '';
  modalImg.alt = '';
}

lightboxOverlay.addEventListener('click', onLightboxEvent)

function onLightboxEvent(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
      closeModal();
    }
}

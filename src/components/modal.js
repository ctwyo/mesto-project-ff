import { resetForm } from '../index';

const popups = document.querySelectorAll('.popup');

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEscape);
  resetForm();
}

function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
    resetForm();
  }
}

function closePopupByClick() {
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target === popup) {
        closePopup(popup);
      }
    });
  });
}

closePopupByClick();

export { openPopup, closePopup, closePopupByEscape };

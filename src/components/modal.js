function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEscape);
}

function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function closePopupByClick(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    closePopup(evt.currentTarget)
  }
}

export { openPopup, closePopup, closePopupByEscape, closePopupByClick };

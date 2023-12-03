import { openPopup } from './modal';
import { imagePopup } from '../index';

const arhiz = new URL(
  'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
);
const chelyaba = new URL(
  'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
);
const ivanovo = new URL(
  'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
);
const kamchatka = new URL(
  'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
);
const holmogorskiy = new URL(
  'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
);
const baikal = new URL(
  'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
);

export const initialCards = [
  {
    name: 'Архыз',
    link: arhiz,
  },
  {
    name: 'Челябинская область',
    link: chelyaba,
  },
  {
    name: 'Иваново',
    link: ivanovo,
  },
  {
    name: 'Камчатка',
    link: kamchatka,
  },
  {
    name: 'Холмогорский район',
    link: holmogorskiy,
  },
  {
    name: 'Байкал',
    link: baikal,
  },
];

function createCard(card, handleDeleteCard, handleClickImage, handleLikeCard) {
  const template = document.querySelector('#card-template').content;
  const cardElement = template.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  deleteButton.addEventListener('click', handleDeleteCard);
  cardImage.addEventListener('click', handleClickImage);
  likeButton.addEventListener('click', handleLikeCard);

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  return cardElement;
}

function handleDeleteCard(event) {
  event.target.closest('.card').remove();
}

function handleLikeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function handleClickImage(event) {
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');
  openPopup(imagePopup);
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;
  popupCaption.textContent = event.target.alt;
}

export { createCard, handleDeleteCard, handleLikeCard, handleClickImage };

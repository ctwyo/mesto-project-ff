import './pages/index.css';
import { initialCards } from './components/cards';
import {
  createCard,
  handleDeleteCard,
  handleLikeCard,
} from './components/card';
import { openPopup, closePopup, closePopupByClick } from './components/modal';

// @todo: Темплейт карточки
const cardsContainer = document.querySelector('.places__list');
const forms = document.querySelectorAll('form');

//edit form
const editProfileForm = document.forms['edit-profile'];
const title = editProfileForm.elements.name;
const description = editProfileForm.elements.description;

//add new card form
const newCardForm = document.forms['new-place'];
const placeName = newCardForm.elements['place-name'];
const link = newCardForm.elements.link;

//profile values
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__description');

//buttons
const profileEditButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

// popups
const popups = document.querySelectorAll('.popup');
const profileEditPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

//попап по клику на картинку
function handleClickImage(event) {
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');
  openPopup(imagePopup);
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;
  popupCaption.textContent = event.target.alt;
}

//сбросить форму
function resetForm(form) {
  form.reset()
}

// submit PROFILE
function editProfileFormSubmit(evt) {
  evt.preventDefault();
  nameInput.textContent = title.value;
  jobInput.textContent = description.value;
  closePopup(profileEditPopup);
}

//submit NEW CARD
function newCardFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: placeName.value,
    link: link.value,
  };
  cardsContainer.prepend(
    createCard(card, handleDeleteCard, handleClickImage, handleLikeCard)
  );
  closePopup(newCardPopup);
}

// слушатели закрытия popup по overlay
popups.forEach((popup) => {
  popup.addEventListener('click', closePopupByClick);
})

//слушатели закрытия попап по крестику
closeButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    // const popup = evt.target.closest('.popup');
    // closePopup(popup);
    popups.forEach((popup) => {
      closePopup(popup)
    })////////////////////////////////////////////////////как лучше, пройтись по всем попапам или оставить как было
  });
});

//Обработчики
profileEditButton.addEventListener('click', () => {
  editProfileForm.reset();
  openPopup(profileEditPopup);
  title.value = nameInput.textContent;
  description.value = jobInput.textContent;
});

addNewCardButton.addEventListener('click', () => {
  newCardForm.reset();
  openPopup(newCardPopup);
});

editProfileForm.addEventListener('submit', editProfileFormSubmit);

newCardForm.addEventListener('submit', newCardFormSubmit);

// @todo: Вывести карточки на страницу
function renderCards(cards) {
  cards.forEach((card) => {
    const newCard = createCard(
      card,
      handleDeleteCard,
      handleClickImage,
      handleLikeCard
    );
    cardsContainer.append(newCard);
  });
}
// @todo: Вывести карточки на страницу
renderCards(initialCards);

export { resetForm, handleClickImage };

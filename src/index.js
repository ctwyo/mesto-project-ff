import './pages/index.css';
import { initialCards } from './components/cards';
import {
  createCard,
  handleDeleteCard,
  handleLikeCard,
  handleClickImage,
} from './components/cards';
import { openPopup, closePopup } from './components/modal';
// @todo: Темплейт карточки
const cardsContainer = document.querySelector('.places__list');
const forms = document.querySelectorAll('form');

//edit form
const editForm = document.forms['edit-profile'];
const title = editForm.elements.name;
const description = editForm.elements.description;

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

const profileEditPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

//сбросить форму
function resetForm() {
  forms.forEach((form) => {
    form.reset();
  });
}

// submit PROFILE
function editProfileFormSubmit(evt) {
  evt.preventDefault();
  nameInput.textContent = title.value;
  jobInput.textContent = description.value;
  const popup = evt.target.closest('.popup');
  closePopup(popup);
  editForm.reset();
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
  const popup = evt.target.closest('.popup');
  closePopup(popup);
}

//слушатели закрытия popup по overlay
// popups.forEach((popup) => {
//   popup.addEventListener('click', (evt) => {
//     if (evt.target === popup) {
//       closePopup(popup)
//     }
//   })
// })

//слушатели закрытия попап по крестику
closeButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    const popup = evt.target.closest('.popup');
    closePopup(popup);
  });
});

//Обработчики
profileEditButton.addEventListener('click', () => {
  openPopup(profileEditPopup);
  title.value = nameInput.textContent;
  description.value = jobInput.textContent;
});

addNewCardButton.addEventListener('click', () => {
  openPopup(newCardPopup);
});

editForm.addEventListener('submit', editProfileFormSubmit);

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

export { openPopup, resetForm, imagePopup };

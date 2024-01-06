import './pages/index.css';
import {
  createCard,
  changeLike
} from './components/card';
import { openPopup, closePopup, closePopupByClick } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import {
  getInitialInfo,
  updateProfile,
  postNewCard,
  deleteCard,
  updateAvatar,
  putLikeCard,
  deleteLikeCard
} from './components/api'

// @todo: Темплейт карточки
const cardsContainer = document.querySelector('.places__list');

//edit form
const editProfileForm = document.forms['edit-profile'];
const title = editProfileForm.elements.name;
const description = editProfileForm.elements.description;
const editProfileSubmitButton = editProfileForm.querySelector('button[type="submit"]');

//add new card form
const newCardForm = document.forms['new-place'];
const placeName = newCardForm.elements['place-name'];
const link = newCardForm.elements.link;
const newCardSubmitButton = newCardForm.querySelector('button[type="submit"]');

//avatar form
const avatarForm = document.forms['new-avatar'];
const avatarLink = avatarForm.elements['avatar'];
const avatarSubmitButton = avatarForm.querySelector('button[type="submit"]');

//profile values
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

//buttons
const profileEditButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

// popups
const popups = document.querySelectorAll('.popup');
const profileEditPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const avatarPopup = document.querySelector('.popup__type_avatar');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}
//validation
enableValidation(validationConfig)

//попап по клику на картинку
function handleClickImage(event) {
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');
  openPopup(imagePopup);
  popupImage.src = event.target.src;
  popupImage.alt = event.target.alt;
  popupCaption.textContent = event.target.alt;
}

// submit PROFILE
function editProfileFormSubmit(evt) {
  evt.preventDefault();
  loadingIndicator(true, editProfileSubmitButton);
  updateProfile({
    name: editProfileForm.name.value,
    about: editProfileForm.description.value
  })
    .then((newProfile) => {
      fillUserInfo(newProfile)
      closePopup(profileEditPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      loadingIndicator(false, editProfileSubmitButton);
    })
}

//submit NEW CARD
function newCardFormSubmit(evt) {
  evt.preventDefault();
  loadingIndicator(true, newCardSubmitButton)
  const card = {
    name: placeName.value,
    link: link.value,
  };
  postNewCard(card)
    .then((newCard) => {
      const userId = newCard.owner._id;
      cardsContainer.prepend(
        createCard(newCard, userId, handleDeleteCard, handleClickImage, handleLikeCard)
      );
      closePopup(newCardPopup)
    })
    .catch((err) => console.log('Error: ',err))
    .finally(() => {
      loadingIndicator(false, newCardSubmitButton)
    })
}

function avatarFormSubmit(evt) {
  evt.preventDefault();
  loadingIndicator(true, avatarSubmitButton)
  const link = avatarLink.value;
  updateAvatar(link)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;
      closePopup(avatarPopup)
    })
    .catch((err) => console.log('Error: ', err))
    .finally(() => {
      loadingIndicator(false, avatarSubmitButton)
    })
}

// слушатели закрытия popup по overlay
popups.forEach((popup) => {
  popup.addEventListener('click', closePopupByClick);
})

//слушатели закрытия попап по крестику
closeButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    popups.forEach((popup) => {
      closePopup(popup)
    })
  });
});

profileAvatar.addEventListener('click', () => {
  openPopup(avatarPopup);
})

//Обработчики на кнопки открытия попапов
profileEditButton.addEventListener('click', () => {
  clearValidation(editProfileForm, validationConfig);
  editProfileForm.reset();
  openPopup(profileEditPopup);
  title.value = profileName.textContent;
  description.value = profileDescription.textContent;
});

addNewCardButton.addEventListener('click', () => {
  newCardForm.reset();
  clearValidation(newCardForm, validationConfig);
  openPopup(newCardPopup);
});

profileAvatar.addEventListener('click', () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
})

editProfileForm.addEventListener('submit', editProfileFormSubmit);

newCardForm.addEventListener('submit', newCardFormSubmit);

avatarForm.addEventListener('submit', avatarFormSubmit);

// @todo: Вывести карточки на страницу
export function renderCards(cards, userId) {
  cards.forEach((card) => {
    const newCard = createCard(
      card,
      userId,
      handleDeleteCard,
      handleClickImage,
      handleLikeCard,
    );
    cardsContainer.append(newCard);
  });
}

export function handleLikeCard(status, cardId, card, likesText, likeButton) {
  return status
    ? deleteLikeCard(cardId)
      .then((res) => {
        changeLike(card, res.likes, likesText, likeButton)
      })
      .catch(err => console.log('Error when delete like',err))
    : putLikeCard(cardId)
      .then((res) => {
        changeLike(card, res.likes, likesText, likeButton)
      })
      .catch(err => console.log('Error when put like',err))
}

function handleDeleteCard(cardId, evt) {
  deleteCard(cardId);
  evt.target.closest('.card').remove();
}


function fillUserInfo(userInfo) {
  profileName.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
}

function loadingIndicator(loading, button) {
  if (loading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

// @todo: Вывести карточки на страницу

getInitialInfo()
  .then((res) => {
    const initialCards = res[1];
    const userInfo = res[0]
    const userId = userInfo._id;
    renderCards(initialCards, userId);
    fillUserInfo(userInfo);
  })

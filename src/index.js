import './pages/index.css';
import {
  createCard,
  changeLike,
  deleteCardFromDOM
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

const cardsContainer = document.querySelector('.places__list');

//edit profile popup
const popupProfile = document.querySelector('.popup_type_edit');
const popupProfileForm = document.forms['edit-profile'];
const popupProfileName = popupProfileForm.elements.name;
const popupProfileDescription = popupProfileForm.elements.description;
const buttonSubmitProfileForm = popupProfileForm.querySelector('button[type="submit"]');

//add new card popup
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardForm = document.forms['new-place'];
const popupNewCardName = popupNewCardForm.elements['place-name'];
const popupNewCardLink = popupNewCardForm.elements.link;
const buttonSubmitNewCardForm = popupNewCardForm.querySelector('button[type="submit"]');

//avatar popup
const popupAvatar = document.querySelector('.popup__type_avatar');
const popupAvatarForm = document.forms['new-avatar'];
const popupAvatarLink = popupAvatarForm.elements['avatar'];
const buttonSubmitAvatar = popupAvatarForm.querySelector('button[type="submit"]');

//profile values
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

//buttons
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const buttonsClosePopup = document.querySelectorAll('.popup__close');

// popups
const popups = document.querySelectorAll('.popup');


// image popup
const popupImage = document.querySelector('.popup_type_image');
const popupImageLink = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
}

//validation
enableValidation(validationConfig)

//попап по клику на картинку
function handleClickImage(name, link) {
  openPopup(popupImage);
  popupImageLink.src = link;
  popupImageLink.alt = name;
  popupImageCaption.textContent = name;
}

// submit PROFILE
function submitProfileForm(evt) {
  evt.preventDefault();
  loadingIndicator(true, buttonSubmitProfileForm);
  updateProfile({
    name: popupProfileForm.name.value,
    about: popupProfileForm.description.value
  })
    .then((newProfile) => {
      fillUserInfo(newProfile)
      closePopup(popupProfile);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      loadingIndicator(false, buttonSubmitProfileForm);
    })
}

//submit NEW CARD
function submitNewCardForm(evt) {
  evt.preventDefault();
  loadingIndicator(true, buttonSubmitNewCardForm)
  const card = {
    name: popupNewCardName.value,
    link: popupNewCardLink.value,
  };
  postNewCard(card)
    .then((newCard) => {
      const userId = newCard.owner._id;
      cardsContainer.prepend(
        createCard(newCard, userId, handleDeleteCard, handleClickImage, handleLikeCard)
      );
      closePopup(popupNewCard)
    })
    .catch((err) => console.log('Error: ',err))
    .finally(() => {
      loadingIndicator(false, buttonSubmitNewCardForm)
    })
}

function submitAvatarForm(evt) {
  evt.preventDefault();
  loadingIndicator(true, buttonSubmitAvatar)
  const link = popupAvatarLink.value;
  updateAvatar(link)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;
      closePopup(popupAvatar)
    })
    .catch((err) => console.log('Error: ', err))
    .finally(() => {
      loadingIndicator(false, buttonSubmitAvatar)
    })
}

// слушатели закрытия popup по overlay
popups.forEach((popup) => {
  popup.addEventListener('click', closePopupByClick);
})

//слушатели закрытия попап по крестику
buttonsClosePopup.forEach((button) => {
  button.addEventListener('click', (evt) => {
    popups.forEach((popup) => {
      closePopup(popup)
    })
  });
});

profileAvatar.addEventListener('click', () => {
  openPopup(popupAvatar);
})

//Обработчики на кнопки открытия попапов
buttonEditProfile.addEventListener('click', () => {
  clearValidation(popupProfileForm, validationConfig);
  popupProfileForm.reset();
  openPopup(popupProfile);
  popupProfileName.value = profileName.textContent;
  popupProfileDescription.value = profileDescription.textContent;
});

buttonAddNewCard.addEventListener('click', () => {
  popupNewCardForm.reset();
  clearValidation(popupNewCardForm, validationConfig);
  openPopup(popupNewCard);
});

profileAvatar.addEventListener('click', () => {
  popupAvatarForm.reset();
  clearValidation(popupAvatarForm, validationConfig);
})

popupProfileForm.addEventListener('submit', submitProfileForm);

popupNewCardForm.addEventListener('submit', submitNewCardForm);

popupAvatarForm.addEventListener('submit', submitAvatarForm);

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

function handleDeleteCard(cardId, cardElement) {
  deleteCard(cardId)
    .then(() => {
      deleteCardFromDOM(cardElement)
    })
    .catch(err => console.log('Error while delete card', err))
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
  .catch((err) => console.log('Error while getInitialInfo', err))

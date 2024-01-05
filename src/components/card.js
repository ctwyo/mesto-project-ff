import { putLikeCard, deleteLikeCard } from "./api";

function createCard(card, userId, handleDeleteCard, handleClickImage, handleLikeCard) {
  const template = document.querySelector('#card-template').content;
  const cardElement = template.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikes = cardElement.querySelector('.card__likes');
  const cardId = card._id;

  cardImage.addEventListener('click', handleClickImage);
  likeButton.addEventListener('click', (evt) => {
    handleLikeCard(card, evt, userId);
  });

  // кто то попытался загрузить картинку через 'https://nomoreparties.co/v1/wff-cohort-4/users/me'
  //бесит что не картинки
  const errorCardLink = 'https://nomoreparties.co/v1/wff-cohort-4/users/me'
  if (card.link === errorCardLink) {
    card.link = 'https://proprikol.ru/wp-content/uploads/2020/11/kartinki-oshibki-31.jpg'
  }

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardLikes.textContent = card.likes.length;

  const isLiked = card.likes.some((like) => like._id === userId)
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (card.owner._id != userId) {
    deleteButton.remove()
  } else {
    deleteButton.addEventListener('click', (evt) => {
      handleDeleteCard(cardId, evt);
    });
  }

  return cardElement;
}

function handleLikeCard(card, evt, userId) {
  const isLiked = card.likes.some((like) => like._id === userId)
  const button = evt.target.closest('.card__like-button');
  const cardElement = evt.target.closest('.card');
  const likes = cardElement.querySelector('.card__likes');
  if (isLiked) {
    deleteLikeCard(card._id)
      .then((updatedCard) =>{
        button.classList.toggle('card__like-button_is-active');
        likes.textContent = updatedCard.likes.length
        card.likes = updatedCard.likes;
      })
      .catch((err) => console.log('Error: ', err))

  } else {
    putLikeCard(card._id)
      .then((updatedCard) => {
        button.classList.toggle('card__like-button_is-active');
        likes.textContent = updatedCard.likes.length
        card.likes = updatedCard.likes;
      })
      .catch((err) => console.log('Error: ', err))
  }
}

export { createCard, handleLikeCard };

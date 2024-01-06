export function createCard(card, userId, handleDeleteCard, handleClickImage, handleLikeCard) {
  const template = document.querySelector('#card-template').content;
  const cardElement = template.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikes = cardElement.querySelector('.card__likes');
  const likesText = cardElement.querySelector('.card__likes');
  const cardId = card._id;

  cardImage.addEventListener('click', handleClickImage);
  likeButton.addEventListener('click', () => {
    handleLikeCard(checkLikeStatus(userId, card), cardId, card, likesText, likeButton);
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

  if (checkLikeStatus(userId, card)) {
    likeButton.classList.add('card__like-button_is-active');
  } else {
    likeButton.classList.remove('card__like-button_is-active');
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

const updateLike = (button) => {
  button.classList.toggle('card__like-button_is-active');
};

export function changeLike(card, newLikes, likesText, likeButton) {
  likesText.textContent = newLikes.length
  card.likes = newLikes;
  updateLike(likeButton)
}

function checkLikeStatus(userId, card) {
  return card.likes.some((like) => like._id === userId);
}

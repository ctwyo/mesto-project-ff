export function createCard(card, userId, handleDeleteCard, handleClickImage, handleLikeCard) {
  const template = document.querySelector('#card-template').content;
  const cardElement = template.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likesText = cardElement.querySelector('.card__likes');
  const cardId = card._id;

  // даём id карточке
  cardElement.id = card._id

  cardImage.addEventListener('click', () => handleClickImage(card.name, card.link))

  likeButton.addEventListener('click', () => {
    handleLikeCard(checkLikeStatus(userId, card), cardId, card, likesText, likeButton);
  });

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  likesText.textContent = card.likes.length;

  if (checkLikeStatus(userId, card)) {
    updateLike(likeButton)
  }

  if (card.owner._id != userId) {
    deleteButton.remove()
  } else {
    deleteButton.addEventListener('click', () => {
      handleDeleteCard(cardId, cardElement);
    });
  }

  return cardElement;
}

const updateLike = (button) => {
  button.classList.toggle('card__like-button_is-active');
};

export function deleteCardFromDOM(card) {
  card.remove()
}

export function changeLike(card, newLikes, likesText, likeButton) {
  likesText.textContent = newLikes.length
  card.likes = newLikes;
  updateLike(likeButton)
}

function checkLikeStatus(userId, card) {
  return card.likes.some((like) => like._id === userId);
}

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

export { createCard, handleDeleteCard, handleLikeCard };

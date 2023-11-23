// @todo: Темплейт карточки
const template = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(card, handleDeleteCard) {
  const cardElement = template.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  deleteButton.addEventListener('click', handleDeleteCard);

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  return cardElement;
}

// @todo: Функция удаления карточки
function handleDeleteCard(event) {
  event.target.closest('.card').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  const newCard = createCard(card, handleDeleteCard);
  cardsContainer.append(newCard);
});

// @todo: Темплейт карточки
const template = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(card, handleDeleteCard) {
  const cardElement = template.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', (e) => handleDeleteCard(e.target));

  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').alt = card.name;

  return cardElement;
}

// @todo: Функция удаления карточки
function handleDeleteCard(e) {
  e.closest('.card').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  const newCard = addCard(card, handleDeleteCard);
  cardsContainer.append(newCard);
});

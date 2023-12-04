const arhiz = new URL(
  'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
);
const chelyaba = new URL(
  'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
);
const ivanovo = new URL(
  'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
);
const kamchatka = new URL(
  'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
);
const holmogorskiy = new URL(
  'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
);
const baikal = new URL(
  'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
);

export const initialCards = [
  {
    name: 'Архыз',
    link: arhiz,
  },
  {
    name: 'Челябинская область',
    link: chelyaba,
  },
  {
    name: 'Иваново',
    link: ivanovo,
  },
  {
    name: 'Камчатка',
    link: kamchatka,
  },
  {
    name: 'Холмогорский район',
    link: holmogorskiy,
  },
  {
    name: 'Байкал',
    link: baikal,
  },
];

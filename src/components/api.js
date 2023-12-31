import { renderCards } from "../index"

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
  headers: {
    authorization: 'ce09f12f-de5e-4688-93af-602a37ede720',
    'Content-Type': 'application/json'
  }
}

function getResponseData(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
  headers: {
    authorization: config.headers.authorization
  }
  })
  .then((res) => getResponseData(res));
}

function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then((res) => getResponseData(res))

}

function updateProfile(userData) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: userData.name,
      about: userData.about,
    })
  })
  .then((res) => getResponseData(res))
}

function postNewCard(card) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    })
  })
  .then((res) => getResponseData(res))
}

function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
  })
  .then((res) => getResponseData(res));
}

function getInitialInfo() {
  return Promise.all([getUserInfo(), getInitialCards()]);
}

function putLikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
  })
  .then((res) => getResponseData(res));
}

function deleteLikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
  })
  .then((res) => getResponseData(res));
}

function updateAvatar(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: link,
    })
  })
  .then((res) => getResponseData(res))
}

export { getInitialCards, getInitialInfo, getUserInfo, updateProfile, postNewCard, deleteCard, putLikeCard, deleteLikeCard, updateAvatar }

import { cohortId, token, newProfileName, newProfileJob, formAvatarUpdate, formEditProfile, popupCardDelete } from './constants';
import { renderLoading } from './utils';
import { closePopup } from './modal';

const config = {
  baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: `${token}`,
    'Content-Type': 'application/json'
  }
};
export const getInitialsCards = () => {
  return fetch (`${config.baseUrl}/cards`,{
    method: 'GET',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then((res) => {
    return res.ok === true ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  });
};
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`,{
    method: 'GET',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then((res) => {
    return res.ok === true ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  })
};
export const updateUserInfo = () => {
  renderLoading(true, formEditProfile);
  return fetch(`${config.baseUrl}/users/me`,{
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newProfileName.value,
      about: newProfileJob.value
    })
  })
  .then((res) => {
    return res.ok === true ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  })
};
export const updateAvatar = (newAvatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`,{
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatarLink
    })
  })
  .then((res) => {
    return res.ok === true ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally((res) => {
    renderLoading(false, formAvatarUpdate);
  });
};
export const addCard = (newCardName, newCardLink) => {
  return fetch(`${config.baseUrl}/cards`,{
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: newCardName,
      link: newCardLink
    })
  })
  .then((res) => {
    return res.ok === true ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  })
};
export const deleteCard = (cardId, cardItem) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then((res) => {
    return res.ok === true ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((res) => {
    closePopup(popupCardDelete);
    cardItem.remove();
  })
  .catch((err) => {
    console.log(err);
  });
};
export const addLike = (cardId, likeButton, itemLikes) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then((res) => {
    return res.ok === true ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  })
};
export const deleteLike = (cardId, likeButton, itemLikes) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
  .then((res) => {
    return res.ok === true ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  })
};
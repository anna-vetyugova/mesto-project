import { cohortId, token } from './constants';
import { checkResponse } from './utils';

const config = {
  baseUrl: `https://nomoreparties.co/v1/${cohortId}/`,
  headers: {
    authorization: `${token}`,
    'Content-Type': 'application/json'
  }
};
export function request(endpoint, options) {
  return fetch(`${config.baseUrl}${endpoint}`, options).then(checkResponse);
}

export const getInitialsCards = () => {
  return request('cards', {
    method: 'GET',
    headers: {
      authorization: config.headers.authorization
    }
  });
};
export const getUserInfo = () => {
  return request('users/me',{
    method: 'GET',
    headers: {
      authorization: config.headers.authorization
    }
  });
};
export const updateUserInfo = (newProfileName, newProfileJob) => {
  return request('users/me',{
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newProfileName,
      about: newProfileJob
    })
  })
};
export const updateAvatar = (newAvatarLink) => {
  return request('users/me/avatar',{
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatarLink
    })
  })
};
export const addCard = (newCardName, newCardLink) => {
  return request('cards',{
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: newCardName,
      link: newCardLink
    })
  })
};
export const deleteCard = (cardId) => {
  return request(`cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
};
export const addLike = (cardId) => {
  return request(`cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization
    }
  })
};
export const deleteLike = (cardId) => {
  return request(`cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
};

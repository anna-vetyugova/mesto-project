import { cohortId, token } from './constants';

const config = {
  baseUrl: `https://nomoreparties.co/v1/${cohortId}/`,
  headers: {
    authorization: `${token}`,
    'Content-Type': 'application/json'
  }
};

class Api {
  // ниже описываем приватные переменные и методы
  #baseUrl;
  #headers;
  #onResponse(res){
    return res.ok === true ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }
  #onRequest(endpoint, options) {
    return fetch(`${this.#baseUrl}${endpoint}`, options).then(this.#onResponse);
  }
  constructor(config) {
    this.#baseUrl = config.baseUrl;
    this.#headers = config.headers;
  };

  getInitialCards() {
    return this.#onRequest('cards', {
      method: 'GET',
      headers: {
        authorization: this.#headers.authorization
      }
    })
  }
  getUserInfo() {
    return this.#onRequest('users/me', {
      method: 'GET',
      headers: {
        authorization: this.#headers.authorization
      }
    })
  }
  addLike(cardId) {
    return this.#onRequest(`cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this.#headers.authorization
      }
    })
  };
  deleteLike(cardId) {
    return this.#onRequest(`cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.#headers.authorization
      }
    })
  };
}

export const api = new Api(config);

/*export const getInitialsCards = () => {
  return onRequest('cards', {
    method: 'GET',
    headers: {
      authorization: config.headers.authorization
    }
  });
};
export const getUserInfo = () => {
  return api.onRequest('users/me',{
    method: 'GET',
    headers: {
      authorization: config.headers.authorization
    }
  });
};*/
export const updateUserInfo = (newProfileName, newProfileJob) => {
  return onRequest('users/me',{
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newProfileName,
      about: newProfileJob
    })
  })
};
export const updateAvatar = (newAvatarLink) => {
  return onRequest('users/me/avatar',{
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatarLink
    })
  })
};
export const addCard = (newCardName, newCardLink) => {
  return onRequest('cards',{
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: newCardName,
      link: newCardLink
    })
  })
};
export const deleteCard = (cardId) => {
  return onRequest(`cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
};
/*export const addLike = (cardId) => {
  return onRequest(`cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization
    }
  })
};
export const deleteLike = (cardId) => {
  return onRequest(`cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  })
};*/

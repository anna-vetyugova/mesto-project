export class Api {
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
  updateUserInfo(newProfileName, newProfileJob){
    return this.#onRequest('users/me', {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify({
        name: newProfileName,
        about: newProfileJob
      })
    })
  };
  updateAvatar (newAvatarLink){
    return this.#onRequest('users/me/avatar',{
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify({
        avatar: newAvatarLink
      })
    })
  };
  addCard (newCardName, newCardLink) {
    return this.#onRequest('cards',{
      method: 'POST',
      headers: this.#headers,
      body: JSON.stringify({
        name: newCardName,
        link: newCardLink
      })
    })
  };
  deleteCard (cardId) {
    return this.#onRequest(`cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.#headers.authorization
      }
    })
  };
}
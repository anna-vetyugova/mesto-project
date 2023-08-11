import { cohortId, token, cardsList, profileName, profileJob, newProfileName, newProfileJob, formAvatarUpdate, formEditProfile, formCardAdd, popupCardDelete } from './constants';
import { createCard } from './card';
import { setUserInfo, setNewAvatar, renderLoading } from './utils';
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
  })
  .then((data) => {
    data.forEach((item) => {
    const card = createCard(item.name, item.link, item.likes, item.owner._id, item._id);
    cardsList.append(card)
    });
  })
  .catch((err) => {
    console.log(err);
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
  .then((data) => {
    profileName.setAttribute('user-id', data._id);
    setUserInfo(data.name, data.about);
    setNewAvatar(data.avatar)
  })
  .catch((err) => {
    console.log(err);
  });
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
    .then((data) => {
      profileName.textContent = newProfileName.value;
      profileJob.textContent = newProfileJob.value;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, formEditProfile);
    });
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
export const addCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`,{
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then((res) => {
    return res.ok === true ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((data) => {
    const userId = profileName.getAttribute('user-id');
    const card = createCard(cardName, cardLink, 0, userId, data._id);
    cardsList.prepend(card);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, formCardAdd);
  });
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
    cardItem.remove();
    closePopup(popupCardDelete);
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
  .then((res) => {
    likeButton.classList.add('card__like_active');
  })
  .then((res) => {
    itemLikes.textContent = parseInt(itemLikes.textContent)+1;
    itemLikes.classList.remove('card__like-counter_hidden');
  })
  .catch((err) => {
    console.log(err);
  });
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
  .then((res) => {
    likeButton.classList.remove('card__like_active');
  })
  .then((res) => {
    itemLikes.textContent = parseInt(itemLikes.textContent)-1;
    if(itemLikes.textContent === '0'){
      itemLikes.classList.add('card__like-counter_hidden');
    }
  })
  .catch((err) => {
    console.log(err);
  })
};
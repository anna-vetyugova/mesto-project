import '../index.css';
import { popupProfileEdit, popupCardAdd, profileEditButton, cardAddButton, profileName, validationObject, confirmButton, popupCardDelete, cardTemplate, popupCardShow, newProfileJob, newProfileName, profileJob, profileAvatar, popupAvatarUpdate, avatarUpdateButton, config } from './constants.js';

import { Api } from './Api.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm';
import { Popup } from './Popup';
import { UserInfo } from './UserInfo.js';

export const api = new Api(config);

const sectionInstance = new Section(renderCard, '.elements__photo-grid');
function renderCard( data, position ) {
  const cardElement = new Card( data, handleLikeButton, handleCardClick, handleDeleteIcon, cardTemplate ).generate();
  sectionInstance.addItem(cardElement, position);
}

const userInfo = new UserInfo(profileName, profileJob, profileAvatar);
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, cards]) => {
  userInfo.setUserInfo(userData);
  userInfo.setUserAvatar(userData.avatar);
  profileName.setAttribute('user-id', userData._id);
  return cards;
})
.then((cards) => {
  sectionInstance.renderItems(cards);
})
.catch(console.error);

const popupProfileEditForm = new PopupWithForm(popupProfileEdit, submitFormCardEdit);
popupProfileEditForm.setEventListeners();
profileEditButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  newProfileName.setAttribute('value', userData.name);
  newProfileJob.setAttribute('value', userData.about);
  popupProfileEditForm.openPopup();
});
export function submitFormCardEdit(formInputs) {
  return api.updateUserInfo(formInputs[0].value, formInputs[1].value)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch(console.error);
};

const popupCardAddForm = new PopupWithForm(popupCardAdd, submitFormCardAdd);
popupCardAddForm.setEventListeners();
cardAddButton.addEventListener('click', () => {
  popupCardAddForm.openPopup();
});
function submitFormCardAdd(formInputs) {
  return api.addCard(formInputs[0].value, formInputs[1].value).then((userData) => {
    const userId = profileName.getAttribute('user-id');
    const cardElement = new Card( { name: userData.name, link: userData.link, likes: 0, owner: {_id : userId}, _id: userData._id } , handleLikeButton, handleCardClick, handleDeleteIcon, cardTemplate ).generate();
    sectionInstance.addItem(cardElement, "prepend");
  });
};

const avatarUpdateForm = new PopupWithForm(popupAvatarUpdate, submitFormAvatarUpdate);
avatarUpdateForm.setEventListeners();
avatarUpdateButton.addEventListener('click', () => {
  avatarUpdateForm.openPopup();
});
export function submitFormAvatarUpdate(formInputs) {
  const newAvatarLink = formInputs[0].value;
  return api.updateAvatar(newAvatarLink)
    .then((data) => {
      userInfo.setUserAvatar(data.avatar);
    })
    .catch(console.error);
};

export function handleCardClick(cardElement){
  const popupWithImage = new PopupWithImage(popupCardShow, cardElement);
  popupWithImage.openPopup();
  popupWithImage.setEventListeners();
}
export function handleLikeButton(cardId, likeButton, itemLikes) {
  if (likeButton.classList.contains('card__like_active')) {
    api.deleteLike(cardId, likeButton, itemLikes)
      .then((res) => {
        likeButton.classList.remove('card__like_active');
        return res.likes.length;
      })
      .then((currentLikes) => {
        itemLikes.textContent = currentLikes;
        if(itemLikes.textContent === '0'){
          itemLikes.classList.add('card__like-counter_hidden');
        }
      })
      .catch(console.error)
  }
  else {
    api.addLike(cardId, likeButton, itemLikes)
      .then((res) => {
        likeButton.classList.add('card__like_active');
        return res.likes.length;
      })
      .then((currentLikes) => {
        itemLikes.textContent = currentLikes;
        itemLikes.classList.remove('card__like-counter_hidden');
      })
      .catch(console.error)
  }
  };

const popupCardDeleteConfirm = new Popup(popupCardDelete);
popupCardDeleteConfirm.setEventListeners();
confirmButton.addEventListener('click', () => {
  handleCardDelete(confirmButton.getAttribute('card-id'));
});
export function handleDeleteIcon(cardElementId, cardDeleteIcon){
  if (cardDeleteIcon.getAttribute('owner-id') != this.getProfileId()) {
    cardDeleteIcon.classList.add('card__trash_hidden');
  }
  else {
    cardDeleteIcon.addEventListener('click', () => {
      popupCardDeleteConfirm.openPopup();
      confirmButton.setAttribute('card-id', cardElementId);
    });
  }
}
export function handleCardDelete(cardId){
  api.deleteCard(cardId)
    .then(() => {
      const cardItem = document.querySelector(`[card-id="${cardId}"]`);
      cardItem.remove();
      confirmButton.setAttribute('card-id', '');
      popupCardDeleteConfirm.closePopup();
    })
    .catch(console.error);
}
const formElements = Array.from(document.forms);
formElements.forEach((formElement) => {
  const formValidator = new FormValidator(validationObject, formElement);
  formValidator.enableValidation();
});

export function updateValidation(formSelector){
  const formValidator = new FormValidator(validationObject, formSelector);
  formValidator.enableValidation();
  Array.from(formSelector.querySelectorAll(validationObject.inputSelector)).forEach((formInput) => {
    formInput.setCustomValidity('');
    formValidator.hideInputError(formSelector, formInput, validationObject.inputErrorClass, validationObject.errorClass);
  });
}

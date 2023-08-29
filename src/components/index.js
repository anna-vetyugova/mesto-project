import '../index.css';
import { popupProfileEdit, popupCardAdd, popupAvatarUpdate, formEditProfile, formCardAdd, formAvatarUpdate, profileEditButton, cardAddButton, avatarUpdateButton, closePopupButtons, profileName, cardsList, validationObject, confirmButton, popupCardDelete, cardTemplate } from './constants.js';
import { openPopup, closePopup } from './modal.js';
import { submitFormCardEdit, submitFormCardAdd, submitFormAvatarUpdate } from './form.js';
import { enableValidation } from './validate.js';
import { addInitialProfileValues, resetFormFields, setUserInfo, setNewAvatar } from './utils.js';

import { deleteCard, api } from './api';
import { Card } from './card';

profileEditButton.addEventListener('click', () => addInitialProfileValues(popupProfileEdit));
cardAddButton.addEventListener('click', () => {
  resetFormFields(popupCardAdd);
  openPopup(popupCardAdd);
});
avatarUpdateButton.addEventListener('click', () => {
  resetFormFields(popupAvatarUpdate);
  openPopup(popupAvatarUpdate);
});

formEditProfile.addEventListener('submit', submitFormCardEdit); 
formCardAdd.addEventListener('submit', submitFormCardAdd); 
formAvatarUpdate.addEventListener('submit', submitFormAvatarUpdate); 

closePopupButtons.forEach((evt) => {
  const modalType = evt.closest('.popup');
  evt.addEventListener('click', () => closePopup(modalType));
});


confirmButton.addEventListener('click', () => {
  const deletedCardId = confirmButton.getAttribute('card-id');
  deleteCard(deletedCardId)
    .then((res) => {
      closePopup(popupCardDelete);
      const cardItem = document.querySelector(`img[card-id="${deletedCardId}"]`).closest('li');
      cardItem.remove();
    })
    .catch(console.error);
});

enableValidation(validationObject);


export function handlePopupCardShow(){
  openPopup(popupCardShow);
  popupCardShowImage.src = evt.target.getAttribute('src');
  popupCardShowImage.alt = evt.target.getAttribute('alt');
  popupCardShowImageCaption.textContent = evt.target.getAttribute('alt');
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

export function handleDeleteIcon(cardElement, cardTemplateDeleteIcon){
  if (this._ownerId != this.getProfileId()) {
    cardTemplateDeleteIcon.classList.add('card__trash_hidden');
  }
  else {
    cardTemplateDeleteIcon.addEventListener('click', () => {
      openPopup(popupCardDelete);
      confirmButton.setAttribute('card-id', this._cardId);
    });
  }
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, cards]) => {
  profileName.setAttribute('user-id', userData._id);
  setUserInfo(userData.name, userData.about);
  setNewAvatar(userData.avatar);
  return cards;
})
.then((cards) => {
  cards.forEach((item) => {
    const cardElement = new Card( item, handleLikeButton, handlePopupCardShow, handleDeleteIcon, cardTemplate).generate();
    cardsList.append(cardElement);
  })
})
.catch(console.error);
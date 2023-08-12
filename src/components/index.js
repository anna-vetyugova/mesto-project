import '../index.css';
import { popupProfileEdit, popupCardAdd, popupAvatarUpdate, formEditProfile, formCardAdd, formAvatarUpdate, profileEditButton, cardAddButton, avatarUpdateButton, closePopupButtons, profileName, cardsList, validationObject, confirmButton, popupCardDelete } from './constants.js';
import { openPopup, closePopup } from './modal.js';
import { submitFormCardEdit, submitFormCardAdd, submitFormAvatarUpdate } from './form.js';
import { enableValidation } from './validate.js';
import { addInitialProfileValues, resetFormFields, setUserInfo, setNewAvatar } from './utils.js';
import { getInitialsCards, getUserInfo, deleteCard } from './api';
import { createCard } from './card';

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

Promise.all([getUserInfo(), getInitialsCards()])
  .then(([userData, cards]) => {
    profileName.setAttribute('user-id', userData._id);
    setUserInfo(userData.name, userData.about);
    setNewAvatar(userData.avatar);
    return cards;
  })
  .then((cards) => {
    cards.forEach((item) => {
      const card = createCard(item.name, item.link, item.likes, item.owner._id, item._id);
      cardsList.append(card);
    })
  })
  .catch(console.error);

import '../index.css';
import { initialCards } from './constants.js';
import { popupProfileEdit, popupCardAdd, popupCardShow, popupAvatarUpdate, formEditProfile, formCardAdd, formAvatarUpdate, profileEditButton, cardAddButton, avatarUpdateButton, closePopupButtons, validationObject } from './constants.js';
import { addCard } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { submitFormCardEdit, submitFormCardAdd, submitFormAvatarUpdate } from './form.js';
import { enableValidation, changeButtonState } from './validate.js';
import { addInitialProfileValues, resetFormFields } from './utils.js';

profileEditButton.addEventListener('click', () => addInitialProfileValues(popupProfileEdit));
cardAddButton.addEventListener('click', () => {
  resetFormFields(popupCardAdd);
  openPopup(popupCardAdd);
  const formInputs = Array.from(popupCardAdd.querySelectorAll(validationObject.inputSelector));
  changeButtonState(formInputs, popupCardAdd.querySelector(validationObject.submitButtonSelector), validationObject.inactiveButtonClass);
});
avatarUpdateButton.addEventListener('click', () => {
  resetFormFields(popupAvatarUpdate);
  openPopup(popupAvatarUpdate);
  const formInputs = Array.from(popupAvatarUpdate.querySelectorAll(validationObject.inputSelector));
  changeButtonState(formInputs, popupAvatarUpdate.querySelector(validationObject.submitButtonSelector), validationObject.inactiveButtonClass);
});

formEditProfile.addEventListener('submit', submitFormCardEdit); 
formCardAdd.addEventListener('submit', submitFormCardAdd); 
formAvatarUpdate.addEventListener('submit', submitFormAvatarUpdate); 

closePopupButtons.forEach((evt) => {
  const modalType = evt.closest('.popup');
  evt.addEventListener('click', (evt) => closePopup(modalType));
});

initialCards.forEach((item) => {
  addCard(item.name, item.link, 'append');
});

enableValidation(validationObject);
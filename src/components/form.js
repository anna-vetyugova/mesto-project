import { page, popupProfileEdit, popupCardAdd, popupCardShow, popupAvatarUpdate, formEditProfile, formCardAdd, formAvatarUpdate, profileEditButton, cardAddButton, avatarUpdateButton, closePopupButtons, profileName, profileJob, newProfileName, newProfileJob, placeName, placeLink, cardsList, cardTemplate, popupCardShowImage, popupCardShowImageCaption, profileAvatar, inactiveButtonClass } from './constants.js';
import { addCard } from './card';
import { closePopup } from './modal.js';
import { setNewAvatar } from './utils.js';

export function submitFormCardEdit(evt) {
  evt.preventDefault(); 
  profileName.textContent = newProfileName.value;
  profileJob.textContent = newProfileJob.value;
  closePopup(popupProfileEdit);
};
export function submitFormCardAdd(evt) {
  evt.preventDefault(); 
  addCard(placeName.value, placeLink.value, 'prepend');
  closePopup(popupCardAdd);
  formCardAdd.reset();
};
export function submitFormAvatarUpdate(evt) {
  evt.preventDefault(); 
  const newAvatarLink = evt.target.querySelector('.popup__form-field_avatar_link').value;
  setNewAvatar(newAvatarLink);
  closePopup(popupAvatarUpdate);
  formAvatarUpdate.reset();
};


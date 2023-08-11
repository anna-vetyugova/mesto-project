import { popupProfileEdit, popupCardAdd, popupAvatarUpdate, formCardAdd, formAvatarUpdate, newProfileName, newProfileJob, placeName, placeLink, cohortId } from './constants.js';
import { closePopup } from './modal.js';
import { setNewAvatar, renderLoading } from './utils.js';
import { updateUserInfo, updateAvatar, addCard } from './api.js';

export function submitFormCardEdit(evt) {
  evt.preventDefault(); 
  updateUserInfo();
  closePopup(popupProfileEdit);
};
export function submitFormCardAdd(evt) {
  evt.preventDefault(); 
  renderLoading(true, formCardAdd);
  addCard(placeName.value, placeLink.value);
  closePopup(popupCardAdd);
  formCardAdd.reset();
};
export function submitFormAvatarUpdate(evt) {
  evt.preventDefault(); 
  const newAvatarLink = evt.target.querySelector('.popup__form-field_avatar_link').value;
  renderLoading(true, formAvatarUpdate);
  updateAvatar(newAvatarLink);
  setNewAvatar(newAvatarLink);
  closePopup(popupAvatarUpdate);
  formAvatarUpdate.reset();
};
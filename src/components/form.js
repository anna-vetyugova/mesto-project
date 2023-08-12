import { popupProfileEdit, popupCardAdd, popupAvatarUpdate, formCardAdd, formAvatarUpdate, newProfileName, newProfileJob, placeName, placeLink, profileName, profileJob, formEditProfile, cardsList } from './constants.js';
import { closePopup } from './modal.js';
import { setNewAvatar, renderLoading } from './utils.js';
import { updateUserInfo, updateAvatar, addCard } from './api.js';
import { createCard } from './card.js';

export function submitFormCardEdit(evt) {
  evt.preventDefault(); 
  updateUserInfo()
    .then((res) => {
      profileName.textContent = newProfileName.value;
      profileJob.textContent = newProfileJob.value;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, formEditProfile);
    });
  closePopup(popupProfileEdit);
};
export function submitFormCardAdd(evt) {
  evt.preventDefault(); 
  renderLoading(true, formCardAdd);
  addCard(placeName.value, placeLink.value)
    .then((data) => {
      const userId = profileName.getAttribute('user-id');
      const card = createCard(data.name, data.link, 0, userId, data._id);
      cardsList.prepend(card);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, formCardAdd);
    });
  closePopup(popupCardAdd);
  formCardAdd.reset();
};
export function submitFormAvatarUpdate(evt) {
  evt.preventDefault(); 
  const newAvatarLink = evt.target.querySelector('.popup__form-field_avatar_link').value;
  renderLoading(true, formAvatarUpdate);
  updateAvatar(newAvatarLink)
    .catch((err) => {
      console.log(err);
    })
    .finally((res) => {
      renderLoading(false, formAvatarUpdate);
    });
  setNewAvatar(newAvatarLink);
  closePopup(popupAvatarUpdate);
  formAvatarUpdate.reset();
};
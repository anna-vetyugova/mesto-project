import { page, popupProfileEdit, popupCardAdd, popupCardShow, popupAvatarUpdate, formEditProfile, formCardAdd, formAvatarUpdate, profileEditButton, cardAddButton, avatarUpdateButton, closePopupButtons, profileName, profileJob, newProfileName, newProfileJob, placeName, placeLink, cardsList, cardTemplate, popupCardShowImage, popupCardShowImageCaption, profileAvatar, validationObject } from './constants.js';
import { manageModal, updateFormFields } from './utils.js';

export function openPopup(modalType) {
  modalType.classList.add('popup_opened');
  page.addEventListener('keydown', manageModal);
  modalType.addEventListener('click', manageModal);
};
export function closePopup(modalType) {
  modalType.classList.remove('popup_opened');
  // если в модальном окне есть форма, то сбросим значения
  if (modalType.querySelector(validationObject.formSelector)) {
    updateFormFields(modalType);
  };
  page.removeEventListener('keydown', manageModal);
  modalType.removeEventListener('click', manageModal);
}; 
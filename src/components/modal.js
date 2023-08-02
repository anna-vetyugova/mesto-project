import { page, popupProfileEdit, popupCardAdd, popupCardShow, popupAvatarUpdate, formEditProfile, formCardAdd, formAvatarUpdate, profileEditButton, cardAddButton, avatarUpdateButton, closePopupButtons, profileName, profileJob, newProfileName, newProfileJob, placeName, placeLink, cardsList, cardTemplate, popupCardShowImage, popupCardShowImageCaption, profileAvatar, validationObject } from './constants.js';
import { manageModal } from './utils.js';
import { changeButtonState } from './validate.js';

export function openPopup(modalType) {
  modalType.classList.add('popup_opened');
  // при повторном открытии формы проверим валидность полей и изменим статус кнопки
  const buttonElement = modalType.querySelector(validationObject.submitButtonSelector);
  if (buttonElement) {
    const formInputs = Array.from(modalType.querySelectorAll(validationObject.inputSelector));
    changeButtonState(formInputs, buttonElement, validationObject.inactiveButtonClass);
  };
  page.addEventListener('keydown', manageModal);
  modalType.addEventListener('click', manageModal);
};
export function closePopup(modalType) {
  modalType.classList.remove('popup_opened');
  page.removeEventListener('keydown', manageModal);
  modalType.removeEventListener('click', manageModal);
};
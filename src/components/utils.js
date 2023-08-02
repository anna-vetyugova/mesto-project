
import { page, popupProfileEdit, popupCardAdd, popupCardShow, popupAvatarUpdate, formEditProfile, formCardAdd, formAvatarUpdate, profileEditButton, cardAddButton, avatarUpdateButton, closePopupButtons, profileName, profileJob, newProfileName, newProfileJob, placeName, placeLink, cardsList, cardTemplate, popupCardShowImage, popupCardShowImageCaption, profileAvatar, inactiveButtonClass, validationObject } from './constants.js';
import { openPopup, closePopup } from './modal.js';
import { hideInputError, changeButtonState } from './validate.js';

export function manageModal(event) {
  const modalType = page.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopup(modalType);
  };
  if (event.type === 'click' && event.target.classList.contains('popup_opened')) {
    closePopup(modalType);
  }
};
export function setNewAvatar(newAvatar){
  profileAvatar.style.backgroundImage = "url("+newAvatar+")";
};
export function addInitialProfileValues(modalType){
  newProfileName.setAttribute('value', profileName.textContent);
  newProfileJob.setAttribute('value',profileJob.textContent);
  openPopup(modalType);
  /*если пользователь закрыл окно с невалидным значениями, то кнопка сабмита будет недоступна, но так как идет сброс значений полей, то для этой формы нужно ее обратно открыть, так как при повторном открытии модального окна поля формы по умолчанию уже будут заполнены, т.е. валидными*/
  const modalTypeSubmitButton = modalType.querySelector(validationObject.submitButtonSelector);
  if (modalTypeSubmitButton.hasAttribute('disabled')) {
    modalTypeSubmitButton.setAttribute('disabled', false);
    modalTypeSubmitButton.classList.remove(validationObject.inactiveButtonClass);
  };
};

/*если закрыть попап без сохранения, а пользователь при этом ввел некорректные значения в поля ввода, то текст ошибки останется при повторном открытии, учтем это, и сбросим значения формы*/
export function updateFormFields(modalType){
  modalType.querySelectorAll(validationObject.inputSelector).forEach((formInput) => {
    if(!formInput.validity.valid) {
      hideInputError(modalType, formInput, validationObject.inputErrorClass, validationObject.errorClass);
    };
  });
  modalType.querySelector(validationObject.formSelector).reset();
};

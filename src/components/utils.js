
import { page, profileName, profileJob, newProfileName, newProfileJob, profileAvatar, validationObject } from './constants.js';
import { openPopup, closePopup } from './modal.js';
import { hideInputError } from './validate.js';

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

/*если закрыть попап без сохранения, а пользователь при этом ввел некорректные значения в поля ввода, то текст ошибки останется при повторном открытии, учтем это, и сбросим значения формы*/
export function resetFormFields(modalType){
  const modalTypeForm = modalType.querySelector(validationObject.formSelector);
  modalTypeForm.reset();
  Array.from(modalTypeForm.querySelectorAll(validationObject.inputSelector)).forEach((formInput) => {
    formInput.setCustomValidity('');
    hideInputError(modalTypeForm, formInput, validationObject.inputErrorClass, validationObject.errorClass);
  });
};
export function addInitialProfileValues(modalType){
  resetFormFields(modalType);
  newProfileName.setAttribute('value', profileName.textContent);
  newProfileJob.setAttribute('value',profileJob.textContent);
  openPopup(modalType);
  const modalTypeSubmitButton = modalType.querySelector(validationObject.submitButtonSelector);
  if (modalTypeSubmitButton.hasAttribute('disabled')) {
    modalTypeSubmitButton.setAttribute('disabled', false);
    modalTypeSubmitButton.classList.remove(validationObject.inactiveButtonClass);
  };
};


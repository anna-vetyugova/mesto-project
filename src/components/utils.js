
import { page, profileName, profileJob, newProfileName, newProfileJob, profileAvatar, validationObject } from './constants.js';
import { openPopup, closePopup } from './modal.js';
import { hideInputError, changeButtonState } from './validate.js';

export function handleEscape(event){
  if (event.key === 'Escape') {
    const openedPopup = page.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};
export function handleOverlay(event){
  if (event.target.classList.contains("popup_opened")) {
    closePopup(event.target);
  }
}
export function setNewAvatar(newAvatar){
  profileAvatar.style.backgroundImage = "url("+newAvatar+")";
};

/*если закрыть попап без сохранения, а пользователь при этом ввел некорректные значения в поля ввода, то текст ошибки останется при повторном открытии, учтем это, и сбросим значения формы*/
export function resetFormFields(modalType){
  const modalTypeForm = modalType.querySelector(validationObject.formSelector);
  modalTypeForm.reset();
  const formInputs = Array.from(modalType.querySelectorAll(validationObject.inputSelector));
  changeButtonState(formInputs, modalType.querySelector(validationObject.submitButtonSelector), validationObject.inactiveButtonClass);
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
  const formInputs = Array.from(modalType.querySelectorAll(validationObject.inputSelector));
  changeButtonState(formInputs, modalType.querySelector(validationObject.submitButtonSelector), validationObject.inactiveButtonClass);
};
export function setUserInfo(userName, userDescription){
  profileName.textContent = userName;
  profileJob.textContent = userDescription;
};
export function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...'){
  if(isLoading) {
    button.textContent = loadingText;
  }
  else {
    button.textContent = buttonText;
  }
};

// export function checkResponse(res) {
//   return res.ok === true ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
// }
import { submitFormCardEdit, submitFormCardAdd, setNewAvatar, submitFormAvatarUpdate, setEventListeners } from './forms.js';

export function isValid(formElement, formInput){
  if(formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  }
  else {
    formInput.setCustomValidity("");
  }

  if(!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  }
  else {
    hideInputError(formElement, formInput);
  }
};

export function changeButtonState(formInputs, buttonElement) {
  const result = formInputs.some( (formInput) => formInput.validity.valid === false);
  if (!result) {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove('popup__form-button_disabled');
  }
  else {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add('popup__form-button_disabled');
  }
};

export function enableValidation(){
  const formElements = Array.from(document.querySelectorAll('.popup__form'));
  formElements.forEach((formElement) => {
    setEventListeners(formElement);
  });
};
// enableValidation();
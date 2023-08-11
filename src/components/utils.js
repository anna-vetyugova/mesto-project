
import { page, profileName, profileJob, newProfileName, newProfileJob, profileAvatar, validationObject, formEditProfile } from './constants.js';
import { openPopup, closePopup } from './modal.js';
import { hideInputError, changeButtonState } from './validate.js';
import { addLike, deleteLike } from './api.js';


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
  const formInputs = Array.from(modalType.querySelectorAll(validationObject.inputSelector));
  changeButtonState(formInputs, modalType.querySelector(validationObject.submitButtonSelector), validationObject.inactiveButtonClass);
};

export function setUserInfo(userName, userDescription){
  profileName.textContent = userName;
  profileJob.textContent = userDescription;
};

export function renderLoading(isLoading, formElement){
  if(isLoading) {
    formElement.querySelector(validationObject.submitButtonSelector).textContent = 'Сохранение...'
  }
  else {
    formElement.querySelector(validationObject.submitButtonSelector).textContent = 'Сохранить'
  }
};

export function manageLikeButton(cardId, likeButton, itemLikes) {
  if (likeButton.classList.contains('card__like_active')) {
    deleteLike(cardId, likeButton, itemLikes);
  }
  else {
    addLike(cardId, likeButton, itemLikes);
  }
};
export function addInitialProfileValues(modalType){
  newProfileName.setAttribute('value', profileName.textContent);
  newProfileJob.setAttribute('value',profileJob.textContent);
  openPopup(modalType);
};

export function openPopup(modalType) {
  modalType.classList.add('popup_opened');
  
  const formInputs = Array.from(modalType.querySelectorAll('.popup__form-field'));
  const buttonElement = modalType.querySelector('.popup__form-button');
  if (buttonElement) {
    changeButtonState(formInputs, buttonElement);
  };
};

export function closePopup(modalType) {
  modalType.classList.remove('popup_opened');
};

export function getModalType(){
  const popupOpened = page.querySelector('.popup_opened');
  if (popupOpened.classList.contains('popup_profile_edit')) {
    return popupProfileEdit;
  }
  else if (popupOpened.classList.contains('popup_card_add')) {
    return popupCardAdd;
  }
  else if (popupOpened.classList.contains('popup_card_show')) {
    return popupCardShow;
  }
  else if (popupOpened.classList.contains('popup_avatar_update')) {
    return popupAvatarUpdate;
  };
};
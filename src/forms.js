export function submitFormCardEdit(evt) {
  evt.preventDefault(); 
  profileName.textContent = newProfileName.value;
  profileJob.textContent = newProfileJob.value;
  closePopup(popupProfileEdit);
};
export function submitFormCardAdd(evt) {
  evt.preventDefault(); 
  addCard(placeName.value, placeLink.value, 'prepend');
  closePopup(popupCardAdd);
  formCardAdd.reset();
};

export function setNewAvatar(newAvatar){
  profileAvatar.style.backgroundImage = "url("+newAvatar+")";
};
export function submitFormAvatarUpdate(evt) {
  evt.preventDefault(); 
  const newAvatarLink = evt.target.querySelector('.popup__form-field_avatar_link').value;
  setNewAvatar(newAvatarLink);
  closePopup(popupAvatarUpdate);
  formAvatarUpdate.reset();
};

export function setEventListeners(formElement){
  const formInputs = Array.from(formElement.querySelectorAll('.popup__form-field'));
  const buttonElement = formElement.querySelector('.popup__form-button');

  formInputs.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(formElement, formInput);  
      if (buttonElement) {
        changeButtonState(formInputs, buttonElement);
      };
    });  
  });
};
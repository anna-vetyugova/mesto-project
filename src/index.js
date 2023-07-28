import { initialCards } from './constants.js';

// variables
import { page, popupProfileEdit, popupCardAdd, popupCardShow, popupAvatarUpdate, formEditProfile, formCardAdd, formAvatarUpdate, profileEditButton, cardAddButton, avatarUpdateButton, closePopupButtons, profileName, profileJob, newProfileName, newProfileJob, placeName, placeLink, cardsList, cardTemplate, popupCardShowImage, popupCardShowImageCaption, profileAvatar } from './variables.js';

// cards functions
import { createCard, addCard } from './cards.js';

// modals functions
import { addInitialProfileValues, openPopup, closePopup, getModalType} from './modals.js';

// forms functions
import { submitFormCardEdit, submitFormCardAdd, setNewAvatar, submitFormAvatarUpdate, setEventListeners } from './forms.js';

// errors hide and show functions
import { showInputError, hideInputError } from './errors.js';

// validations fields functions
import { isValid, changeButtonState, enableValidation } from './validation.js';

enableValidation();

profileEditButton.addEventListener('click', evt => addInitialProfileValues(popupProfileEdit));
cardAddButton.addEventListener('click', evt => openPopup(popupCardAdd));
avatarUpdateButton.addEventListener('click', evt => openPopup(popupAvatarUpdate));

formEditProfile.addEventListener('submit', submitFormCardEdit); 
formCardAdd.addEventListener('submit', submitFormCardAdd); 
formAvatarUpdate.addEventListener('submit', submitFormAvatarUpdate); 

/* закрытие модального окна по нажатию на клавишу Esc и оверлей*/
page.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape' && page.querySelector('.popup_opened')) { 
    const result = getModalType();
    closePopup(result);
  };
});
/* закрытие модального окна по клику на оверлей*/
page.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    const result = getModalType();
    closePopup(result);
  }
});

closePopupButtons.forEach((evt) => {
  const modalType = evt.closest('.popup');
  evt.addEventListener('click', evt => closePopup(modalType));
});

initialCards.forEach((item) => {
  addCard(item.name, item.link, 'append');
});
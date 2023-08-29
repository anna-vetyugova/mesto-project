import { popupProfileEdit, popupCardAdd, popupAvatarUpdate, newProfileName, newProfileJob, placeName, placeLink, profileName, profileJob, cardsList } from './constants.js';
import { closePopup } from './modal.js';
import { setNewAvatar, renderLoading } from './utils.js';
import { updateUserInfo, updateAvatar, addCard } from './api.js';
import { Card } from './card.js';

export function handleFormSubmit(request, evt, modalType, loadingText = "Сохранение..."){
  evt.preventDefault(); 
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      evt.target.reset();
      closePopup(modalType);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}

export function submitFormCardEdit(evt) {
  function makeRequest() {
    return updateUserInfo(newProfileName.value, newProfileJob.value).then((userData) => {
      profileName.textContent = userData.name;
      profileJob.textContent = userData.about;
    });
  };
  handleFormSubmit(makeRequest, evt, popupProfileEdit);
};

export function submitFormCardAdd(evt) {
  function makeRequest() {
    return addCard(placeName.value, placeLink.value).then((userData) => {
      const userId = profileName.getAttribute('user-id');
      const card = new Card(userData.name, userData.link, 0, userId, userData._id, cardTemplate);
      const cardElement = card.generate();
      cardsList.prepend(cardElement);
    });
  };
  handleFormSubmit(makeRequest, evt, popupCardAdd);
};
export function submitFormAvatarUpdate(evt) {
  const newAvatarLink = evt.target.querySelector('.popup__form-field_avatar_link').value;
  function makeRequest() {
    return updateAvatar(newAvatarLink).then(() => {
      setNewAvatar(newAvatarLink);
    });
  };
  handleFormSubmit(makeRequest, evt, popupAvatarUpdate);
};
import '../index.css';
import { popupProfileEdit, popupCardAdd, profileEditButton, cardAddButton, profileName, validationObject, popupCardDelete, cardTemplate, popupCardShow, newProfileJob, newProfileName, profileJob, profileAvatar, popupAvatarUpdate, avatarUpdateButton, config, formAvatarUpdate, formCardAdd, formEditProfile } from './constants.js';

import { Api } from './Api.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm';
import { UserInfo } from './UserInfo.js';
import { PopupWithConfirm } from './PopupWithConfirm.js';

export const api = new Api(config);
const sectionInstance = new Section(renderCard, '.elements__photo-grid');


function renderCard( data, position ) {
  const cardElement = new Card( data, profileName.dataset.id, handleCardClick, handleLikeButton, handleDeleteIcon, cardTemplate ).generate();
  sectionInstance.addItem(cardElement, position);
}

const userInfo = new UserInfo(profileName, profileJob, profileAvatar);
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, cards]) => {
  userInfo.setUserInfo(userData);
  userInfo.setUserAvatar(userData.avatar);
  profileName.dataset.id = userData._id;
  return cards;
})
.then((cards) => {
  sectionInstance.renderItems(cards);
})
.catch((error) => {
  console.error(`Ошибка: ${error}`);
});

function handleFormSubmit(request, popupWithFormElement, submitButton){
  const initialText = submitButton.textContent;
  popupWithFormElement.renderLoading(true, submitButton, initialText);
  request()
  .then(() => {
    popupWithFormElement.closePopup();
  })
  .catch((error) => {
    console.error(`Ошибка: ${error}`);
  })
  .finally(() => {
    popupWithFormElement.renderLoading(false, submitButton, initialText);
  });
}

const popupProfileEditForm = new PopupWithForm(popupProfileEdit, submitFormCardEdit);
popupProfileEditForm.setEventListeners();
profileEditButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  newProfileName.value = userData.name;
  newProfileJob.value = userData.about;
  popupProfileEditForm.openPopup();
  editProfileFormValidator.updateValidation();
});

export function submitFormCardEdit({ firstname, description }, evt) {
  function makeRequest(){
    return api.updateUserInfo(firstname , description)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((error) => {
      console.error(`Ошибка: ${error}`);
    });
  }
  handleFormSubmit(makeRequest, popupProfileEditForm, evt);
};

const popupCardAddForm = new PopupWithForm(popupCardAdd, submitFormCardAdd);
popupCardAddForm.setEventListeners();
cardAddButton.addEventListener('click', () => {
  popupCardAddForm.openPopup();
  cardAddFormValidator.updateValidation();
});
function submitFormCardAdd({ placeName, placeLink }, evt) {
  function makeRequest(){
    return api.addCard(placeName, placeLink).then((cardData) => {
      renderCard(cardData, "prepend");
    });
  }
  handleFormSubmit(makeRequest, popupCardAddForm, evt);
};

const avatarUpdateForm = new PopupWithForm(popupAvatarUpdate, submitFormAvatarUpdate);
avatarUpdateForm.setEventListeners();
avatarUpdateButton.addEventListener('click', () => {
  avatarUpdateForm.openPopup();
  avatarUpdateFormValidator.updateValidation();
});
export function submitFormAvatarUpdate({ avatarLink }, evt) {
  function makeRequest(){
    const newAvatarLink = avatarLink;
    return api.updateAvatar(newAvatarLink)
      .then((userData) => {
        userInfo.setUserAvatar(userData.avatar);
      })
      .catch((error) => {
        console.error(`Ошибка: ${error}`);
      });
  }
  handleFormSubmit(makeRequest, avatarUpdateForm, evt);
};

const popupWithImage = new PopupWithImage(popupCardShow);
popupWithImage.setEventListeners();
export function handleCardClick(cardName, cardLink){
  popupWithImage.openPopup(cardName, cardLink);
}

export function handleCardDelete(cardItem, cardItemContainer, cardId){
  api.deleteCard(cardId)
    .then(() => {
      cardItem.deletedCard(cardItemContainer);
      popupCardDeleteConfirm.closePopup();
    })
    .catch((error) => {
      console.error(`Ошибка: ${error}`);
    });
}

function handleLikeButton(cardItem, cardId, likeButtonState){
  const likeButtonStatus = likeButtonState
    ? api.deleteLike(cardId) 
    : api.addLike(cardId);
  likeButtonStatus
  .then((data) => {
    cardItem.updateLikeButtonStatus(data);
  })
  .catch((error) => {
    console.error(`Ошибка: ${error}`);
  });
}

const popupCardDeleteConfirm = new PopupWithConfirm(popupCardDelete, handleCardDelete, '.popup__form-button');
popupCardDeleteConfirm.setEventListeners();

function handleDeleteIcon(cardItem, cardItemContainer, cardId){
  popupCardDeleteConfirm.openPopup(cardItem, cardItemContainer, cardId);
}

const cardAddFormValidator = new FormValidator(validationObject, formCardAdd);
cardAddFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(validationObject, formEditProfile);
editProfileFormValidator.enableValidation();

const avatarUpdateFormValidator = new FormValidator(validationObject, formAvatarUpdate);
avatarUpdateFormValidator.enableValidation();
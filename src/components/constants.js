const page = document.querySelector('.page');

const popupProfileEdit = page.querySelector('.popup_profile_edit');
const popupCardAdd = page.querySelector('.popup_card_add');
const popupCardShow = page.querySelector('.popup_card_show');
const popupAvatarUpdate = page.querySelector('.popup_avatar_update');
const popupCardDelete = page.querySelector('.popup_card_delete');

const formEditProfile = document.forms["profileEditForm"];
const formCardAdd = document.forms["cardAddForm"];
const formAvatarUpdate = document.forms["avatarUpdateForm"];

const profileEditButton = page.querySelector('.profile__edit-button');
const cardAddButton = page.querySelector('.profile__add-button');
const avatarUpdateButton = page.querySelector('.profile__avatar');

const closePopupButtons = document.querySelectorAll('.popup__close-icon');
const confirmButton = popupCardDelete.querySelector('.popup__form-button');

const profileName = page.querySelector('.profile__title');
const profileJob = page.querySelector('.profile__subtitle');
const profileAvatar = page.querySelector('.profile__avatar');

const newProfileName = popupProfileEdit.querySelector('.popup__form-field_type_name'); 
const newProfileJob = popupProfileEdit.querySelector('.popup__form-field_type_description');

const placeName = formCardAdd.querySelector('.popup__form-field_place_name'); 
const placeLink = formCardAdd.querySelector('.popup__form-field_place_link');

const cardsList = page.querySelector('.elements__photo-grid');
const cardTemplate = document.querySelector('#card');

const popupCardShowImage = popupCardShow.querySelector('.popup__image');
const popupCardShowImageCaption = popupCardShow.querySelector('.popup__caption');

const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-field',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_disabled',
  inputErrorClass: 'popup__form-field_error_active',
  errorClass: 'popup__form-error_active'
};

const cohortId = 'plus-cohort-27';
const token = '3bba9d1b-7b3a-41e6-ab4e-3983a20dd76a';

const config = {
  baseUrl: `https://nomoreparties.co/v1/${cohortId}/`,
  headers: {
    authorization: `${token}`,
    'Content-Type': 'application/json'
  }
};


export { popupProfileEdit, popupCardAdd, popupCardShow, popupAvatarUpdate, formEditProfile, formCardAdd, formAvatarUpdate, profileEditButton, cardAddButton, avatarUpdateButton, closePopupButtons, profileName, profileJob, newProfileName, newProfileJob, placeName, placeLink, cardsList, cardTemplate, popupCardShowImage, popupCardShowImageCaption, profileAvatar, validationObject, popupCardDelete, confirmButton, config };
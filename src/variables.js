const page = document.querySelector('.page');

const popupProfileEdit = page.querySelector('.popup_profile_edit');
const popupCardAdd = page.querySelector('.popup_card_add');
const popupCardShow = page.querySelector('.popup_card_show');
const popupAvatarUpdate = page.querySelector('.popup_avatar_update');

const formEditProfile = popupProfileEdit.querySelector('.popup__form');
const formCardAdd = popupCardAdd.querySelector('.popup__form');
const formAvatarUpdate = popupAvatarUpdate.querySelector('.popup__form');

const profileEditButton = page.querySelector('.profile__edit-button');
const cardAddButton = page.querySelector('.profile__add-button');
const avatarUpdateButton = page.querySelector('.profile__avatar');

const closePopupButtons = document.querySelectorAll('.popup__close-icon');

const profileName = page.querySelector('.profile__title');
const profileJob = page.querySelector('.profile__subtitle');
const newProfileName = popupProfileEdit.querySelector('.popup__form-field_type_name'); 
const newProfileJob = popupProfileEdit.querySelector('.popup__form-field_type_description');

const placeName = formCardAdd.querySelector('.popup__form-field_place_name'); 
const placeLink = formCardAdd.querySelector('.popup__form-field_place_link');

const cardsList = page.querySelector('.elements__photo-grid');
const cardTemplate = document.querySelector('#card').content;

const popupCardShowImage = popupCardShow.querySelector('.popup__image');
const popupCardShowImageCaption = popupCardShow.querySelector('.popup__caption');

const profileAvatar = page.querySelector('.profile__avatar');

export { page, popupProfileEdit, popupCardAdd, popupCardShow, popupAvatarUpdate, formEditProfile, formCardAdd, formAvatarUpdate, profileEditButton, cardAddButton, avatarUpdateButton, closePopupButtons, profileName, profileJob, newProfileName, newProfileJob, placeName, placeLink, cardsList, cardTemplate, popupCardShowImage, popupCardShowImageCaption, profileAvatar };
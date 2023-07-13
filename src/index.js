const page = document.querySelector('.page');

const popupProfileEdit = page.querySelector('.popup_profile_edit');
const popupCardAdd = page.querySelector('.popup_card_add');
const popupShowCard = page.querySelector('.popup_card_show');
const formCardEdit = popupProfileEdit.querySelector('.popup__form');
const formCardAdd = popupCardAdd.querySelector('.popup__form');

const profileEditButton = page.querySelector('.profile__edit-button');
const cardAddButton = page.querySelector('.profile__add-button');

const profileName = page.querySelector('.profile__title');
const profileJob = page.querySelector('.profile__subtitle');
const newProfileName = popupProfileEdit.querySelector('.popup__form-field_type_name'); 
const newProfileJob = popupProfileEdit.querySelector('.popup__form-field_type_description');

const placeName = formCardAdd.querySelector('.popup__form-field_place_name'); 
const placeLink = formCardAdd.querySelector('.popup__form-field_place_link');

const cardsList = page.querySelector('.elements__photo-grid');
const cardTemplate = document.querySelector('#card').content;
let newCardbyTemplate;

const popupShowCardImage = popupShowCard.querySelector('.popup__image');
const popupShowCardImageCaption = popupShowCard.querySelector('.popup__caption');

function addInitialProfileValues(modalType, func){
  newProfileName.setAttribute('value', profileName.textContent);
  newProfileJob.setAttribute('value',profileJob.textContent);
  return func(modalType);
};
function openPopup(modalType) {
  modalType.classList.add('popup_opened');
  const closePopupButton = modalType.querySelector('.popup__close-icon');
  closePopupButton.addEventListener('click', () => closePopup(modalType));
};
function closePopup(modalType) {
  modalType.classList.remove('popup_opened');
};
function submitFormCardEdit(evt) {
  evt.preventDefault(); 
  profileName.textContent = newProfileName.value;
  profileJob.textContent = newProfileJob.value;
  closePopup(popupProfileEdit);
};
function createCard(title, imageLink) {
  const cardTemplateNew = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTemplatePhoto = cardTemplateNew.querySelector('.card__photo');
  const cardTemplateText = cardTemplateNew.querySelector('.card__text');

  cardTemplatePhoto.src = imageLink;
  cardTemplatePhoto.alt = title;
  cardTemplateText.textContent = title; 

  cardTemplateNew.querySelector('.card__like').addEventListener('click', evt => {
    evt.target.classList.toggle('card__like_active');
  });
  cardTemplateNew.querySelector('.card__trash').addEventListener('click', evt => {
    const cardItem = evt.target.closest('li');
    cardItem.remove();
  });
  cardTemplatePhoto.addEventListener('click', evt => {
    openPopup(popupShowCard);
    popupShowCardImage.src = evt.target.getAttribute('src');
    popupShowCardImage.alt = evt.target.getAttribute('alt');
    popupShowCardImageCaption.textContent = evt.target.getAttribute('alt');
  });
  return newCardbyTemplate = cardTemplateNew;
};
function addCard(order) {
  return order === 'append' ? cardsList.append(newCardbyTemplate) : cardsList.prepend(newCardbyTemplate);
};
function submitFormCardAdd(evt) {
  evt.preventDefault(); 
  createCard(placeName.value, placeLink.value);
  addCard('prepend', newCardbyTemplate);
  closePopup(popupCardAdd);
  formCardAdd.reset();
};

profileEditButton.addEventListener('click', evt => addInitialProfileValues(popupProfileEdit, openPopup));
cardAddButton.addEventListener('click', evt => openPopup(popupCardAdd));
formCardEdit.addEventListener('submit', submitFormCardEdit); 
formCardAdd.addEventListener('submit', submitFormCardAdd); 

initialCards.forEach((item) => {
  createCard(item.name, item.link);
  addCard('append');
});
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

function addInitialProfileValues(modalType){
  newProfileName.setAttribute('value', profileName.textContent);
  newProfileJob.setAttribute('value',profileJob.textContent);
  openPopup(modalType);
};
function openPopup(modalType) {
  modalType.classList.add('popup_opened');
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
    openPopup(popupCardShow);
    popupCardShowImage.src = evt.target.getAttribute('src');
    popupCardShowImage.alt = evt.target.getAttribute('alt');
    popupCardShowImageCaption.textContent = evt.target.getAttribute('alt');
  });
  return cardTemplateNew;
};
function addCard(cardName, cardLink, order) {
  const card = createCard(cardName, cardLink);
  return order === 'append' ? cardsList.append(card) : cardsList.prepend(card);
};
function submitFormCardAdd(evt) {
  evt.preventDefault(); 
  addCard(placeName.value, placeLink.value, 'prepend');
  closePopup(popupCardAdd);
  formCardAdd.reset();
};

function setNewAvatar(newAvatar){
  profileAvatar.style.backgroundImage = "url("+newAvatar+")";
};
function submitFormAvatarUpdate(evt) {
  evt.preventDefault(); 
  const newAvatarLink = evt.target.querySelector('.popup__form-field_avatar_link').value;
  setNewAvatar(newAvatarLink);
  closePopup(popupAvatarUpdate);
  formAvatarUpdate.reset();
};

profileEditButton.addEventListener('click', evt => addInitialProfileValues(popupProfileEdit));
cardAddButton.addEventListener('click', evt => openPopup(popupCardAdd));
avatarUpdateButton.addEventListener('click', evt => openPopup(popupAvatarUpdate));

formEditProfile.addEventListener('submit', submitFormCardEdit); 
formCardAdd.addEventListener('submit', submitFormCardAdd); 
formAvatarUpdate.addEventListener('submit', submitFormAvatarUpdate); 

/*---------------------Спринт 4 ------------------------------------------------------------------------*/
/*функция для поиска открытого модального окно для корректной работы слушателей по закрытию
модального онака по клавиши Esc и клику на оверлей*/
function getModalType(){
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
/* закрытие модального окна по нажатию на клавишу Esc и оверлей*/
page.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape' && evt.target.classList.contains('popup_opened')) {
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
/*---------------------Спринт 4 Конец----------------------------------------------------------------------*/
closePopupButtons.forEach((evt) => {
  const modalType = evt.closest('.popup');
  evt.addEventListener('click', evt => closePopup(modalType));
});

initialCards.forEach((item) => {
  addCard(item.name, item.link, 'append');
});
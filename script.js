const page = document.querySelector('.page');
const popup = page.querySelector('.popup');

const popupEdit = page.querySelector('.popup_profile_edit');
const editButton = page.querySelector('.profile__edit-button');

const popupAdd = page.querySelector('.popup_place_add');
const addButton = page.querySelector('.profile__add-button');

const popupShowCard = page.querySelector('.popup_show_card');

// получим значение профиля
let profileName = page.querySelector('.profile__title');
let profileJob = page.querySelector('.profile__subtitle');

// имя и описание формы (модальное окно)
let nameInput = popupEdit.querySelector('.popup__form-field_type_name'); 
let jobInput = popupEdit.querySelector('.popup__form-field_type_description');
let namePlace = popupAdd.querySelector('.popup__form-field_palce_name'); 
let placeLink = popupAdd.querySelector('.popup__form-field_place_link');

function closePopup() {
  let modalType = page.getElementsByClassName('popup_opened');
  modalType[0].classList.remove('popup_opened');
};
function openPopup(modalType) {
  modalType.classList.add('popup_opened');
  if (modalType.classList.contains('popup_profile_edit')) {
    nameInput.setAttribute('value', profileName.textContent);
    jobInput.setAttribute('value',profileJob.textContent);
  };
  let closeButton = page.querySelector('div.popup_opened .popup__close-icon');
  closeButton.addEventListener('click', closePopup);
};
editButton.addEventListener('click',function(){openPopup(popupEdit)});
addButton.addEventListener('click',function(){openPopup(popupAdd)});

const formElementEdit = popupEdit.querySelector('.popup__form');
function handleFormSubmit(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
};
formElementEdit.addEventListener('submit', handleFormSubmit); 

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardList = page.querySelector('.elements__photo-grid');
function updateCards(cardsArray, newElement) {
  for(let i=0; i<cardsArray.length; i++) {
    let cardLink = cardsArray[i].link;
    let cardName = cardsArray[i].name;
    const cardTemplate = document.querySelector('#card').content;
    const cardTemplateNew = cardTemplate.querySelector('.card').cloneNode(true);
    cardTemplateNew.querySelector('.card__photo').src = cardLink;
    cardTemplateNew.querySelector('.card__photo').alt = cardName;
    cardTemplateNew.querySelector('.card__text').textContent = cardName;
    if (newElement == true) {
      cardList.prepend(cardTemplateNew);
    } 
    else cardList.append(cardTemplateNew);

    const likeButton = cardTemplateNew.querySelector('.card__like'); 
    likeButton.addEventListener('click', function(evt) {
      evt.target.classList.toggle('card__like_active');
    });

    const deleteIcon = cardTemplateNew.querySelector('.card__trash'); 
    deleteIcon.addEventListener('click', function(evt) {
      const cardItem = evt.target.closest('li');
      cardItem.remove();
    });
  };
};
updateCards(initialCards, false);

const formElementAdd = popupAdd.querySelector('.popup__form');
function handleFormAddSubmit(evt) {
    evt.preventDefault(); 
    const newCard = new Object();
    newCard.name = namePlace.value;
    newCard.link = placeLink.value;
    const updatedArray = [];
    updatedArray.push(newCard);
    namePlace.value = '';
    placeLink.value = '';
    updateCards(updatedArray, true);
    closePopup();
};
formElementAdd.addEventListener('submit', handleFormAddSubmit); 

const openCards = page.querySelectorAll('.card__photo');
openCards.forEach(evt => evt.addEventListener("click", function(evt) {
  openPopup(popupShowCard);
  const showCardContainer = popupShowCard.querySelector('.popup__container');
  console.log(showCardContainer.classList);
  showCardContainer.classList.add('popup__container_show_card');
  popupShowCard.querySelector('.popup__image').src = evt.target.getAttribute('src');
  popupShowCard.querySelector('.popup__image').alt = evt.target.getAttribute('alt');
  popupShowCard.querySelector('.popup__caption').textContent = evt.target.getAttribute('alt');
}));



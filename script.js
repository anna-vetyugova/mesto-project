const page = document.querySelector('.page');

const popupEdit = page.querySelector('.popup_profile_edit');
const editButton = page.querySelector('.profile__edit-button');

const popupAdd = page.querySelector('.popup_card_add');
const addButton = page.querySelector('.profile__add-button');

const popupShowCard = page.querySelector('.popup_card_show');

// получим значение профиля
let profileName = page.querySelector('.profile__title');
let profileJob = page.querySelector('.profile__subtitle');

// имя и описание формы (модальное окно)
let nameInput = popupEdit.querySelector('.popup__form-field_type_name'); 
let jobInput = popupEdit.querySelector('.popup__form-field_type_description');

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
  const closeButton = page.querySelector('div.popup_opened .popup__close-icon');
  closeButton.addEventListener('click', closePopup);
};
editButton.addEventListener('click', evt => openPopup(popupEdit));
addButton.addEventListener('click', evt => openPopup(popupAdd));

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
  cardsArray.forEach((item, index, arr) => {
    const cardTemplate = document.querySelector('#card').content;
    const cardTemplateNew = cardTemplate.querySelector('.card').cloneNode(true);
    cardTemplateNew.querySelector('.card__photo').src = cardsArray[index].link;
    cardTemplateNew.querySelector('.card__photo').alt = cardsArray[index].name;
    cardTemplateNew.querySelector('.card__text').textContent = cardsArray[index].name;
    if (newElement == true) {
      cardList.prepend(cardTemplateNew);
    } 
    else cardList.append(cardTemplateNew);

    cardTemplateNew.querySelector('.card__like').addEventListener('click', evt => {
      evt.target.classList.toggle('card__like_active');
    });

    cardTemplateNew.querySelector('.card__trash').addEventListener('click', evt => {
      const cardItem = evt.target.closest('li');
      cardItem.remove();
    });
  });

  const openCards = page.querySelectorAll('.card__photo');
  openCards.forEach(evt => evt.addEventListener("click", evt => {
    openPopup(popupShowCard);
    const showCardContainer = popupShowCard.querySelector('.popup__container');
    showCardContainer.classList.add('popup__container_opened');
    popupShowCard.querySelector('.popup__image').src = evt.target.getAttribute('src');
    popupShowCard.querySelector('.popup__image').alt = evt.target.getAttribute('alt');
    popupShowCard.querySelector('.popup__caption').textContent = evt.target.getAttribute('alt');
  }));

};
updateCards(initialCards, false);

const formElementAdd = popupAdd.querySelector('.popup__form');
function handleFormAddSubmit(evt) {
    evt.preventDefault(); 
    let namePlace = formElementAdd.querySelector('.popup__form-field_place_name'); 
    let placeLink = formElementAdd.querySelector('.popup__form-field_place_link');
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
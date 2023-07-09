let page = document.querySelector('.page');
let popup = page.querySelector('.popup');

let popupEdit = page.querySelector('.popup_profile_edit');
let editButton = page.querySelector('.profile__edit-button');

let popupAdd = page.querySelector('.popup_place_add');
let addButton = page.querySelector('.profile__add-button');

// получим значение профиля
let profileName = page.querySelector('.profile__title');
let profileJob = page.querySelector('.profile__subtitle');

// имя и описание формы (модальное окно)
let nameInput = popupEdit.querySelector('.popup__form-field_type_name'); 
let jobInput = popupEdit.querySelector('.popup__form-field_type_description');
let namePlace = popupAdd.querySelector('.popup__form-field_palce_name'); 
let placeLink = popupAdd.querySelector('.popup__form-field_place_link');

function openPopup(modalType) {
  modalType.classList.add('popup_opened');
  if (modalType.classList.contains('popup_profile_edit')) {
    nameInput.setAttribute('value', profileName.textContent);
    jobInput.setAttribute('value',profileJob.textContent);
  };

  let closeButton = page.querySelector('div.popup_opened .popup__close-icon');
  closeButton.addEventListener('click', closePopup);
};
function closePopup() {
  let modalType = page.getElementsByClassName('popup_opened');
  modalType[0].classList.remove('popup_opened');
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

<<<<<<< HEAD

=======
>>>>>>> develop
function updateCards(placePosition, cardsArray) {
let cardList = page.querySelector('.elements__photo-grid');
for(i=0; i < cardsArray.length; i++) {
  cardLink = cardsArray[i].link;
  cardName = cardsArray[i].name;
  const cardTemplate = `<li>
                          <article class="card">
<<<<<<< HEAD
=======
                            <img class="card__trash" src="./images/__trash.svg" alt="Иконка для удаления карточки">
>>>>>>> develop
                            <img class="card__photo" src="${cardLink}" alt="${cardName}">
                            <div class="card__title">
                              <h2 class="card__text">${cardName}</h2>
                              <button type="button" name="likeButton" aria-label="Кнопка проставления лайка" class="card__like"></button>
                            </div>
                          </article>
                        </li>`;
  cardList.insertAdjacentHTML(placePosition, cardTemplate);
};
};
updateCards('beforeend', initialCards);

const formElementAdd = popupAdd.querySelector('.popup__form');
function handleFormAddSubmit(evt) {
    evt.preventDefault(); 
    let newCard = new Object();
<<<<<<< HEAD

=======
>>>>>>> develop
    newCard.name = namePlace.value;
    newCard.link = placeLink.value;
    let newCardArray = [];
    newCardArray.push(newCard);
    updateCards('afterbegin', newCardArray);
    closePopup();
};
formElementAdd.addEventListener('submit', handleFormAddSubmit); 

const elements = document.querySelector('.elements');
const like = elements.querySelectorAll('.card__like');
like.forEach(element => element.addEventListener("click", event => {
  event.preventDefault();
  let likeIndex = Array.prototype.indexOf.call(like, event.target);
  if (like[likeIndex].classList.contains('card__like_active')) {
    like[likeIndex].classList.remove('card__like_active');
  }
  else {
    like[likeIndex].classList.add('card__like_active');
  }
}, false));

const deleteIcon = elements.querySelectorAll('.card__trash');
let cards = page.querySelectorAll('li')
deleteIcon.forEach(element => element.addEventListener("click", event => {
  event.preventDefault();
  let deleteCardIndex = Array.prototype.indexOf.call(deleteIcon, event.target);
  cards[deleteCardIndex].remove();
}, false));

const cardPhoto = elements.querySelectorAll('.card__photo');
cardPhoto.forEach(element => element.addEventListener("click", event => {
  event.preventDefault();
  let cardIndex = Array.prototype.indexOf.call(cardPhoto, event.target);
  let cardList = page.querySelectorAll('.card__photo');
  cardLink = cardList[cardIndex].getAttribute('src');
  cardName = cardList[cardIndex].getAttribute('alt');

  const photoPopup = `<div class="popup__container">
                        <button type="button" name="closeButton" class="popup__close-icon" aria-label="Кнопка закрытия модального окна"></button>
                        <figure>
                          <img src="${cardLink}" alt="${cardName}">
                          <figcaption>${cardName}</figcaption>
                        </figure>
                      </div>`;

}, false));



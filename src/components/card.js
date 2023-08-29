import { profileName } from './constants.js';

export class Card {
  #templateSelector;
  #cardElement;
  #handleLikeButton;
  #handlePopupCardShow;
  #handleDeleteIcon;
  #handleLikeCounter;

  constructor( { name, link, likes, owner, _id }, handleLikeButton, handlePopupCardShow, handleDeleteIcon, selector ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._ownerId = owner._id;
    this._cardId = _id;

    this.#templateSelector = selector;
    this.#handleLikeButton = handleLikeButton;
    this.#handlePopupCardShow = handlePopupCardShow;
    this.#handleDeleteIcon = handleDeleteIcon;
  }
  #getTemplate() {
    return this.#templateSelector.content.querySelector('.card').cloneNode(true);
  }
  generate() {
    this.#cardElement = this.#getTemplate();
    this.#setEventListeners();

    const cardTemplatePhoto = this.#cardElement.querySelector('.card__photo');
    const cardTemplateText = this.#cardElement.querySelector('.card__text');
    const cardTemplateDeleteIcon = this.#cardElement.querySelector('.card__trash');
    const cardTemplateLikeButton = this.#cardElement.querySelector('.card__like');
    const cardTemplateLikeCounter = this.#cardElement.querySelector('.card__like-counter');

    cardTemplatePhoto.src = this._link;
    cardTemplatePhoto.alt = this._name;
    cardTemplateText.textContent = this._name;
    cardTemplateLikeCounter.textContent = this._likes.length;

    this.#cardElement.setAttribute('card-id', this._cardId);
    cardTemplateDeleteIcon.setAttribute('owner-id', this._ownerId);

    if (this._likes.length > 0) {
      this._likes.forEach((item) => {
        if (item._id === this.getProfileId()) {
          cardTemplateLikeButton.classList.add('card__like_active');
        }
      }) 
    } else {
      cardTemplateLikeCounter.classList.add('card__like-counter_hidden'); 
      cardTemplateLikeCounter.textContent = 0;
    }
  
    this.#handleDeleteIcon(this, cardTemplateDeleteIcon);

    // обработчик для открытия попапа 
    cardTemplatePhoto.addEventListener('click', evt => {
      this.#handlePopupCardShow(evt);
    });

    return this.#cardElement;
  }
  
  #setEventListeners(){
    this.#cardElement.querySelector('.card__like').addEventListener('click', evt => {
      const cardTemplatePhotoID = this.#cardElement.getAttribute('card-id');
      const cardTemplateLikeCounter = this.#cardElement.querySelector('.card__like-counter');
      this.#handleLikeButton(cardTemplatePhotoID, evt.target, cardTemplateLikeCounter);
    });
  }

  getProfileId() {
    return profileName.getAttribute('user-id');
  }
  getCardOwnerId() {

  }
}

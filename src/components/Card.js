import { profileName } from './constants.js';
export class Card {
  #name; #link; #likes; #ownerId; #cardId;
  #templateSelector;
  #cardElement;
  #handleLikeButton;
  #handleCardClick;
  #handleDeleteIcon;
  constructor( { name, link, likes, owner, _id }, handleLikeButton, handleCardClick, handleDeleteIcon,selector ) {
    this.#name = name;
    this.#link = link;
    this.#likes = likes;
    this.#ownerId = owner._id;
    this.#cardId = _id;

    this.#templateSelector = selector;
    this.#handleLikeButton = handleLikeButton;
    this.#handleCardClick = handleCardClick;
    this.#handleDeleteIcon = handleDeleteIcon;
  }
  #getTemplate() {
    return this.#templateSelector.content.querySelector('.card').cloneNode(true);
  }
  #setTemplateData(){
    const cardTemplatePhoto = this.#cardElement.querySelector('.card__photo');
    const cardTemplateText = this.#cardElement.querySelector('.card__text');
    const cardTemplateDeleteIcon = this.#cardElement.querySelector('.card__trash');
    const cardTemplateLikeButton = this.#cardElement.querySelector('.card__like');
    const cardTemplateLikeCounter = this.#cardElement.querySelector('.card__like-counter');

    cardTemplatePhoto.src = this.#link;
    cardTemplatePhoto.alt = this.#name;
    cardTemplateText.textContent = this.#name;
    cardTemplateLikeCounter.textContent = this.#likes.length;

    this.#cardElement.setAttribute('card-id', this.#cardId);
    cardTemplateDeleteIcon.setAttribute('owner-id', this.#ownerId);

    if (this.#likes.length > 0) {
      this.#likes.forEach((item) => {
        if (item._id === this.getProfileId()) {
          cardTemplateLikeButton.classList.add('card__like_active');
        }
      }) 
    } else {
      cardTemplateLikeCounter.classList.add('card__like-counter_hidden'); 
      cardTemplateLikeCounter.textContent = 0;
    }
  }
  #setEventListeners(evt){
    this.#cardElement.querySelector('.card__like').addEventListener('click', evt => {
      const cardTemplatePhotoID = this.#cardElement.getAttribute('card-id');
      const cardTemplateLikeCounter = this.#cardElement.querySelector('.card__like-counter');
      this.#handleLikeButton(cardTemplatePhotoID, evt.target, cardTemplateLikeCounter);
    });
    // обработчик для открытия попапа 
    this.#cardElement.querySelector('.card__photo').addEventListener('click', evt => {
      this.#handleCardClick(this);
    });
  }
  generate() {
    this.#cardElement = this.#getTemplate();
    this.#setTemplateData();
    this.#handleDeleteIcon(this.getCardId(), this.#cardElement.querySelector('.card__trash'));
    this.#setEventListeners(); 
    return this.#cardElement;
  }
  getProfileId() {
    return profileName.getAttribute('user-id');
  }
  getCardImage() {
    return this.#cardElement.querySelector('.card__photo').src;
  }
  getCardName() {
    return this.#cardElement.querySelector('.card__text').textContent;
  }
  getCardId(){
    return this.#cardElement.getAttribute('card-id');
  }
}
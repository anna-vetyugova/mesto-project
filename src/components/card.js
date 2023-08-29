import { popupCardShow, cardTemplate, popupCardShowImage, popupCardShowImageCaption, profileName, popupCardDelete, confirmButton } from './constants.js';
import { openPopup } from './modal.js';
import { api } from './api.js'


export class Card {
  constructor({name, link, likes, owner, _id}, selector) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._ownerId = owner._id;
    this._cardId = _id;
    this._selector = selector;
  }
  _creatCard() {
    return this._selector.querySelector('.card').cloneNode(true);
  }
  generate() {
    this._element = this._creatCard();
    this._setEventListeners();

    const cardTemplatePhoto = this._element.querySelector('.card__photo');
    const cardTemplateText = this._element.querySelector('.card__text');
    const cardTemplateDeleteIcon = this._element.querySelector('.card__trash');
    const cardTemplateLikeButton = this._element.querySelector('.card__like');
    const cardTemplateLikeCounter = this._element.querySelector('.card__like-counter');

    cardTemplatePhoto.src = this._link;
    cardTemplatePhoto.alt = this._name;
    cardTemplateText.textContent = this._name;
    cardTemplateLikeCounter.textContent = this._likes.length;

    this._element.setAttribute('card-id', this._cardId);
    

    cardTemplateDeleteIcon.setAttribute('owner-id', this._ownerId);
    const profileUserId = profileName.getAttribute('user-id');

    if (this._likes.length > 0) {
      this._likes.forEach((item) => {
        if (item._id === profileUserId) {
          cardTemplateLikeButton.classList.add('card__like_active');
        }
      }) 
    } else {
      cardTemplateLikeCounter.classList.add('card__like-counter_hidden'); 
      cardTemplateLikeCounter.textContent = 0;
    }
  
  
    if (this._ownerId != profileUserId) {
      cardTemplateDeleteIcon.classList.add('card__trash_hidden');
    }
    else {
      cardTemplateDeleteIcon.addEventListener('click', () => {
        openPopup(popupCardDelete);
        confirmButton.setAttribute('card-id', this._cardId);
      });
    }

    // обработчик для открытия попапа 
    cardTemplatePhoto.addEventListener('click', evt => {
      openPopup(popupCardShow);
      popupCardShowImage.src = evt.target.getAttribute('src');
      popupCardShowImage.alt = evt.target.getAttribute('alt');
      popupCardShowImageCaption.textContent = evt.target.getAttribute('alt');
    });
    return this._element;
  };

  _manageLikeButton(cardId, likeButton, itemLikes) {
    if (likeButton.classList.contains('card__like_active')) {
      api.deleteLike(cardId, likeButton, itemLikes)
        .then((res) => {
          likeButton.classList.remove('card__like_active');
          return res.likes.length;
        })
        .then((currentLikes) => {
          itemLikes.textContent = currentLikes;
          if(itemLikes.textContent === '0'){
            itemLikes.classList.add('card__like-counter_hidden');
          }
        })
        .catch(console.error)
    }
    else {
      api.addLike(cardId, likeButton, itemLikes)
        .then((res) => {
          likeButton.classList.add('card__like_active');
          return res.likes.length;
        })
        .then((currentLikes) => {
          itemLikes.textContent = currentLikes;
          itemLikes.classList.remove('card__like-counter_hidden');
        })
        .catch(console.error)
    }
  };
  
  _setEventListeners(){
    this._element.querySelector('.card__like').addEventListener('click', evt => {
      const cardTemplatePhotoID = this._element.getAttribute('card-id');
      const cardTemplateLikeCounter = this._element.querySelector('.card__like-counter');
      this._manageLikeButton(cardTemplatePhotoID, evt.target, cardTemplateLikeCounter);
    });
  }
}

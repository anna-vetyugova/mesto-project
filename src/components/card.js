import { popupCardShow, cardTemplate, popupCardShowImage, popupCardShowImageCaption, profileName, popupCardDelete, confirmButton } from './constants.js';
import { openPopup } from './modal.js';
import { deleteCard } from './api.js';
import { manageLikeButton, renderLoading } from './utils.js'; 

export function createCard(title, imageLink, itemLikes, userId, cardId) {
  const cardTemplateNew = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTemplatePhoto = cardTemplateNew.querySelector('.card__photo');
  const cardTemplateText = cardTemplateNew.querySelector('.card__text');
  const cardTemplateDeleteIcon = cardTemplateNew.querySelector('.card__trash');
  const cardTemplateLikeButton = cardTemplateNew.querySelector('.card__like');
  const cardTemplateLikeCounter = cardTemplateNew.querySelector('.card__like-counter');

  cardTemplatePhoto.src = imageLink;
  cardTemplatePhoto.alt = title;
  cardTemplatePhoto.setAttribute('user-id', cardId);
  cardTemplateText.textContent = title; 
  cardTemplateLikeCounter.textContent = itemLikes.length;
  cardTemplateDeleteIcon.setAttribute('user-id', userId);
  
  if (itemLikes.length > 0) {
    itemLikes.forEach((item) => {
      if (item._id === profileName.getAttribute('user-id')) {
        cardTemplateLikeButton.classList.add('card__like_active');
      }
    });
  }
  else {
    cardTemplateLikeCounter.classList.add('card__like-counter_hidden');
    cardTemplateLikeCounter.textContent = 0;
  }

  cardTemplateNew.querySelector('.card__like').addEventListener('click', evt => {
    manageLikeButton(cardTemplatePhoto.getAttribute('user-id'), evt.target, cardTemplateLikeCounter);
  });

  if (userId != profileName.getAttribute('user-id')) {
    cardTemplateNew.querySelector('.card__trash').classList.add('card__trash_hidden');
  }
  else {
    cardTemplateNew.querySelector('.card__trash').addEventListener('click', evt => {
      const cardItem = evt.target.closest('li');
      openPopup(popupCardDelete);
      renderLoading(false, popupCardDelete);
      confirmButton.addEventListener('click', (evt) => {
        renderLoading(true, popupCardDelete);
        deleteCard(cardTemplatePhoto.getAttribute('user-id'), cardItem);
      }, { once: true });
    });
  }

  cardTemplatePhoto.addEventListener('click', evt => {
    openPopup(popupCardShow);
    popupCardShowImage.src = evt.target.getAttribute('src');
    popupCardShowImage.alt = evt.target.getAttribute('alt');
    popupCardShowImageCaption.textContent = evt.target.getAttribute('alt');
  });
  return cardTemplateNew;
};
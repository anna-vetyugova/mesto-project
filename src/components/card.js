import { popupCardShow, cardTemplate, popupCardShowImage, popupCardShowImageCaption, profileName, popupCardDelete, confirmButton } from './constants.js';
import { openPopup } from './modal.js';
import { deleteLike, addLike } from './api.js'

export function manageLikeButton(cardId, likeButton, itemLikes) {
  if (likeButton.classList.contains('card__like_active')) {
    deleteLike(cardId, likeButton, itemLikes)
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
    addLike(cardId, likeButton, itemLikes)
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

export function createCard(title, imageLink, itemLikes, ownerId, cardId) {
  const cardTemplateNew = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTemplatePhoto = cardTemplateNew.querySelector('.card__photo');
  const cardTemplateText = cardTemplateNew.querySelector('.card__text');
  const cardTemplateDeleteIcon = cardTemplateNew.querySelector('.card__trash');
  const cardTemplateLikeButton = cardTemplateNew.querySelector('.card__like');
  const cardTemplateLikeCounter = cardTemplateNew.querySelector('.card__like-counter');

  cardTemplatePhoto.src = imageLink;
  cardTemplatePhoto.alt = title;
  cardTemplatePhoto.setAttribute('card-id', cardId);
  const cardTemplatePhotoID = cardTemplatePhoto.getAttribute('card-id');
  cardTemplateText.textContent = title; 
  cardTemplateLikeCounter.textContent = itemLikes.length;
  cardTemplateDeleteIcon.setAttribute('owner-id', ownerId);
  const profileUserId = profileName.getAttribute('user-id');

  if (itemLikes.length > 0) {
    itemLikes.forEach((item) => {
      if (item._id === profileUserId) {
        cardTemplateLikeButton.classList.add('card__like_active');
      }
    });
  }
  else {
    cardTemplateLikeCounter.classList.add('card__like-counter_hidden');
    cardTemplateLikeCounter.textContent = 0;
  }

  cardTemplateNew.querySelector('.card__like').addEventListener('click', evt => {
    manageLikeButton(cardTemplatePhotoID, evt.target, cardTemplateLikeCounter);
  });

  if (ownerId != profileUserId) {
    cardTemplateDeleteIcon.classList.add('card__trash_hidden');
  }
  else {
    cardTemplateDeleteIcon.addEventListener('click', () => {
      openPopup(popupCardDelete);
      confirmButton.setAttribute('card-id', cardId);
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


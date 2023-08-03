import { popupCardShow, cardsList, cardTemplate, popupCardShowImage, popupCardShowImageCaption } from './constants.js';
import { openPopup } from './modal.js';

export function createCard(title, imageLink) {
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

export function addCard(cardName, cardLink, order) {
  const card = createCard(cardName, cardLink);
  return order === 'append' ? cardsList.append(card) : cardsList.prepend(card);
};
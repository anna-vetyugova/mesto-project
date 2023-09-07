import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  #popupCardShowImage;
  #popupCardShowImageCaption;

  constructor(popupElement){
    super(popupElement);
    this.#popupCardShowImage = popupElement.querySelector('.popup__image');
    this.#popupCardShowImageCaption = popupElement.querySelector('.popup__caption');
  }
  openPopup(cardName, cardLink) {
    this.#popupCardShowImage.src = cardLink;
    this.#popupCardShowImage.alt = cardName;
    this.#popupCardShowImageCaption.textContent = cardName;
    super.openPopup();
  }
}
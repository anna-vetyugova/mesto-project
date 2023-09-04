import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  #popupCardShowImage;
  #popupCardShowImageCaption;
  #cardElement;
  constructor(popupSelector, cardElement){
    super(popupSelector);
    this.#cardElement = cardElement;
    this.#popupCardShowImage = popupSelector.querySelector('.popup__image');
    this.#popupCardShowImageCaption = popupSelector.querySelector('.popup__caption');
  }
  openPopup() {
    this.#popupCardShowImage.src = this.#cardElement.getCardImage();
    this.#popupCardShowImage.alt = this.#cardElement.getCardName();
    this.#popupCardShowImageCaption.textContent = this.#cardElement.getCardName();
    super.openPopup();
  }

}
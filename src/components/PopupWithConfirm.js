import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
  #deletedCardId;
  #handleCardDelete;
  #confirmButton;
  #cardItemContainer;
  #cardElementId;
  constructor(popupElement, handleCardDelete, confirmButtonSelector){
    super(popupElement);
    this.#handleCardDelete = handleCardDelete;
    this.#confirmButton = popupElement.querySelector(confirmButtonSelector);
  }
  openPopup(cardItem, cardItemContainer, cardElementId) {
    this.#deletedCardId = cardItem;
    this.#cardItemContainer = cardItemContainer;
    this.#cardElementId = cardElementId;
    super.openPopup();
  }
  setEventListeners(){
    super.setEventListeners();
    this.#confirmButton.addEventListener('click', () => {
      this.#handleCardDelete(this.#deletedCardId, this.#cardItemContainer, this.#cardElementId);
    });
  }
}
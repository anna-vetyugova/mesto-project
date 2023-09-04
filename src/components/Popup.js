export class Popup {
  #popupSelector;
  #closePopupButton;
  #deletedCardId;
  constructor(popupSelector){
    this.#popupSelector = popupSelector;
    this.#closePopupButton = this.#popupSelector.querySelector('.popup__close-icon');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlay = this._handleOverlay.bind(this);
    this.#deletedCardId = this.#deletedCardId;
  }
  _handleEscClose(event){
    if (event.key === 'Escape') {
      this.closePopup();
    };
  };
  _handleOverlay(event){
    if (event.target.classList.contains("popup_opened")) {
      this.closePopup();
    }
  }
  openPopup(){
    this.#popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this.#popupSelector.addEventListener('click', this._handleOverlay);
  }
  closePopup(){
    this.#popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this.#popupSelector.removeEventListener('click', this._handleOverlay);
  }
  setEventListeners(){
    this.#closePopupButton.addEventListener('click', () => {
      this.closePopup();
    });
    return this.#popupSelector;
  }
}
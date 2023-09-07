export class Popup {
  #popupElement;
  #closePopupButton;

  constructor(popupElement){
    this.#popupElement = popupElement;
    this.#closePopupButton = this.#popupElement.querySelector('.popup__close-icon');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlay = this._handleOverlay.bind(this);
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
    this.#popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this.#popupElement.addEventListener('click', this._handleOverlay);
  }
  closePopup(){
    this.#popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this.#popupElement.removeEventListener('click', this._handleOverlay);
  }
  setEventListeners(){
    this.#closePopupButton.addEventListener('click', () => {
      this.closePopup();
    });
    return this.#popupElement;
  }
}
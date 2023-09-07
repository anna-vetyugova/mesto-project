import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  #handelFormSubmitRequest;
  #formSelector;
  #formInputs;
  #formValues;
  constructor(popupElement, handelFormSubmitRequest){
    super(popupElement);
    this.#formSelector = popupElement.querySelector('.popup__form');
    this.#handelFormSubmitRequest = handelFormSubmitRequest;
    this.#formInputs = this.#formSelector.querySelectorAll('.popup__form-field');
  }
  renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...'){
    if(isLoading) {
      button.textContent = loadingText;
    }
    else {
      button.textContent = buttonText;
    }
  };
  #getInputValues(){
    this.#formValues = {};
    Array.from(this.#formInputs)
      .filter((item) => !!item.value)
      .forEach((element) => {
        this.#formValues[element.name] = element.value;
      })
    return this.#formValues;
  };
  #handleFormSubmit(evt, loadingText = "Сохранение..."){
    evt.preventDefault(); 
    this.#handelFormSubmitRequest(this.#getInputValues(), evt);
  }
  setEventListeners() {
    this.#formSelector.addEventListener('submit', (evt) => {
      this.#handleFormSubmit(evt);
    }); 
    super.setEventListeners();
  }
  closePopup(){
    super.closePopup();
    this.#formSelector.reset();
  }
}
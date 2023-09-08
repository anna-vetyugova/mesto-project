import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  #handelFormSubmitRequest;
  #formElement;
  #formInputs;
  #formValues;
  #submitButton;
  constructor(popupElement, handelFormSubmitRequest){
    super(popupElement);
    this.#formElement = popupElement.querySelector('.popup__form');
    this.#handelFormSubmitRequest = handelFormSubmitRequest;
    this.#formInputs = this.#formElement.querySelectorAll('.popup__form-field');
    this.#submitButton = popupElement.querySelector('.popup__form-button');
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
    this.#handelFormSubmitRequest(this.#getInputValues(), this.#submitButton);
  }
  setEventListeners() {
    this.#formElement.addEventListener('submit', (evt) => {
      this.#handleFormSubmit(evt);
    }); 
    super.setEventListeners();
  }
  closePopup(){
    super.closePopup();
    this.#formElement.reset();
  }
}
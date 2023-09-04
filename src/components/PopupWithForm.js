import { Popup } from "./Popup.js";
import { updateValidation } from "./index.js";

export class PopupWithForm extends Popup {
  #popupSelector;
  #handelFormSubmitRequest;
  #formSelector;
  constructor(popupSelector, handelFormSubmitRequest){
    super(popupSelector);
    this.#popupSelector = popupSelector;
    this.#formSelector = this.#popupSelector.querySelector('.popup__form');
    this.#handelFormSubmitRequest = handelFormSubmitRequest;
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
    const { elements } = this.#formSelector;
    const formData = Array.from(elements)
      .filter((item) => !!item.value)
      .map((element) => {
        const { name, value } = element
        return { name, value }
      })
    return formData;
  };
  #handleFormSubmit(evt, loadingText = "Сохранение..."){
    evt.preventDefault(); 
    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;
    this.renderLoading(true, submitButton, initialText, loadingText);
    this.#handelFormSubmitRequest(this.#getInputValues())
      .then(() => {
        this.closePopup();
      })
      .catch(console.error)
      .finally(() => {
        this.renderLoading(false, submitButton, initialText);
      });
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
    updateValidation(this.#formSelector);
  }
}
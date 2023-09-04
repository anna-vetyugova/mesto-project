export class FormValidator {
  #inputSelector; 
  #submitButtonSelector; 
  #inactiveButtonClass; 
  #inputErrorClass; 
  #errorClass;
  #formSelector;

  constructor({ inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }, formSelector){
    this.#formSelector = formSelector;
    this.#inputSelector = inputSelector;
    this.#submitButtonSelector = submitButtonSelector;
    this.#inactiveButtonClass = inactiveButtonClass;
    this.#inputErrorClass = inputErrorClass;
    this.#errorClass = errorClass;
  }
  #showInputError(formElement, formInput, errorMessage, inputErrorClass, errorClass){
    const errorElement = formElement.querySelector(`.${formInput.id}_error`);
    formInput.classList.add(inputErrorClass); 
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  
  };
  hideInputError(formElement, formInput, inputErrorClass, errorClass){
    const errorElement = formElement.querySelector(`.${formInput.id}_error`);
    formInput.classList.remove(inputErrorClass); 
    errorElement.classList.remove(errorClass); 
    errorElement.textContent = '';
  };
  #isValid(formElement, formInput, inputErrorClass, errorClass){
    if(formInput.validity.patternMismatch) {
      formInput.setCustomValidity(formInput.dataset.errorMessage);
    }
    else {
      formInput.setCustomValidity("");
    };
    if(!formInput.validity.valid) {
      this.#showInputError(formElement, formInput, formInput.validationMessage, inputErrorClass, errorClass);
    }
    else {
      this.hideInputError(formElement, formInput, inputErrorClass, errorClass);
    }
  };
  #changeButtonState(formInputs, buttonElement, inactiveButtonClass) {
    const result = formInputs.some( (formInput) => formInput.validity.valid === false);
    if (!result) {
      buttonElement.removeAttribute("disabled");
      buttonElement.classList.remove(inactiveButtonClass);
    }
    else {
      buttonElement.setAttribute("disabled", true);
      buttonElement.classList.add(inactiveButtonClass);
    };
  };
  #setEventListeners(){
    const formInputs = Array.from(this.#formSelector.querySelectorAll(this.#inputSelector));
    const buttonElement = this.#formSelector.querySelector(this.#submitButtonSelector);
    this.#changeButtonState(formInputs, buttonElement, this.#inactiveButtonClass);
    formInputs.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this.#isValid(this.#formSelector, formInput, this.#inputErrorClass, this.#errorClass);  
        this.#changeButtonState(formInputs, buttonElement, this.#inactiveButtonClass);
      }); 
    });
  };

  enableValidation(){
    this.#setEventListeners(this.#formSelector);
  };

};
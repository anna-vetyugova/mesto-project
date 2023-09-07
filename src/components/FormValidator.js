export class FormValidator {
  #inactiveButtonClass; 
  #inputErrorClass; 
  #errorClass;
  #formSelector;
  #submitButton;
  #formInputs;
  constructor({ inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }, formSelector){
    this.#formSelector = formSelector;
    this.#inactiveButtonClass = inactiveButtonClass;
    this.#inputErrorClass = inputErrorClass;
    this.#errorClass = errorClass;

    this.#submitButton = formSelector.querySelector(submitButtonSelector);
    this.#formInputs = Array.from(this.#formSelector.querySelectorAll(inputSelector));
    
  }
  #showInputError(formInput, errorMessage, inputErrorClass, errorClass, errorElement){
    formInput.classList.add(inputErrorClass); 
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };
  #hideInputError(formInput, inputErrorClass, errorClass, errorElement){
    formInput.classList.remove(inputErrorClass); 
    errorElement.classList.remove(errorClass); 
    errorElement.textContent = '';
  };
  #isValid(formElement, formInput, inputErrorClass, errorClass){
    const errorElement = formElement.querySelector(`.${formInput.id}_error`);
    if(formInput.validity.patternMismatch) {
      formInput.setCustomValidity(formInput.dataset.errorMessage);
    }
    else {
      formInput.setCustomValidity("");
    };
    if(!formInput.validity.valid) {
      this.#showInputError(formInput, formInput.validationMessage, inputErrorClass, errorClass, errorElement);
    }
    else {
      this.#hideInputError(formInput, inputErrorClass, errorClass, errorElement);
    }
  };
  #changeButtonState(inactiveButtonClass) {
    const result = this.#formInputs.some( (formInput) => formInput.validity.valid === false);
    if (!result) {
      this.#submitButton.removeAttribute("disabled");
      this.#submitButton.classList.remove(inactiveButtonClass);
    }
    else {
      this.#submitButton.setAttribute("disabled", true);
      this.#submitButton.classList.add(inactiveButtonClass);
    };
  };
  #setEventListeners(){
    this.#changeButtonState(this.#inactiveButtonClass);
    this.#formInputs.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this.#isValid(this.#formSelector, formInput, this.#inputErrorClass, this.#errorClass);  
        this.#changeButtonState(this.#inactiveButtonClass);
      }); 
    });
  };
  updateValidation(){
    this.#changeButtonState(this.#inactiveButtonClass);
    this.#formInputs.forEach((formInput) => {
      formInput.setCustomValidity('');
      const errorElement = this.#formSelector.querySelector(`.${formInput.id}_error`);
      this.#hideInputError(formInput, this.#inputErrorClass, this.#errorClass, errorElement);
    });
  }
  enableValidation(){
    this.#setEventListeners(this.#formSelector);
  };

};
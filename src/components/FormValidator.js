export class FormValidator {
  #inactiveButtonClass; 
  #inputErrorClass; 
  #errorClass;
  #formElement;
  #submitButton;
  #formInputs;
  constructor({ inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }, formElement){
    this.#formElement = formElement;
    this.#inactiveButtonClass = inactiveButtonClass;
    this.#inputErrorClass = inputErrorClass;
    this.#errorClass = errorClass;

    this.#submitButton = formSelector.querySelector(submitButtonSelector);
    this.#formInputs = Array.from(this.#formSelector.querySelectorAll(inputSelector));
    
  }
  #showInputError(formInput, errorMessage, errorElement){
    formInput.classList.add(this.#inputErrorClass); 
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.#errorClass);
  };
  #hideInputError(formInput, errorElement){
    formInput.classList.remove(this.#inputErrorClass); 
    errorElement.classList.remove(this.#errorClass); 
    errorElement.textContent = '';
  };
  #isValid(formInput){
    const errorElement = this.#formElement.querySelector(`.${formInput.id}_error`);
    if(formInput.validity.patternMismatch) {
      formInput.setCustomValidity(formInput.dataset.errorMessage);
    }
    else {
      formInput.setCustomValidity("");
    };
    if(!formInput.validity.valid) {
      this.#showInputError(formInput, formInput.validationMessage, errorElement);
    }
    else {
      this.#hideInputError(formInput, errorElement);
    }
  };
  #changeButtonState() {
    const result = this.#formInputs.some( (formInput) => formInput.validity.valid === false);
    if (!result) {
      this.#submitButton.removeAttribute("disabled");
      this.#submitButton.classList.remove(this.#inactiveButtonClass);
    }
    else {
      this.#submitButton.setAttribute("disabled", true);
      this.#submitButton.classList.add(this.#inactiveButtonClass);
    };
  };
  #setEventListeners(){
    this.#changeButtonState();
    this.#formInputs.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this.#isValid(formInput );  
        this.#changeButtonState();
      }); 
    });
  };
  updateValidation(){
    this.#changeButtonState();
    this.#formInputs.forEach((formInput) => {
      formInput.setCustomValidity('');
      const errorElement = this.#formElement.querySelector(`.${formInput.id}_error`);
      this.#hideInputError(formInput, errorElement);
    });
  }
  enableValidation(){
    this.#setEventListeners();
  };

};
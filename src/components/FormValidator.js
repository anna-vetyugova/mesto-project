export class FormValidator {
   
  #inputSelector;
  #submitButtonSelector;
  #inactiveButtonClass;
  #inputErrorClass;
  #errorClass;
  #formElement;

  constructor( { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }, formElement) {
    this.#inputSelector = inputSelector; 
    this.#submitButtonSelector = submitButtonSelector;
    this.#inactiveButtonClass = inactiveButtonClass;
    this.#inputErrorClass = inputErrorClass;
    this.#errorClass = errorClass;
    this.#formElement = formElement;
  };

  #showInputError( formInput, errorMessage ){
    const errorElement = this.#formElement.querySelector(`.${formInput.id}_error`); // находим элемент span
    formInput.classList.add(this.#inputErrorClass); // добавляем подчеркивание для input
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.#errorClass);
  };

  #hideInputError(formInput){
    const errorElement = this.#formElement.querySelector(`.${formInput.id}_error`);
    formInput.classList.remove(this.#inputErrorClass); // убираем подчеркивание для input
    errorElement.classList.remove(this.#errorClass); // убираем сообщение об ошибке
    errorElement.textContent = '';
  };

  #isValid(formInput){
    if(formInput.validity.patternMismatch) {
      formInput.setCustomValidity(formInput.dataset.errorMessage);
    }
    else {
      formInput.setCustomValidity("");
    };
    if(!formInput.validity.valid) {
      this.#showInputError( formInput, formInput.validationMessage );
    }
    else {
      this.#hideInputError( formInput );
    }
  };

  #changeButtonState( formInputs, buttonElement ) {
    const result = formInputs.some( (formInput) => formInput.validity.valid === false);
    if (!result) {
      buttonElement.removeAttribute("disabled");
      buttonElement.classList.remove(this.#inactiveButtonClass);
    }
    else {
      buttonElement.setAttribute("disabled", true);
      buttonElement.classList.add(this.#inactiveButtonClass);
    };
  };

  #setEventListeners(){
    const formInputs = Array.from(this.#formElement.querySelectorAll(this.#inputSelector));
    const buttonElement = this.#formElement.querySelector(this.#submitButtonSelector);
    this.#changeButtonState(formInputs, buttonElement, this.#inactiveButtonClass);
    formInputs.forEach((formInput) => {
      formInput.addEventListener('input', (evt) => {
        this.#isValid(formInput);  
        this.#changeButtonState(formInputs, buttonElement, this.#inactiveButtonClass);
      }); 
    });
  };

  enableValidation(){
    this.#setEventListeners(this.#formElement);
  };
}

// export function showInputError(formElement, formInput, errorMessage, inputErrorClass, errorClass){
//   const errorElement = formElement.querySelector(`.${formInput.id}_error`); // находим элемент span
//   formInput.classList.add(inputErrorClass); // добавляем подчеркивание для input
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(errorClass);
// };
export function hideInputError(formElement, formInput, inputErrorClass, errorClass){
  const errorElement = formElement.querySelector(`.${formInput.id}_error`);
  formInput.classList.remove(inputErrorClass); // убираем подчеркивание для input
  errorElement.classList.remove(errorClass); // убираем сообщение об ошибке
  errorElement.textContent = '';
};

// export function isValid(formElement, formInput, inputErrorClass, errorClass){
//   if(formInput.validity.patternMismatch) {
//     formInput.setCustomValidity(formInput.dataset.errorMessage);
//   }
//   else {
//     formInput.setCustomValidity("");
//   };
//   if(!formInput.validity.valid) {
//     showInputError(formElement, formInput, formInput.validationMessage, inputErrorClass, errorClass);
//   }
//   else {
//     hideInputError(formElement, formInput, inputErrorClass, errorClass);
//   }
// };

export function changeButtonState(formInputs, buttonElement, inactiveButtonClass) {
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

// export function setEventListeners(formElement, validationObject){
//   const formInputs = Array.from(formElement.querySelectorAll(validationObject.inputSelector));
//   const buttonElement = formElement.querySelector(validationObject.submitButtonSelector);
//   changeButtonState(formInputs, buttonElement, validationObject.inactiveButtonClass);
//   formInputs.forEach((formInput) => {
//     formInput.addEventListener('input', (evt) => {
//       isValid(formElement, formInput, validationObject.inputErrorClass, validationObject.errorClass);  
//       changeButtonState(formInputs, buttonElement, validationObject.inactiveButtonClass);
//     }); 
//   });
// };
// export function enableValidation(validationObject){
//   const formElements = Array.from(document.querySelectorAll(validationObject.formSelector));
//   formElements.forEach((formElement) => {
//     setEventListeners(formElement, validationObject);
//   });
// };

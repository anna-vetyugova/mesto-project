export function showInputError(formElement, formInput, errorMessage, inputErrorClass, errorClass){
  const errorElement = formElement.querySelector(`.${formInput.id}_error`); // находим элемент span
  formInput.classList.add(inputErrorClass); // добавляем подчеркивание для input
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);

};
export function hideInputError(formElement, formInput, validationObject){
  const errorElement = formElement.querySelector(`.${formInput.id}_error`);
  formInput.classList.remove(validationObject.inputErrorClass); // убираем подчеркивание для input
  errorElement.classList.remove(validationObject.errorClass); // убираем сообщение об ошибке
  errorElement.textContent = '';
};

export function isValid(formElement, formInput, validationObject){
  
  if(formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  }
  else {
    formInput.setCustomValidity("");
  }
  if(!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage, validationObject.inputErrorClass, validationObject.errorClass);
  }
  else {
    hideInputError(formElement, formInput, validationObject);
  }
};

export function changeButtonState(formInputs, buttonElement, inactiveButtonClass) {
  const result = formInputs.some( (formInput) => formInput.validity.valid === false);
  if (!result) {
    buttonElement.removeAttribute("disabled");
    buttonElement.classList.remove(inactiveButtonClass);
  }
  else {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(inactiveButtonClass);
  }
};

export function setEventListeners(formElement, validationObject){
  const formInputs = Array.from(formElement.querySelectorAll(validationObject.inputSelector));
  const buttonElement = formElement.querySelector(validationObject.submitButtonSelector);
  formInputs.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(formElement, formInput, validationObject);  
      if (buttonElement) {
        changeButtonState(formInputs, buttonElement, validationObject.inactiveButtonClass);
      };
    }); 
    formInput.addEventListener('keydown', (evt) => {
      if (evt.key === 'Enter') {
        isValid(formElement, formInput, validationObject);  
        if (buttonElement) {
          changeButtonState(formInputs, buttonElement, validationObject.inactiveButtonClass);
        };
      }
    });  
  });
};
export function enableValidation(validationObject){
  const formElements = Array.from(document.querySelectorAll(validationObject.formSelector));
  formElements.forEach((formElement) => {
    setEventListeners(formElement, validationObject);
  });
};

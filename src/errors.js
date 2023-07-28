
export function showInputError(formElement, formInput, errorMessage){
  const errorElement = formElement.querySelector(`.${formInput.id}_error`); // находим элемент span
  formInput.classList.add('popup__form-field_error'); // добавляем подчеркивание для input
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__form-field_error_active');

};
export function hideInputError(formElement, formInput){
  const errorElement = formElement.querySelector(`.${formInput.id}_error`);
  formInput.classList.remove('popup__form-field_error'); // убираем подчеркивание для input
  errorElement.classList.remove('popup__form-field_error_active'); // убираем сообщение об ошибке
  errorElement.textContent = '';
};
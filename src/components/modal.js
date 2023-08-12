import { page } from './constants.js';
import { handleEscape, handleOverlay } from './utils.js';

export function openPopup(modalType) {
  modalType.classList.add('popup_opened');
  page.addEventListener('keydown', handleEscape);
  modalType.addEventListener('click', handleOverlay);
};
export function closePopup(modalType) {
  modalType.classList.remove('popup_opened');
  page.removeEventListener('keydown', handleEscape);
  modalType.removeEventListener('click', handleOverlay);
}; 
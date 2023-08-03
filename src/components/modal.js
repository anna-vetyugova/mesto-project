import { page } from './constants.js';
import { manageModal } from './utils.js';

export function openPopup(modalType) {
  modalType.classList.add('popup_opened');
  page.addEventListener('keydown', manageModal);
  modalType.addEventListener('click', manageModal);
};
export function closePopup(modalType) {
  modalType.classList.remove('popup_opened');
  page.removeEventListener('keydown', manageModal);
  modalType.removeEventListener('click', manageModal);
}; 
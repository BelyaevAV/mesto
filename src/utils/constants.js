export const popupProfileEdit = document.querySelector('.popup_type_edit');
export const popupCardAdd = document.querySelector('.popup_type_add');
export const popupPhoto = document.querySelector('.popup_type_photo');
export const placeInput = document.querySelector('#place');
export const imgInput = document.querySelector('#place-img');
export const popupAdd = document.querySelector('.profile__add-button');
export const popupEdit = document.querySelector('.profile__edit-button');
export const namePlace = document.querySelector('.profile__name');
export const jobPlace = document.querySelector('.profile__job');
export const nameInput = document.querySelector('#name');
export const jobInput = document.querySelector('#job');
export const photoCards = document.querySelector('.photo-grid');
export const config = {
    FormSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};
export const initialCards =[
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
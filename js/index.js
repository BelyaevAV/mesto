import {initialCards} from './initial-сards.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupEditClose = popupProfileEdit.querySelector('.popup__close');
const editFormElement = popupProfileEdit.querySelector('.popup__form');
const editSave = popupProfileEdit.querySelector('.popup__save');
const popupCardAdd = document.querySelector('.popup_type_add');
const popupAddClose = popupCardAdd.querySelector('.popup__close');
const addFormElement = popupCardAdd.querySelector('.popup__form');
const addButton = popupCardAdd.querySelector('.popup__save');
const popupImage = document.querySelector('.popup_type_photo');
const popupFullClose = popupImage.querySelector('.popup__close');
const placeInput = document.querySelector('#place');
const imgInput = document.querySelector('#place-img');
const popupAdd = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.profile__edit-button');
const namePlace = document.querySelector('.profile__name');
const jobPlace = document.querySelector('.profile__job');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const photoCards = document.querySelector('.photo-grid');
const config = {
    FormSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

function popupToggle (popup) {
    popup.classList.toggle('popup_opened');
};

function RemoveErrors (formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};

function addCloseNoError () {
    popupToggle(popupCardAdd);
    RemoveErrors(addFormElement, placeInput);
    RemoveErrors(addFormElement, imgInput);
    addButton.classList.add('popup__save_inactive');
    addButton.disabled = true;
    addFormElement.reset();
};

function editCloseNoError () {
    RemoveErrors(editFormElement, nameInput);
    RemoveErrors(editFormElement, jobInput);
    editSave.classList.remove('popup__save_inactive');
    editSave.disabled = false;
    popupToggle(popupProfileEdit);
};

popupAdd.addEventListener('click', function() {
    popupToggle(popupCardAdd);
});

popupEdit.addEventListener('click', function() {
    popupToggle(popupProfileEdit);
    jobInput.value = jobPlace.textContent;
    nameInput.value = namePlace.textContent;
});

popupEditClose.addEventListener('click', editCloseNoError);

popupAddClose.addEventListener('click', addCloseNoError);

popupFullClose.addEventListener('click', function() {
    popupToggle(popupImage);
});

document.addEventListener ('click', function(evt) {
    if (evt.target === popupProfileEdit) {
        editCloseNoError();
    };
    if (evt.target === popupCardAdd) {
        addCloseNoError();
     };
    if (evt.target === popupImage) {
       popupToggle(popupImage);
    };
}); 

document.addEventListener ('keydown', function(evt) {
    if (evt.key === 'Escape' && popupProfileEdit.classList.contains('popup_opened')) {
        editCloseNoError();
    };
    if (evt.key === 'Escape' && popupCardAdd.classList.contains('popup_opened')) {
        addCloseNoError();
    };
    if (evt.key === 'Escape' && popupImage.classList.contains('popup_opened')) {
        popupToggle(popupImage);
    };
});

function formSubmitHandlerEdit (evt) {
    evt.preventDefault();
    namePlace.textContent = nameInput.value;
    jobPlace.textContent = jobInput.value;
    popupToggle(popupProfileEdit);
};

editFormElement.addEventListener('submit', formSubmitHandlerEdit);

initialCards.forEach((item) => {
    const card = new Card(item, '.photo-grid__template');
    const cardElement = card.generateCard();
  
    photoCards.append(cardElement);
});

function formSubmitHandlerAdd (evt) {
    evt.preventDefault();
    const card = new Card({name: placeInput.value, link: imgInput.value}, '.photo-grid__template');
    const cardElement = card.generateCard();

    photoCards.prepend(cardElement);;
    addCloseNoError()
};

addFormElement.addEventListener('submit', formSubmitHandlerAdd);

const validationEditInput = new FormValidator(popupProfileEdit, config);
const validationAddInput = new FormValidator(popupCardAdd, config);

validationEditInput.enableValidation();
validationAddInput.enableValidation();
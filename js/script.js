const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupEditClose = popupProfileEdit.querySelector('.popup__close');
const editFormElement = popupProfileEdit.querySelector('.popup__form');
const editSave = popupProfileEdit.querySelector('.popup__save');
const popupCardAdd = document.querySelector('.popup_type_add');
const popupAddClose = popupCardAdd.querySelector('.popup__close');
const addFormElement = popupCardAdd.querySelector('.popup__form');
const addButton = popupCardAdd.querySelector('.popup__save');
const popupImage = document.querySelector('.popup_type_photo');
const popupFullImage = popupImage.querySelector('.popup__full-img');
const popupFullText = popupImage.querySelector('.popup__full-text');
const popupFullClose = popupImage.querySelector('.popup__close');
const placeInput = document.querySelector('#place');
const imgInput = document.querySelector('#place-img');
const popupAdd = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.profile__edit-button');
const namePlace = document.querySelector('.profile__name');
const jobPlace = document.querySelector('.profile__job');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const photoText = document.querySelector('photo-grid__text');
const photoImg = document.querySelector('photo-grid__img');
const photoCards = document.querySelector('.photo-grid');
const cardTemplate = document.querySelector('.photo-grid__template');
const errorSpan = document.querySelector('#name-error');


function popupToggle (popup) {
    popup.classList.toggle('popup_opened');
};

function addCloseNoError () {
    popupToggle(popupCardAdd);
    hideInputError(addFormElement, placeInput);
    hideInputError(addFormElement, imgInput);
    addButton.classList.add('popup__save_inactive');
    addButton.disabled = true;
    addFormElement.reset();
}

function editCloseNoError () {
    hideInputError(editFormElement, nameInput);
    hideInputError(editFormElement, jobInput);
    editSave.classList.remove('popup__save_inactive');
    editSave.disabled = false;
    popupToggle(popupProfileEdit);
}

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

function renderPhoto(card) {
    photoCards.prepend(card);
};

function createCard(name, link) {
    const photoElement = cardTemplate.content.cloneNode(true);
    const photoImg =  photoElement.querySelector('.photo-grid__img');
    photoImg.src = link;
    photoElement.querySelector('.photo-grid__text').textContent = name;
    photoImg.alt = name;
    photoElement.querySelector('.photo-grid__like-button').addEventListener('click', function(evt){
        evt.target.classList.toggle('photo-grid__like-button_liked');
    });
    photoElement.querySelector('.photo-grid__delete-button').addEventListener('click', function(evt){
        evt.target.closest('.photo-grid__element').remove();
    });
    photoImg.addEventListener('click', function(evt) {
        popupToggle(popupImage);
        popupFullImage.src = evt.target.src;
        popupFullImage.alt = evt.target.alt;
        popupFullText.textContent = name;
    })
    return photoElement;
};

initialCards.forEach(function (item){ 
    photoCards.append(createCard(item.name, item.link)); 
}); 

function formSubmitHandlerAdd (evt) {
    evt.preventDefault();
    renderPhoto(createCard(placeInput.value, imgInput.value));
    addCloseNoError()
};

addFormElement.addEventListener('submit', formSubmitHandlerAdd);
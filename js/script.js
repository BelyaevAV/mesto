
const popupProfileEdit = document.querySelector('.popup_type_edit'),
    popupEditClose = popupProfileEdit.querySelector('.popup__close'),
    editFormElement = popupProfileEdit.querySelector('.popup__form'),
    popupCardAdd = document.querySelector('.popup_type_add'),
    popupAddClose = popupCardAdd.querySelector('.popup__close'),
    addFormElement = popupCardAdd.querySelector('.popup__form'),
    popupImage = document.querySelector('.popup_type_photo'),
    popupFullImage = popupImage.querySelector('.popup__full-img'),
    popupFullText = popupImage.querySelector('.popup__full-text'),
    popupFullClose = popupImage.querySelector('.popup__close')
    placeInput = document.querySelector('#place'),
    imgInput = document.querySelector('#place-img'),
    popupAdd = document.querySelector('.profile__add-button'),
    popupEdit = document.querySelector('.profile__edit-button'),
    namePlace = document.querySelector('.profile__name'),
    jobPlace = document.querySelector('.profile__job'),
    nameInput = document.querySelector('#name'),
    jobInput = document.querySelector('#job'),
    photoText = document.querySelector('photo-grid__text'),
    photoImg = document.querySelector('photo-grid__img'),
    photoCards = document.querySelector('.photo-grid'),
    cardTemplate = document.querySelector('.photo-grid__template'),
    initialCards = [
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

function popupToggle (popup) {
    popup.classList.toggle('popup_opened');
 
};

popupAdd.addEventListener('click', function() {
    addFormElement.reset();
    popupToggle(popupCardAdd);
});

popupEdit.addEventListener('click', function() {
    popupToggle(popupProfileEdit);
    jobInput.value = jobPlace.textContent
    nameInput.value = namePlace.textContent
});

popupEditClose.addEventListener('click', function() {
    popupToggle(popupProfileEdit)
} );

popupAddClose.addEventListener('click', function() {
    popupToggle(popupCardAdd)
} );

popupFullClose.addEventListener('click', function() {
    popupToggle(popupImage)
} );

function formSubmitHandlerEdit (evt) {
    evt.preventDefault();
    namePlace.textContent = nameInput.value;
    jobPlace.textContent = jobInput.value;
    popupToggle(popupProfileEdit);
};

editFormElement.addEventListener('submit', formSubmitHandlerEdit);

function photoAdd(name, link) {
    const photoElement = cardTemplate.content.cloneNode(true);
    photoElement.querySelector('.photo-grid__img').src = link;
    photoElement.querySelector('.photo-grid__text').textContent = name;
    photoElement.querySelector('.photo-grid__img').alt = name;
    photoElement.querySelector('.photo-grid__like-button').addEventListener('click', function(evt){
        evt.target.classList.toggle('photo-grid__like-button_liked')
    });
    photoElement.querySelector('.photo-grid__delete-button').addEventListener('click', function(evt){
        evt.target.closest(".photo-grid__element").remove()
    })
    photoElement.querySelector('.photo-grid__img').addEventListener('click', function(evt) {
        popupToggle(popupImage);
        popupFullImage.src = evt.target.closest('.photo-grid__img').src;
        popupFullImage.alt = evt.target.closest('.photo-grid__img').alt;
        popupFullText.textContent = name;

    })
    photoCards.prepend(photoElement)
};

initialCards.forEach(function initialPage(item){
    photoAdd(item.name, item.link);
});

function formSubmitHandlerAdd (evt) {
    evt.preventDefault();
    photoAdd(placeInput.value, imgInput.value);
    popupToggle(popupCardAdd);
};

addFormElement.addEventListener('submit', formSubmitHandlerAdd);
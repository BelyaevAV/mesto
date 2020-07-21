const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupEditClose = popupProfileEdit.querySelector('.popup__close');
const editFormElement = popupProfileEdit.querySelector('.popup__form');
const popupCardAdd = document.querySelector('.popup_type_add');
const popupAddClose = popupCardAdd.querySelector('.popup__close');
const addFormElement = popupCardAdd.querySelector('.popup__form');
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
const initialCards = [
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

function renderPhoto(card) {
    photoCards.prepend(card);
};

function addPhoto(name, link) {
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
    return photoElement
};

initialCards.forEach(function initialPage(item){
    renderPhoto(addPhoto(item.name, item.link));
});

function formSubmitHandlerAdd (evt) {
    evt.preventDefault();
    renderPhoto(addPhoto(placeInput.value, imgInput.value));
    popupToggle(popupCardAdd);
};

addFormElement.addEventListener('submit', formSubmitHandlerAdd);
const popupElement = document.querySelector('.popup_type_photo');
const popupImage = popupElement.querySelector('.popup__full-img');
const popupText = popupElement.querySelector('.popup__full-text');
const popupCloseButton = popupElement.querySelector('.popup__close');

export {Card}

class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.photo-grid__element')
      .cloneNode(true);

    return cardElement;
  };

  _handleOpenPopup() {
    popupImage.src = this._image;
    popupElement.classList.add('popup_opened');
    popupText.textContent = this._title;
  };

  _handleClosePopup() {
    popupImage.src = '';
    popupElement.classList.remove('popup_opened');
    popupText.textContent = '';
  };

  _setEventListeners() {
    this._element.querySelector('.photo-grid__img').addEventListener('click',  () => {
      this._handleOpenPopup();
    });

    popupCloseButton.addEventListener('click', () => {
      this._handleClosePopup();
    });
    
    this._element.querySelector('.photo-grid__like-button').addEventListener('click', () => {
      this._element.querySelector('.photo-grid__like-button').classList.toggle('photo-grid__like-button_liked');
  });

    this._element.querySelector('.photo-grid__delete-button').addEventListener('click', () => {
      this._element.remove();
  });
  };
  
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.photo-grid__img').src = this._image;
    this._element.querySelector('.photo-grid__img').alt = this._title;
    this._element.querySelector('.photo-grid__text').textContent = this._title;

    return this._element;
  };
};
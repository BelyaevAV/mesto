export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.photo-grid__element')
      .cloneNode(true);

    return cardElement;
  };


  _handleLikeIcon() {
    this._element.querySelector('.photo-grid__like-button').classList.toggle('photo-grid__like-button_liked');
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null
  }

  _setEventListeners() {
    this._element.querySelector('.photo-grid__img').addEventListener('click',  () => {
      this._handleCardClick(this._image, this._title);
    });

    this._element.querySelector('.photo-grid__like-button').addEventListener('click', () => {
      this._handleLikeIcon()
  });

    this._element.querySelector('.photo-grid__delete-button').addEventListener('click', () => {
     this._handleDeleteCard()
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
export default class Card {
  constructor(data, cardSelector, myId, handleCardClick, handleDelete, handleLike) {
    this._title = data.name;
    this._image = data.link;
    this._cardId = data._id;
    this._likes = data.likes
    this._owner = data.owner
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._myId = myId;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.photo-grid__element')
      .cloneNode(true);

    return cardElement;
  };
  

  _setEventListeners() {
    this._element.querySelector('.photo-grid__img').addEventListener('click',  () => {
      this._handleCardClick(this._image, this._title);
    });

    this._element.querySelector('.photo-grid__like-button').addEventListener('click', (evt) => {
      this._handleLike(this._cardId, evt)
  });
  };
  
  generateCard() {
    this._element = this._getTemplate();

    const photo = this._element.querySelector('.photo-grid__img');
    
    photo.src = this._image;
    photo.alt = this._title;
    this._element.querySelector('.photo-grid__text').textContent = this._title;
    this._element.querySelector('.photo-grid__like-counter').textContent = this._likes.length;
    if (this._likes.some((like) => like._id === this._myId)) {
      this._element.querySelector('.photo-grid__like-button').classList.add('photo-grid__like-liked');
    }

    if (this._myId === this._owner._id) {
      this._element.querySelector('.photo-grid__delete-button').addEventListener('click', (evt) => {
        this._handleDelete(this._cardId, evt);
      })
    } else {
      this._element.querySelector('.photo-grid__delete-button').remove();
    }

    this._setEventListeners()
    return this._element;
  };
};
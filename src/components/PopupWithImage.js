import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = document.querySelector('.popup__full-img');
    this._text = document.querySelector('.popup__full-text');
  }

  open(link, title) {
    this._image.src = link;
    this._text.textContent = title;
    this._text.alt = title;
    super.open();
  }

  close() {
    super.close();
  }
}
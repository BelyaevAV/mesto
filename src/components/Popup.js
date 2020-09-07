export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._closeButton = this._popup.querySelector('.popup__close')
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.addEventListener('click', this._handleOverlayClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose(this));
    this._popup.removeEventListener('click', this._handleOverlayClose.bind(this));
  }

  _removeErrors() {
    const inputs = Array.from(this._popup.querySelectorAll('.popup__input'));
    inputs.forEach(item => {
      item.classList.remove('popup__input_type_error');
    });

    const errors = Array.from(this._popup.querySelectorAll('.popup__input-error'));
    errors.forEach(item => {
      item.classList.remove('popup__input-error_active');
      item.textConten = null;
    })
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    };
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
  }
}
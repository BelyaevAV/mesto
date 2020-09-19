import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._submit = formSubmitHandler;
  }

  open(card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    this._popup.querySelector('popup_type_confirm').addEventListener('click', (evt) => {
      evt.preventDefault();
      this._submit(this._card);
    });
    super.setEventListeners();
  }
}
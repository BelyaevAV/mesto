import Popup from './Popup.js';

export default class PopupWithFrom extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._submit = formSubmitHandler;
    this._form = popupSelector.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
  };
  
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(item => {
      this._formValues[item.name] = item.value;
    });
    return this._formValues;
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
      this.close();
    });
  };

  close() {
    this._removeErrors();
    this._form.reset();
    super.close();
  }
}
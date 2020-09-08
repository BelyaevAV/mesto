import Popup from './Popup.js';

export default class PopupWithFrom extends Popup {
  constructor(popupSelector, formSubmitHandler, hideErrors) {
    super(popupSelector);
    this._submit = formSubmitHandler;
    this._form = popupSelector.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._hideErrors = hideErrors
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
      this._form.querySelector('.popup__save ').classList.add('popup__save_inactive');
      this._form.querySelector('.popup__save ').disabled = true
    });
  };

  close() {
    this._form.reset();
    this._hideErrors();
    super.close();
  }
}
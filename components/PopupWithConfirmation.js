import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popupContent.querySelector(".popup__form");
    this._handleConfirm = null;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleConfirm();
      this.close();
    });
  }

  // Al abrir, se recibe la función que debe ejecutarse cuando el usuario confirme
  open(handleConfirm) {
    this._handleConfirm = handleConfirm;
    super.open();
  }
}

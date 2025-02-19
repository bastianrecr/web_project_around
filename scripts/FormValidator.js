// FormValidator.js

export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    // Almacena la lista de inputs y el botón de envío
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  // Muestra mensaje de error en un input
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.popup__${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Oculta mensaje de error en un input
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.popup__${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  // Comprueba la validez de un input
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Retorna true si algún input no es válido
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  // Cambia el estado del botón de envío (activo/inactivo)
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  // Añade listeners de evento a cada input
  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Método público para activar la validación
  enableValidation() {
    // Evitar recarga en el submit
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  // --- MÉTODO PARA REINICIAR LA VALIDACIÓN ---
  resetValidation() {
    // Oculta todos los mensajes de error
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    // Restablece el estado del botón (desactivado o activado según inputs)
    this._toggleButtonState();
  }
}

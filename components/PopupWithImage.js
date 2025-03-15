import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // Obtiene las referencias a los elementos donde se mostrará la imagen y la leyenda
    this._imageElement = this._popupContent.querySelector(".popup__image");
    this._captionElement = this._popupContent.querySelector(
      ".popup__image-title"
    );
  }
  // Sobrescribe el método open para inyectar la imagen y la leyenda antes de abrir el popup
  open({ link, name }) {
    // Actualiza el src de la imagen y el texto de la leyenda
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;

    // Llama al método open() de la clase padre para abrir el popup
    super.open();
  }
}

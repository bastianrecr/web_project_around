export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupOverlay = this._popup.querySelector(".popup__overlay");
    this._popupContent = this._popup.querySelector(".popup__content");

    // Vincular el método privado para poder removerlo en el futuro
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Abre el popup y añade el listener para cerrar con Esc
  open() {
    this._popupOverlay.classList.add("popup__overlay_show");
    this._popupContent.classList.add("popup__content_show");
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Cierra el popup y remueve el listener de la tecla Esc
  close() {
    this._popupOverlay.classList.remove("popup__overlay_show");
    this._popupContent.classList.remove("popup__content_show");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Método privado que cierra el popup al pulsar la tecla Esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // Añade los detectores de eventos necesarios
  setEventListeners() {
    const closeButton = this._popupContent.querySelector(
      ".popup__close-button"
    );
    if (closeButton) {
      closeButton.addEventListener("click", () => this.close());
    }

    // Cierra el popup si se hace click en el overlay (área fuera del contenido)
    this._popupOverlay.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popupOverlay) {
        this.close();
      }
    });
  }
}

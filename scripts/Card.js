export class Card {
  constructor({ name, link }, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    // Recibimos como parámetro la función que abrirá el popup de imagen:
    this._handleCardClick = handleCardClick;
  }

  // Obtiene la estructura del template del DOM
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".gallery__post")
      .cloneNode(true);

    return cardElement;
  }

  // Método para alternar la clase de "like" en el botón
  _handleLikeButton() {
    this._likeButton.classList.toggle("gallery__post-like-button_active");
  }

  // Método para eliminar la tarjeta
  _handleDeleteCard() {
    this._element.remove();
    this._element = null; // buena práctica para prevenir fugas de memoria
  }

  // Configura todos los listeners de la tarjeta
  _setEventListeners() {
    // Like
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });
    // Borrar tarjeta
    this._trashButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });
    // Abrir popup de imagen
    this._cardImage.addEventListener("click", () => {
      // Llamar a la función recibida en el constructor (openImagePopup)
      this._handleCardClick(this._link, this._name, this._name);
    });
  }

  // Método público que retorna la tarjeta completamente funcional
  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(".gallery__post-image");
    this._likeButton = this._element.querySelector(
      ".gallery__post-like-button"
    );
    this._trashButton = this._element.querySelector(
      ".gallery__post-trash-button"
    );
    this._cardTitle = this._element.querySelector(".gallery__post-title");

    // Rellenar datos
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    // Listeners
    this._setEventListeners();

    return this._element;
  }
}

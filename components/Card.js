export default class Card {
  constructor(data, templateSelector, handleCardClick, userId, api) {
    this._data = data;
    this._id = data._id;
    this._ownerId = data.owner;
    this._isLiked = data.isLiked;
    this._userId = userId;
    this._api = api;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".gallery__post")
      .cloneNode(true);
  }

  // Refresca la visualización del botón "like"
  _updateLikeView() {
    this._likeButton.classList.toggle("gallery__post-like-button_active");
  }

  // Envía la petición adecuada para alternar "like"
  _toggleLike() {
    const action = this._isLiked
      ? this._api.unlikeCard(this._id)
      : this._api.likeCard(this._id);

    action
      .then((updatedCard) => {
        this._isLiked = updatedCard.isLiked;
        this._updateLikeView();
      })
      .catch((err) => console.error("Error toggling like:", err));
  }

  _handleDeleteCard() {
    this._api
      .deleteCard(this._id)
      .then(() => {
        this._element.remove();
        this._element = null;
      })
      .catch((err) => console.error("Error eliminando tarjeta:", err));
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._toggleLike());
    this._trashButton.addEventListener("click", () => this._handleDeleteCard());
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick({ link: this._link, name: this._name })
    );
  }

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

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    // Mostrar estado inicial de "like"
    if (this._isLiked) {
      this._likeButton.classList.add("gallery__post-like-button_active");
    }

    this._setEventListeners();

    // Ocultar papelera si no eres el dueño
    if (this._ownerId !== this._userId) {
      this._trashButton.remove();
    }

    return this._element;
  }
}

// utils.js

// Aquí encapsulamos la lógica de abrir/cerrar la imagen en un popup.
// Puedes añadir más funciones genéricas si lo deseas.

// Referencias al popup de imagen
const imagePopup = document.querySelector(".popup_image-view");
const imagePopupContent = imagePopup.querySelector(
  ".popup__content_image-view"
);
const imagePopupOverlay = imagePopup.querySelector(".popup__overlay");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close-button");
const popupImage = imagePopup.querySelector(".popup__image");
const popupImageTitle = imagePopup.querySelector(".popup__image-title");

// Cerrar popup de imagen
function closeImagePopup() {
  imagePopupContent.classList.remove("popup__content_show");
  imagePopupOverlay.classList.remove("popup__overlay_show");
  document.removeEventListener("keydown", closePopupOnEsc);
}

// Cerrar con tecla Escape
function closePopupOnEsc(evt) {
  if (evt.key === "Escape") {
    if (imagePopupContent.classList.contains("popup__content_show")) {
      closeImagePopup();
    }
  }
}

// Listeners para cerrar el popup de imagen (overlay y botón)
imagePopupOverlay.addEventListener("click", (evt) => {
  if (evt.target === imagePopupOverlay) {
    closeImagePopup();
  }
});
imagePopupCloseButton.addEventListener("click", closeImagePopup);

// Abrir popup de imagen
export function openImagePopup(link, alt, title) {
  popupImage.src = link;
  popupImage.alt = alt;
  popupImageTitle.textContent = title;

  imagePopupContent.classList.add("popup__content_show");
  imagePopupOverlay.classList.add("popup__overlay_show");

  document.addEventListener("keydown", closePopupOnEsc);
}

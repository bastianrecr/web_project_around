import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { openImagePopup } from "../scripts/utils.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";

// ----------- PRUEBA DE COMPONENTE "Section" -----------
// Datos de prueba
const dummyItems = ["Elemento 1", "Elemento 2", "Elemento 3"];

// Función renderizadora de prueba: crea un párrafo para cada elemento
function renderer(item) {
  const p = document.createElement("p");
  p.textContent = item;
  // Agregar el elemento al contenedor utilizando el método addItem de la instancia de Section
  sectionInstance.addItem(p);
}

const sectionInstance = new Section(
  { items: dummyItems, renderer },
  ".container"
);

sectionInstance.renderItems();

// ----------- PRUEBA DE COMPONENTE "Popup" -----------

const popupInstance = new Popup(".popup_testing");

popupInstance.setEventListeners();

popupInstance.open();

setTimeout(() => {
  popupInstance.close();
}, 10000);

// Fin de seccion de pruebas

// Configuración para la validación
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// ----------- POPUP EDITAR PERFIL -----------
const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup__content"); // contenido del popup de perfil
const popupOverlay = document.querySelector(".popup__overlay"); // overlay del popup de perfil
const editProfileCloseButton = document.querySelector(".popup__close-button");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const nameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#about");

// Formulario de editar perfil
const editProfileForm = document.querySelector(".popup__form");

// Abre el popup de edición de perfil
function openEditProfile() {
  popup.classList.add("popup__content_show");
  popupOverlay.classList.add("popup__overlay_show");

  // Rellenar inputs con los datos actuales del perfil
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;

  document.addEventListener("keydown", closePopupOnEsc);
}

// Cierra el popup de edición de perfil
function closeEditProfile() {
  // Reinicia la validación antes de cerrarlo
  editProfileValidator.resetValidation();

  popup.classList.remove("popup__content_show");
  popupOverlay.classList.remove("popup__overlay_show");
  document.removeEventListener("keydown", closePopupOnEsc);
}

// Listeners para abrir/cerrar popup de perfil
editButton.addEventListener("click", openEditProfile);
editProfileCloseButton.addEventListener("click", closeEditProfile);
popupOverlay.addEventListener("click", (evt) => {
  if (evt.target === popupOverlay) {
    closeEditProfile();
  }
});

// Actualiza el perfil al enviar el formulario
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closeEditProfile();
}
editProfileForm.addEventListener("submit", handleProfileFormSubmit);

// ----------- POPUP PARA AÑADIR LUGAR -----------
const addButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_add-card");
const addCardForm = document.querySelector(".popup__form_add-card");
const cardTitleInput = document.querySelector("#card-title");
const cardLinkInput = document.querySelector("#card-link");
const addCardCloseButton = addCardPopup.querySelector(".popup__close-button");
const addCardPopupContent = addCardPopup.querySelector(".popup__content");
const addCardPopupOverlay = addCardPopup.querySelector(".popup__overlay");

// Abre el popup de añadir tarjeta
function openAddCardPopup() {
  // Limpiar los campos del formulario
  addCardForm.reset();

  addCardPopupContent.classList.add("popup__content_show");
  addCardPopupOverlay.classList.add("popup__overlay_show");

  document.addEventListener("keydown", closePopupOnEsc);
}

// Cierra el popup de añadir tarjeta
function closeAddCardPopup() {
  // Reinicia la validación antes de cerrarlo
  addCardValidator.resetValidation();

  addCardPopupContent.classList.remove("popup__content_show");
  addCardPopupOverlay.classList.remove("popup__overlay_show");
  document.removeEventListener("keydown", closePopupOnEsc);
}

// Listeners para abrir/cerrar popup de tarjeta
addButton.addEventListener("click", openAddCardPopup);
addCardCloseButton.addEventListener("click", closeAddCardPopup);
addCardPopupOverlay.addEventListener("click", (evt) => {
  if (evt.target === addCardPopupOverlay) {
    closeAddCardPopup();
  }
});

// Envía el formulario para crear una nueva tarjeta
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };

  // Crea e inserta la nueva tarjeta en la galería
  const cardElement = createCard(newCard);
  galleryContainer.prepend(cardElement);

  addCardForm.reset();
  closeAddCardPopup();
}
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// ----------- TARJETAS INICIALES -----------
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

// Contenedor de la galería y selector de template
const galleryContainer = document.querySelector(".gallery");
const cardTemplateSelector = "#gallery-card-template";

// Función para crear una tarjeta usando la clase Card
function createCard(cardData) {
  // openImagePopup viene de utils.js
  const card = new Card(cardData, cardTemplateSelector, openImagePopup);
  return card.generateCard();
}

// Renderizar las tarjetas iniciales
function renderInitialCards(cards) {
  cards.forEach((data) => {
    const cardElement = createCard(data);
    galleryContainer.append(cardElement);
  });
}
renderInitialCards(initialCards);

// ----------- CERRAR POPUPS CON ESC -----------
function closePopupOnEsc(evt) {
  if (evt.key === "Escape") {
    // Popup de perfil
    if (popup.classList.contains("popup__content_show")) {
      closeEditProfile();
    }
    // Popup de nueva tarjeta
    if (addCardPopupContent.classList.contains("popup__content_show")) {
      closeAddCardPopup();
    }
    // El popup de imagen se cierra con su propia lógica en utils.js
  }
}

// ----------- INSTANCIAR VALIDADORES -----------
const editProfileValidator = new FormValidator(
  validationConfig,
  editProfileForm
);
const addCardValidator = new FormValidator(validationConfig, addCardForm);

// Activar la validación en cada formulario
editProfileValidator.enableValidation();
addCardValidator.enableValidation();

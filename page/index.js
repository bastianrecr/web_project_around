import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";

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
const popup = document.querySelector(".popup__content");
const popupOverlay = document.querySelector(".popup__overlay");
const editProfileCloseButton = document.querySelector(".popup__close-button");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const nameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#about");

// Formulario de editar perfil
const editProfileForm = document.querySelector(".popup__form");

function openEditProfile() {
  popup.classList.add("popup__content_show");
  popupOverlay.classList.add("popup__overlay_show");
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  document.addEventListener("keydown", closePopupOnEsc);
}

function closeEditProfile() {
  editProfileValidator.resetValidation();
  popup.classList.remove("popup__content_show");
  popupOverlay.classList.remove("popup__overlay_show");
  document.removeEventListener("keydown", closePopupOnEsc);
}

editButton.addEventListener("click", openEditProfile);
editProfileCloseButton.addEventListener("click", closeEditProfile);
popupOverlay.addEventListener("click", (evt) => {
  if (evt.target === popupOverlay) {
    closeEditProfile();
  }
});

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

function openAddCardPopup() {
  addCardForm.reset();
  addCardPopupContent.classList.add("popup__content_show");
  addCardPopupOverlay.classList.add("popup__overlay_show");
  document.addEventListener("keydown", closePopupOnEsc);
}

function closeAddCardPopup() {
  addCardValidator.resetValidation();
  addCardPopupContent.classList.remove("popup__content_show");
  addCardPopupOverlay.classList.remove("popup__overlay_show");
  document.removeEventListener("keydown", closePopupOnEsc);
}

addButton.addEventListener("click", openAddCardPopup);
addCardCloseButton.addEventListener("click", closeAddCardPopup);
addCardPopupOverlay.addEventListener("click", (evt) => {
  if (evt.target === addCardPopupOverlay) {
    closeAddCardPopup();
  }
});

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };
  const cardElement = createCard(newCard);
  galleryContainer.prepend(cardElement);
  addCardForm.reset();
  closeAddCardPopup();
}
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// ----------- INSTANCIA DEL POPUP DE IMAGEN -----------
/*
   Crear el popup con la clase PopupWithImage.*/
const popupWithImage = new PopupWithImage(".popup_image-view");
// Configuramos listeners (cerrar con overlay, botón close, etc.)
popupWithImage.setEventListeners();

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

const galleryContainer = document.querySelector(".gallery");
const cardTemplateSelector = "#gallery-card-template";

function createCard(cardData) {
  const card = new Card(
    cardData,
    cardTemplateSelector,
    // Este callback se ejecutará cuando hagan click en la imagen:
    ({ link, name }) => {
      popupWithImage.open({ link, name });
    }
  );
  return card.generateCard();
}

// Renderizamos las tarjetas iniciales
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
    if (popup.classList.contains("popup__content_show")) {
      closeEditProfile();
    }
    if (addCardPopupContent.classList.contains("popup__content_show")) {
      closeAddCardPopup();
    }
    // El popup de imagen ahora se cierra con su propia lógica interna,
    // manejada en la clase PopupWithImage.
  }
}

// ----------- INSTANCIAR VALIDADORES -----------
const editProfileValidator = new FormValidator(
  validationConfig,
  editProfileForm
);
const addCardValidator = new FormValidator(validationConfig, addCardForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

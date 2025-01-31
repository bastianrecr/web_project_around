import {
  hideInputError,
  toggleButtonState,
  enableValidation,
} from "./validation.js";

// Editar perfil
let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup__content");
let popupOverlay = document.querySelector(".popup__overlay");
let editProfileCloseButton = document.querySelector(".popup__close-button");

let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");
let nameInput = document.querySelector("#name");
let aboutInput = document.querySelector("#about");

let formElement = document.querySelector(".popup__form");

function openEditProfile() {
  popup.classList.add("popup__content_show");
  popupOverlay.classList.add("popup__overlay_show");
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;

  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__submit-button");
  toggleButtonState(inputList, buttonElement);

  document.addEventListener("keydown", closePopupOnEsc); // Agregar el evento de teclado
}

function closeEditProfile() {
  popup.classList.remove("popup__content_show");
  popupOverlay.classList.remove("popup__overlay_show");

  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  inputList.forEach((inputElement) =>
    hideInputError(formElement, inputElement)
  );

  document.removeEventListener("keydown", closePopupOnEsc); // Quitar el evento de teclado
}

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

editButton.addEventListener("click", openEditProfile);
editProfileCloseButton.addEventListener("click", closeEditProfile);
formElement.addEventListener("submit", handleProfileFormSubmit);

// Gallery cards
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
const cardTemplate = document.querySelector("#gallery-card-template").content;

function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true).firstElementChild;

  const cardImage = cardElement.querySelector(".gallery__post-image");
  const cardTitle = cardElement.querySelector(".gallery__post-title");
  const likeButton = cardElement.querySelector(".gallery__post-like-button");
  const trashButton = cardElement.querySelector(".gallery__post-trash-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("gallery__post-like-button_active");
  });

  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    openImagePopup(cardData.link, cardData.name, cardData.name);
  });

  return cardElement;
}

function renderInitialCards(cards) {
  cards.forEach((card) => {
    const cardElement = createCard(card);
    galleryContainer.append(cardElement);
  });
}

renderInitialCards(initialCards);

// Botón para Agregar lugar
const addButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_add-card");
const addCardForm = document.querySelector(".popup__form_add-card");
const cardTitleInput = document.querySelector("#card-title");
const cardLinkInput = document.querySelector("#card-link");
const addCardCloseButton = addCardPopup.querySelector(".popup__close-button");

function openAddCardPopup() {
  const inputList = Array.from(addCardForm.querySelectorAll(".popup__input"));
  const buttonElement = addCardForm.querySelector(".popup__submit-button");

  addCardForm.reset();
  inputList.forEach((inputElement) =>
    hideInputError(addCardForm, inputElement)
  );
  toggleButtonState(inputList, buttonElement);

  addCardPopup
    .querySelector(".popup__content")
    .classList.add("popup__content_show");
  addCardPopup
    .querySelector(".popup__overlay")
    .classList.add("popup__overlay_show");

  document.addEventListener("keydown", closePopupOnEsc); // Agregar el evento de teclado
}

function closeAddCardPopup() {
  addCardPopup
    .querySelector(".popup__content")
    .classList.remove("popup__content_show");
  addCardPopup
    .querySelector(".popup__overlay")
    .classList.remove("popup__overlay_show");

  document.removeEventListener("keydown", closePopupOnEsc); // Quitar el evento de teclado
}

addCardPopup
  .querySelector(".popup__overlay")
  .addEventListener("click", (evt) => {
    if (evt.target === addCardPopup.querySelector(".popup__overlay")) {
      closeAddCardPopup();
    }
  });

// Manejar envío de formulario para agregar una tarjeta
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

addButton.addEventListener("click", openAddCardPopup);
addCardCloseButton.addEventListener("click", closeAddCardPopup);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// Popup de imagen
const imagePopup = document.querySelector(".popup_image-view");
const imagePopupContent = imagePopup.querySelector(
  ".popup__content_image-view"
);
const imagePopupOverlay = imagePopup.querySelector(".popup__overlay");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close-button");
const popupImage = imagePopup.querySelector(".popup__image");
const popupImageTitle = imagePopup.querySelector(".popup__image-title");

function openImagePopup(link, alt, title) {
  popupImage.src = link;
  popupImage.alt = alt;
  popupImageTitle.textContent = title;

  imagePopupContent.classList.add("popup__content_show");
  imagePopupOverlay.classList.add("popup__overlay_show");

  document.addEventListener("keydown", closePopupOnEsc); // Agregar el evento de teclado
}

function closeImagePopup() {
  imagePopupContent.classList.remove("popup__content_show");
  imagePopupOverlay.classList.remove("popup__overlay_show");

  document.removeEventListener("keydown", closePopupOnEsc); // Quitar el evento de teclado
}

imagePopupCloseButton.addEventListener("click", closeImagePopup);
imagePopupOverlay.addEventListener("click", (evt) => {
  if (evt.target === imagePopupOverlay) {
    closeImagePopup();
  }
});

// Función para cerrar popups con "Escape"
function closePopupOnEsc(evt) {
  if (evt.key === "Escape") {
    if (popup.classList.contains("popup__content_show")) closeEditProfile();
    if (
      addCardPopup
        .querySelector(".popup__content")
        .classList.contains("popup__content_show")
    )
      closeAddCardPopup();
    if (imagePopupContent.classList.contains("popup__content_show"))
      closeImagePopup();
  }
}

enableValidation();

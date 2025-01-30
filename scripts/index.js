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
}

function closeEditProfile() {
  popup.classList.remove("popup__content_show");
  popupOverlay.classList.remove("popup__overlay_show");
}

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

// Seleccionar contenedor de galería y template
const galleryContainer = document.querySelector(".gallery");
const cardTemplate = document.querySelector("#gallery-card-template").content;

// Función para crear una tarjeta
function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true).firstElementChild; // Obtenemos el primer nodo DOM del template

  const cardImage = cardElement.querySelector(".gallery__post-image");
  const cardTitle = cardElement.querySelector(".gallery__post-title");
  const likeButton = cardElement.querySelector(".gallery__post-like-button");
  const trashButton = cardElement.querySelector(".gallery__post-trash-button");

  // Asignar datos
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Evento "Me gusta"
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("gallery__post-like-button_active");
  });

  // Evento para eliminar tarjeta
  trashButton.addEventListener("click", () => {
    cardElement.remove(); // Eliminar la tarjeta
  });

  // Evento para abrir el popup de imagen
  cardImage.addEventListener("click", () => {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupImageTitle.textContent = cardData.name;
    imagePopupContent.classList.add("popup__content_show");
    imagePopupOverlay.classList.add("popup__overlay_show");
  });

  return cardElement;
}

// Renderizar las tarjetas iniciales
function renderInitialCards(cards) {
  cards.forEach((card) => {
    const cardElement = createCard(card);
    galleryContainer.append(cardElement);
  });
}

// Llamar a la función para inicializar las tarjetas
renderInitialCards(initialCards);

// Boton para Agregar lugar

// Seleccionar elementos
const addButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_add-card");
const addCardForm = document.querySelector(".popup__form_add-card");
const cardTitleInput = document.querySelector("#card-title");
const cardLinkInput = document.querySelector("#card-link");
const addCardCloseButton = addCardPopup.querySelector(".popup__close-button");

// Funciones para abrir y cerrar el popup
function openAddCardPopup() {
  addCardPopup
    .querySelector(".popup__content")
    .classList.add("popup__content_show");
  addCardPopup
    .querySelector(".popup__overlay")
    .classList.add("popup__overlay_show");
}

function closeAddCardPopup() {
  addCardPopup
    .querySelector(".popup__content")
    .classList.remove("popup__content_show");
  addCardPopup
    .querySelector(".popup__overlay")
    .classList.remove("popup__overlay_show");
}

// Función para manejar el envío del formulario
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };

  // Crear la tarjeta y agregarla al principio de la galería
  const cardElement = createCard(newCard);
  galleryContainer.prepend(cardElement); // Se utiliza prepend para agregar al principio

  // Limpiar formulario y cerrar popup
  addCardForm.reset();
  closeAddCardPopup();
}

// Eventos para abrir, cerrar y guardar
addButton.addEventListener("click", openAddCardPopup);
addCardCloseButton.addEventListener("click", closeAddCardPopup);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// Seleccionar elementos del popup de imagen
const imagePopup = document.querySelector(".popup_image-view");
const imagePopupContent = imagePopup.querySelector(
  ".popup__content_image-view"
);
const imagePopupOverlay = imagePopup.querySelector(".popup__overlay");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close-button");
const popupImage = imagePopup.querySelector(".popup__image");
const popupImageTitle = imagePopup.querySelector(".popup__image-title");

// Función para cerrar el popup de imagen
function closeImagePopup() {
  imagePopupContent.classList.remove("popup__content_show");
  imagePopupOverlay.classList.remove("popup__overlay_show");
  popupImage.src = "";
  popupImage.alt = "";
  popupImageTitle.textContent = "";
}

// Eventos para cerrar el popup de imagen
imagePopupCloseButton.addEventListener("click", closeImagePopup);
imagePopupOverlay.addEventListener("click", closeImagePopup);

// Validación de formularios
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(
    `.popup__${inputElement.id}-error`
  );
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(
    `.popup__${inputElement.id}-error`
  );
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  console.log(hasInvalidInput(inputList));
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__submit-button_inactive");
  } else {
    buttonElement.classList.remove("popup__submit-button_inactive");
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__submit-button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();

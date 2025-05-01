import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "a8f4bb4a-2f67-4de9-b1e9-63e3432a77ea",
    "Content-Type": "application/json",
  },
});

// ----------------- INSTANCIA DE USERINFO -----------------
// Se encargará de obtener y actualizar la información del perfil.
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
});

// ----------------- INSTANCIA DEL POPUP DE IMAGEN -----------------
const popupWithImage = new PopupWithImage(".popup_image-view");
popupWithImage.setEventListeners();

// ----------------- FUNCIÓN PARA CREAR TARJETAS -----------------
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#gallery-card-template",
    ({ link, name }) => popupWithImage.open({ link, name }),
    myUserId,
    api
  );
  return card.generateCard();
}

// ----------------- INSTANCIA DE LA SECCIÓN (GALERÍA) -----------------
const cardList = new Section(
  {
    items: [],
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardList.addItem(cardElement);
    },
  },
  ".gallery"
);
// cardList.renderItems();

// ----------------- CARGA DE USUARIO Y TARJETAS SIMULTANEAMENTE -----------------

let myUserId = null;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    // Inyectar datos de perfil
    myUserId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
    });
    document.querySelector(".profile__avatar").src = userData.avatar;

    // Renderizar tarjetas recibidas
    cards.forEach((cardData) => {
      const cardElement = createCard(cardData);
      cardList.addItem(cardElement);
    });
  })
  .catch((err) => console.error("Error inicializando app:", err));

// ----------------- CONFIGURACIÓN DE VALIDACIÓN -----------------
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// ----------------- INSTANCIAS DE VALIDADORES -----------------
const editProfileFormElement = document.querySelector(
  ".popup__form_edit-profile"
);
const addCardFormElement = document.querySelector(".popup__form_add-card");

const editProfileValidator = new FormValidator(
  validationConfig,
  editProfileFormElement
);
const addCardValidator = new FormValidator(
  validationConfig,
  addCardFormElement
);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

// ----------------- POPUP CON FORMULARIO: EDITAR PERFIL -----------------
const profilePopup = new PopupWithForm({
  popupSelector: ".popup_edit-profile",
  handleFormSubmit: (inputValues) => {
    userInfo.setUserInfo({ name: inputValues.name, about: inputValues.about });
  },
  formValidator: editProfileValidator,
});
profilePopup.setEventListeners();

// ----------------- POPUP CON FORMULARIO: AGREGAR TARJETA -----------------
const cardPopup = new PopupWithForm({
  popupSelector: ".popup_add-card",
  handleFormSubmit: (inputValues) => {
    const cardData = {
      name: inputValues["card-title"],
      link: inputValues["card-link"],
    };
    const cardElement = createCard(cardData);
    cardList.addItem(cardElement);
  },
  formValidator: addCardValidator,
});
cardPopup.setEventListeners();

// ----------------- EVENTOS DE LOS BOTONES -----------------
const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", () => {
  // Obtiene la información actual del usuario y la inyecta en el formulario
  const currentUser = userInfo.getUserInfo();
  editProfileFormElement.elements.name.value = currentUser.name;
  editProfileFormElement.elements.about.value = currentUser.about;
  profilePopup.open();
});

const addButton = document.querySelector(".profile__add-button");
addButton.addEventListener("click", () => {
  cardPopup.open();
});

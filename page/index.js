import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";

// ----------------- CONFIGURACIÓN DEL VALIDADOR -----------------
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// ----------------- INSTANCIA DE API Y USERINFO -----------------
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "fdc1d5c3-979e-4072-8b0b-9337349b0bbe",
    "Content-Type": "application/json",
  },
});
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
});

// ----------------- POPUP CAMBIAR AVATAR -----------------
const avatarFormElement = document.querySelector(".popup__form_update-avatar");
const avatarValidator = new FormValidator(validationConfig, avatarFormElement);
avatarValidator.enableValidation();

const avatarPopup = new PopupWithForm({
  popupSelector: ".popup_update-avatar",
  handleFormSubmit: (inputValues) => {
    const saveBtn = avatarFormElement.querySelector(".popup__submit-button");
    saveBtn.textContent = "Guardando...";
    api
      .updateAvatar({ avatar: inputValues["avatar-link"] })
      .then((userData) => {
        document.querySelector(".profile__avatar").src = userData.avatar;
        avatarPopup.close();
      })
      .catch((err) => console.error("Error al actualizar avatar:", err))
      .finally(() => {
        saveBtn.textContent = "Guardar";
      });
  },
  formValidator: avatarValidator,
});
avatarPopup.setEventListeners();

document.querySelector(".profile__avatar").addEventListener("click", () => {
  avatarValidator.resetValidation();
  avatarPopup.open();
});

// ----------------- POPUP CONFIRMAR ELIMINACIÓN -----------------
const confirmDeletePopup = new PopupWithConfirmation(".popup_confirm-delete");
confirmDeletePopup.setEventListeners();

// ----------------- POPUP VER IMAGEN -----------------
const popupWithImage = new PopupWithImage(".popup_image-view");
popupWithImage.setEventListeners();

// ----------------- POPUP EDITAR PERFIL -----------------
const editFormElement = document.querySelector(".popup__form_edit-profile");
const editValidator = new FormValidator(validationConfig, editFormElement);
editValidator.enableValidation();

const profilePopup = new PopupWithForm({
  popupSelector: ".popup_edit-profile",
  handleFormSubmit: (inputValues) => {
    const saveBtn = editFormElement.querySelector(".popup__submit-button");
    saveBtn.textContent = "Guardando...";
    api
      .editProfile({ name: inputValues.name, about: inputValues.about })
      .then((userData) => {
        userInfo.setUserInfo(userData);
        profilePopup.close();
      })
      .catch((err) => console.error("Error al editar perfil:", err))
      .finally(() => {
        saveBtn.textContent = "Guardar";
      });
  },
  formValidator: editValidator,
});
profilePopup.setEventListeners();

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const current = userInfo.getUserInfo();
    editFormElement.elements.name.value = current.name;
    editFormElement.elements.about.value = current.about;
    editValidator.resetValidation();
    profilePopup.open();
  });

// ----------------- POPUP AGREGAR TARJETA -----------------
const addFormElement = document.querySelector(".popup__form_add-card");
const addValidator = new FormValidator(validationConfig, addFormElement);
addValidator.enableValidation();

const cardPopup = new PopupWithForm({
  popupSelector: ".popup_add-card",
  handleFormSubmit: (inputValues) => {
    const saveBtn = addFormElement.querySelector(".popup__submit-button");
    saveBtn.textContent = "Guardando...";
    api
      .addCard({
        name: inputValues["card-title"],
        link: inputValues["card-link"],
      })
      .then((newCard) => {
        cardList.addItem(createCard(newCard));
        cardPopup.close();
      })
      .catch((err) => console.error("Error al crear tarjeta:", err))
      .finally(() => {
        saveBtn.textContent = "Crear";
      });
  },
  formValidator: addValidator,
});
cardPopup.setEventListeners();

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addValidator.resetValidation();
  cardPopup.open();
});

// ----------------- GALERÍA Y CARGA INICIAL -----------------
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#gallery-card-template",
    ({ link, name }) => popupWithImage.open({ link, name }),
    myUserId,
    api,
    confirmDeletePopup
  );
  return card.generateCard();
}

const cardList = new Section(
  {
    items: [],
    renderer: (item) => cardList.addItem(createCard(item)),
  },
  ".gallery"
);

let myUserId = null;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    myUserId = userData._id;
    userInfo.setUserInfo(userData);
    document.querySelector(".profile__avatar").src = userData.avatar;

    const sortedCards = cards.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const galleryEl = document.querySelector(".gallery");
    sortedCards.forEach((cardData) => {
      const cardEl = createCard(cardData);
      galleryEl.append(cardEl);
    });
  })
  .catch((err) => console.error("Error inicializando app:", err));

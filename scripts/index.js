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

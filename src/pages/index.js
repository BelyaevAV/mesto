import {config, popupEdit, photoCards, popupProfileEdit, popupCardAdd, namePlace, jobPlace, nameInput, jobInput, popupPhoto, imgInput, placeInput, popupAdd, popupAvatar, profileAvatar, popupDelete, avatarInput} from '../utils/constants.js';
import Card from '../components/Card';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupConfirm from '../components/PopupConfirm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import './index.css'


//Пользователь
const user = new UserInfo({
    name: namePlace,
    job: jobPlace
});

//API

const api = new Api({
    url:  'https://mesto.nomoreparties.co/v1/cohort-15',
    auth: 'c552b8f3-03b7-4516-b137-6667ad468f9e'
})
let userData = {}
let initialPage = {}
const getUserData = api.getUserInfo();
const getCards = api.getInitialCards();

const getData = [getUserData, getCards];
Promise.all(getData)
    .then((data) => {
        userData = data[0];
        const cardsData = data[1]
        user.setUserInfo({name: userData.name, job: userData.about});
        profileAvatar.style.backgroundImage = `url(${userData.avatar})`
        initialPage = new Section({
            items: cardsData,
            renderer: (item) => {
                const card = new Card(
                    item,
                    '.photo-grid__template',
                    userData._id,
                    handleCardClick,
                    openDeleteConfirm,
                    handleLike
                )
                const cardElement = card.generateCard()
                initialPage.addItem(cardElement);
            }

        },
        photoCards
        )
        initialPage.renderItems()
})

//Подверждение удаления
const popupConfirm = new PopupConfirm(popupDelete, handleDelete)

function openDeleteConfirm(id, evt) {
    popupConfirm.cardId = id;
    popupConfirm.element = evt.target.parentElement;
    popupConfirm.open();
}

function handleDelete() {
    popupConfirm.querySelector('popup__save').textContent = 'Удаление...';
    api.deleteCard(popupConfirmDelete.cardId).then(() => {
        popupConfirm.element.remove();
        popupConfirm.element = null;
        popupConfirm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
      popupConfirm.querySelector('popup__save').textContent = 'Да';
      });
  }

//Валидация
const validationEditInput = new FormValidator(popupProfileEdit, config);
const validationAddInput = new FormValidator(popupCardAdd, config);
const validationAvatarInput = new FormValidator(popupAvatar, config);

validationEditInput.enableValidation();
validationAddInput.enableValidation();
validationAvatarInput.enableValidation();

//Попап с картинкой
const popupImage = new PopupWithImage(popupPhoto);

popupImage.setEventListeners();

function handleCardClick (link, title) {
    popupImage.open(link, title);
};

//ПопапРедактирование
const popupEditProfile = new PopupWithForm(popupProfileEdit, handleEdit, () => validationEditInput.removeErrors());

popupEditProfile.setEventListeners();

popupEdit.addEventListener('click', function() {
    popupEditProfile.open();
    const userInfo = user.getUserInfo();
    nameInput.value = userInfo.name;
    jobInput.value = userInfo.job;
});

function handleEdit() {
    popupProfileEdit.querySelector('.popup__save').textContent = 'Сохранение...';
    api.editProfile(nameInput.value, jobInput.value)
    .then((res) => {
        user.setUserInfo({name: res.name, job: res.about});
    })
    .catch((err) => console.log(err))
    .finally(() => {
        popupProfileEdit.querySelector('.popup__save').textContent = 'Сохранить'
        this.close();
    })
}

//ПопапДобавление
const addCard = new PopupWithForm(popupCardAdd, addNewCard, () => validationAddInput.removeErrors());

addCard.setEventListeners();

popupAdd.addEventListener('click', function () {
    addCard.open();
});

function addNewCard(){
    const save = popupCardAdd.querySelector('.popup__save')
    save.textContent = 'Сохранение...';
    api.addNewCard(placeInput.value, imgInput.value)
    .then((res) => {
        const card = new Card({
            name: res.name,
            link: res.link,
            likes: res.likes,
            owner: res.owner,
            _id: res._id
        },
        '.photo-grid__template',
        userData._id,
        handleCardClick,
        openDeleteConfirm,
        handleLike
        );
        const cardElement = card.generateCard();
        initialPage.addItem(cardElement);
        this.close();
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        save.textContent = 'Сохранить'
    })
}

//ПопапАватар

const avatarEdit = new PopupWithForm(popupAvatar, handleAvatarEdit, () => validationAvatarInput.removeErrors());

avatarEdit.setEventListeners();

profileAvatar.addEventListener('click', function () {
    avatarEdit.open();
});

function handleAvatarEdit() {
    popupAvatar.querySelector('.popup__save').textContent = 'Сохранение...';
    api.editAvatar(avatarInput.value)
    .then((res) => {
        document.querySelector('.profile__avatar').style.backgroundImage = `url(${res.avatar})`;
        this.close();
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        popupAvatar.querySelector('.popup__save').textContent = 'Сохранить';
    })
}

//Лайки

function handleLike(id, evt) {
    if (evt.target.classList.contains('photo-grid__like-button_liked')) {
      api.removeLike(id).then((res) => {
          evt.target.nextElementSibling.textContent = res.likes.length;
          evt.target.classList.remove('photo-grid__like-button_liked');
        })
    } else {
      api.setLike(id)
        .then((res) => {
          evt.target.nextElementSibling.textContent = res.likes.length;
          evt.target.classList.add('photo-grid__like-button_liked');
        })
        .catch((err) => {
            console.log(err)
        })
    }
}



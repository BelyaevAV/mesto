import {initialCards, config, popupEdit,photoCards, popupProfileEdit, popupCardAdd, namePlace, jobPlace, nameInput, jobInput, popupPhoto, imgInput, placeInput, popupAdd} from '../utils/constants.js';
import Card from '../components/Card';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

import './index.css'

//Валидация
const validationEditInput = new FormValidator(popupProfileEdit, config);
const validationAddInput = new FormValidator(popupCardAdd, config);

validationEditInput.enableValidation();
validationAddInput.enableValidation();

//Создание карточки
function getCard(item) {
    const card = new Card(item, '.photo-grid__template', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement
}

//Начальная страница
const initialPage = new Section({
    items: initialCards,

    renderer: ((item) => {
        initialPage.addItem(getCard(item), true);
    })
}, photoCards)

initialPage.renderItems();

//Попап с картинкой
const popupImage = new PopupWithImage(popupPhoto);

popupImage.setEventListeners();

function handleCardClick (link, title) {
    popupImage.open(link, title);
}

//ПопапРедактирование
const user = new UserInfo({
    name: namePlace,
    job: jobPlace
});

const popupEditProfile = new PopupWithForm(popupProfileEdit, () => {
    user.setUserInfo(nameInput, jobInput);
    popupEditProfile.close();
},() => validationEditInput.removeErrors())

popupEditProfile.setEventListeners();

popupEdit.addEventListener('click', function() {
    popupEditProfile.open();
    const userInfo = user.getUserInfo();
    nameInput.value = userInfo.name;
    jobInput.value = userInfo.job;
})

//ПопапДобавление

const addCard = new PopupWithForm(popupCardAdd, () => {
    initialPage.addItem(getCard({name: placeInput.value, link: imgInput.value}), false);
    addCard.close()
}, () => validationAddInput.removeErrors())

addCard.setEventListeners();

popupAdd.addEventListener('click', function () {
    addCard.open();
});


import {initialCards, config, popupEdit,photoCards, popupProfileEdit, popupCardAdd, namePlace, jobPlace, nameInput, jobInput, popupPhoto, imgInput, placeInput, popupAdd} from './utils/constants.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';

import './pages/index.css'
//начальная страница
const initialPage = new Section({
   items: initialCards,

   renderer: ((item) => {
        const card = new Card(item, '.photo-grid__template', handleCardClick);
        const cardElement = card.generateCard();
      
        photoCards.append(cardElement);
    })
}, photoCards)

initialPage.renderItems();

//ПопапКартинка
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
})

popupEditProfile.setEventListeners();

popupEdit.addEventListener('click', function() {
    popupEditProfile.open();
    const userInfo = user.getUserInfo();
    nameInput.value = userInfo.name;
    jobInput.value = userInfo.job;
})

//ПопапДобавление

const addCard = new PopupWithForm(popupCardAdd, () => {
    const card = new Card({name: placeInput.value, link: imgInput.value}, '.photo-grid__template');
    const cardElement = card.generateCard();
    photoCards.prepend(cardElement);
    addCard.close()
})

addCard.setEventListeners();

popupAdd.addEventListener('click', function () {
    addCard.open();
});

//Валидация
const validationEditInput = new FormValidator(popupProfileEdit, config);
const validationAddInput = new FormValidator(popupCardAdd, config);

validationEditInput.enableValidation();
validationAddInput.enableValidation();
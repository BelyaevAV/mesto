
let popup = document.querySelector('.overlay'),
    popupToggle = document.querySelector('.profile__edit-button'),
    popupClose = document.querySelector('.popup__close'),
    namePlace = document.querySelector('.profile__name'),
    jobPlace = document.querySelector('.profile__job'),
    nameInput = document.querySelector('.popup__name'),
    jobInput = document.querySelector('.popup__job'),
    popupSave = document.querySelector('.popup__save')

    popupToggle.onclick = function() {
        popup.style.display='block';
        jobInput.value = jobPlace.textContent
        nameInput.value = namePlace.textContent
    };

    popupClose.onclick = function() {
        popup.style.display='none'
    };

let formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM

    // Вставьте новые значения с помощью textContent
    namePlace.textContent = nameInput.value;
    jobPlace.textContent = jobInput.value;
    popup.style.display='none'
    };


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);






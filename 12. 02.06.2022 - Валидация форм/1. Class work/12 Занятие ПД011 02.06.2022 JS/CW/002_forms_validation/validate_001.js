﻿// регистрация события загрузки документа.
window.addEventListener("load", init, false);


// регистрация обработчиков событий элементов формы.
function init() {
    form1.userName.onchange = nameOnChange;
    form1.email.onchange = emailOnChange;
    form1.zip.onchange = zipcodeOnChange;
    form1.onsubmit = onsubmitHandler;
}

// метод проверки значения в элементе по регулярному выражению.
function validate(elem, pattern) {
    let res = elem.value.search(pattern);
    // установка CSS класса
    elem.className = (res === -1)?"invalid":"valid";
}

// обработчики событий изменения текста в окне.
function nameOnChange() {
    let pattern = /\S/;
    validate(this, pattern);
}

function emailOnChange() {
    let pattern = /\b[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}\b/i;
    validate(this, pattern);
}

function zipcodeOnChange() {
    let pattern = /\d{5}/;
    validate(this, pattern);
}

// событие при отправке формы на сервер.
function onsubmitHandler() {

    let invalid = false;

    for (let i = 0; i < form1.elements.length; ++i) {
        let e = form1.elements[i];
        // проверка типа элемента и наличия обработчика события onchange.
        if (e.type === "text" && e.onchange) {
            e.onchange(); // запуск события onchange
            invalid = (e.className === "invalid") || invalid;
        } // if
    } // for i

    if (invalid) {
        alert("Допущены ошибки при заполнении формы.");
        return false; // отмена отправки формы.
    }
}


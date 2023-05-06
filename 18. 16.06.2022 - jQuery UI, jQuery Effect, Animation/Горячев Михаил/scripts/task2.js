//  Задача 2. Текст

//  Задача 2. Для трех вариантов русско-английский текста (выбирайте случайным образом при загрузке
//  страницы и по клику на командную кнопку) найдите и выделите слова текста (средствами jQuery),
//  начинающиеся и оканчивающиеся на гласные буквы. Поиск вести регистрозависимо или
//  регистрнезависимо – задавать режим поиска радиокнопками. Запишите найденные слова и количество
//  их вхождений в коллекцию объектов, выведите эту коллекцию на страницу.

// модуль второго задания
var moduleTask2 = {};

// тексты
moduleTask2.textList = getTextList();

// регистр поиска
moduleTask2.isCaseSensitive = true;

// реглярное выражение
moduleTask2.regExprList = /(?<!\S)[уеыаоэяиюёaeyuio]([a-zа-я]*[уеыаоэяиюёaeyuio])*(?=\s|$)/gi;

// вывод текста
moduleTask2.showText = function () {
    $('#textContainerId').html(moduleTask2.textList[getIntRand(0, moduleTask2.textList.length)]);
};

// подсветка слов в тексте
// подстветка по условию
moduleTask2.selectColorWords = function (regExpr = moduleTask2.regExprList) {
    // контейнер
    let obj = $('#textContainerId');

    // текст
    let text = obj.html();

    // результирующий обект поиска по регулярному выражению
    let result = {};

    // обработка текста
    while ((result = regExpr.exec(text)) != null) {
        let lastIndex = result.index + result[0].length;

        text = `${text.substring(0, result.index)}<span>${text.substring(
            result.index,
            lastIndex
        )}</span>${text.substring(lastIndex)}`;
    }

    // заполнение контейнера текстом
    obj.html(text);

    // подсветка слов
    obj.find('span').css('background-color', '#c6ff7c');
};

// получение частотного словаря
// поиск по функции
moduleTask2.getDictionary = function (regExpr = moduleTask2.regExprList) {
    // словарь
    let dictionary = {};

    // контейнер
    let obj = $('#textContainerId');

    // текст
    let text = obj.text();

    // результирующий обект поиска по регулярному выражению
    let result = {};

    // обработка текста
    while ((result = regExpr.exec(text)) != null) {
        let key = moduleTask2.isCaseSensitive ? result[0] : result[0].toLocaleLowerCase();
        dictionary[key] = dictionary[key] === undefined ? 1 : dictionary[key] + 1;
    }

    return dictionary;
};

// вывод частотного словаря
moduleTask2.showDictionary = function (dictionary = {}) {
    let entries = Object.entries(dictionary);

    // контейнер словаря
    let container = $('#dictionaryId');

    // очистка контейнера
    container.empty();

    // вывод вида поиска
    container.append(
        `<p class="text-align-center">Регистрозависимый поиск: <b>${moduleTask2.isCaseSensitive ? 'да' : 'нет'}</b></p>`
    );

    // вывод количества найденных слов
    $('#countWordsId').html(entries.reduce((a, i) => a + +i[1], 0));

    container.append(`<ul>${entries.reduce((a, i) => a + `<li><b>${i[0]}:</b> ${i[1]}</li>`, '')}</ul>`, '');
};

// запуск обработки текста
moduleTask2.run = function () {

    // получение частотного словаря
    let dictionary = moduleTask2.getDictionary();

    // вывод словаря
    moduleTask2.showDictionary(dictionary);

    // подсветка слов в тексте
    moduleTask2.selectColorWords();
};

// начальная иницализация
moduleTask2.init = function () {
    // вывод текста
    moduleTask2.showText();

    // установка обработчиков событий

    // обработка изменеия
    $('input[name="isCaseSensitive"]').on('click', function (e) {
        // получение значения
        moduleTask2.isCaseSensitive = $(e.target).val() === 'true';

        // обработка текста
        moduleTask2.run();
    });

    // генерация текста
    $('#selectTrainWithDestination').on('click', () => {
        // вывод случайного текста
        moduleTask2.showText();

        // обработка текста
        moduleTask2.run();
    });

    // обработка текста
    moduleTask2.run();
};

// обработка загрузки страницы
$(moduleTask2.init);

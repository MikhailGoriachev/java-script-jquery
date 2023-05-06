// Утилиты

// генерация случайного целого числа
function getIntRand(min = -10, max = 10) {
    return Math.floor(Math.random() * (max - min) + min);
}

// генерация случайного вещественного числа
function getDoubleRand(min = -10, max = 10) {
    return Math.random() * (max - min) + min;
}

// получить массив случайных целых чисел
function getIntArray(length = 10, min = -10, max = 11) {
    // массив
    let array = [];

    // заполнение массива
    for (let i = 0; i < length; i++) {
        array[i] = getIntRand(min, max);
    }

    return array;
}

// получить массив случайных чисел
function getDoubleArray(length = 10, min = -10, max = 11) {
    // массив
    let array = [];

    // заполнение массива
    for (let i = 0; i < length; i++) {
        array[i] = getDoubleRand(min, max);
    }

    return array;
}

// генерация даты
function getDate(dateMin = new Date(), dateMax = new Date()) {
    return new Date(dateMin.getTime() + Math.random() * (dateMax.getTime() - dateMin.getTime()));
}

// получить список городов
function getCityList() {
    return ['Донецк', 'Макеевка', 'Киев', 'Иловайск'];
}

// получить город
function getCity() {
    // массив городов
    let cities = getCityList();

    return cities[getIntRand(0, cities.length)];
}

// получить название услуги
function getServiceName() {
    // массив названий услуг
    let serviceNames = ['Ремонт компьютера', 'Ремонт ноутбука', 'Ремонт монитора', 'Ремонт комплектующих'];

    return serviceNames[getIntRand(0, serviceNames.length)];
}

// получить массив случайных чисел из массива значений
function getRangeArray(length = 10, range = []) {
    // массив
    let array = [];

    // размер массива диапазона
    let len = range.length;

    // заполнение массива
    for (let i = 0; i < length; i++) {
        array[i] = range[getIntRand(0, len)];
    }

    return array;
}

// вывод массива в виде таблицы в строку
function showArrayTable(array = [], title = '', lastRow = '', selectColor = () => {}, accentColor = () => {}) {
    // строка для вывода
    let line = `<table>
                ${title.length == 0 ? '' : `<caption><h3>${title}</h3></caption>`}
                <tbody>`;

    // максимальное количество элементов в строке
    const maxLenght = 10;

    // вывод элементов в строку
    for (let i = 0, k = 0; i < array.length / maxLenght; i++) {
        line += '<tr><td class="cell-header-gray cell-normal">Индекс</td>';

        // строка значений
        let values = '';

        // вывод элементов
        for (; k < array.length; ) {
            line += `<td class='cell-blue text-align-rigth'>${k}</td>`;

            // установка цвета ячейки со значением
            let color = selectColor(k, array[k]) ? 'cell-orange' : accentColor(k, array[k]) ? 'cell-red' : 'cell-green';

            values += `<td class='${color} text-align-rigth cell-normal'>${
                typeof array[k] === 'number'
                    ? array[k] == Math.trunc(array[k])
                        ? array[k]
                        : array[k].toFixed(3)
                    : array[k]
            }</td>`;

            if (++k % maxLenght == 0) break;
        }

        // добавление значений в строку
        line += `</tr><tr><td class="cell-header-gray cell-normal">Значение</td>${values}</tr>`;
    }

    // добавление последней строки
    line += lastRow;

    return (line += '</tbody></table>');
}

// получить фамилию и инициалы
function getFullName() {
    // массив фамилий
    let surnames = ['Иванов', 'Петров', 'Сидоров', 'Семенов', 'Павлов', 'Степанов', 'Алексеев', 'Александров'];

    // массив инициалов
    let initials = 'АБВГДЕЖЗИКЛМН';

    return `${surnames[getIntRand(0, surnames.length)]} ${initials.charAt(
        getIntRand(0, initials.length)
    )}. ${initials.charAt(getIntRand(0, initials.length))}.`;
}

// функция получения элемента по IdElement
function $(id) {
    return document.getElementById(id);
}

// фильтр поля для ввода
function filterInputForNumber(event) {
    if (!/[0-9]/.test(String.fromCharCode(event.keyCode))) event.preventDefault();
}

// генерация фамилии и инициалов по гендеру
// 0 - мужской, 1 - женский
function getFullNameGender(gender = 0) {
    // мужские фамилии и иницалы
    let male = [
        'Старостин В. А.',
        'Зорин А. М.',
        'Парфенов Е. М.',
        'Семенов А. Ф.',
        'Морозов М. М.',
        'Нефедов К. А.',
        'Сергеев А. С.',
        'Трофимов В. М.',
        'Зайцев Б. К.',
        'Климов Е. М.',
        'Потапов М. Д.',
        'Дементьев Д. И.',
        'Пономарев М. Г.',
        'Карасев А. М.',
        'Лапшин П. М.',
        'Киселев Т. Т.',
        'Максимов М. А.',
        'Лосев А. С.',
        'Гришин Д. С.',
        'Козлов А. Т.',
    ];

    // женские фамилии и иницалы
    let female = [
        'Комиссарова С. Р.',
        'Добрынина М. М.',
        'Максимова С. Б.',
        'Беляева А. Д.',
        'Гришина Л. А.',
        'Суворова В. Д.',
        'Зорина Е. Д.',
        'Калинина А. Е.',
        'Данилова А. Н.',
        'Самсонова В. М.',
        'Павлова В. А.',
        'Касьянова О. М.',
        'Козлова М. А.',
        'Гусева В. Ю.',
        'Сорокина А. Т.',
        'Давыдова В. М.',
        'Дмитриева А. И.',
        'Федорова П. Н.',
        'Шилова Е. А.',
        'Новикова В. А.',
    ];

    // генерация
    return gender ? female[getIntRand(0, female.length)] : male[getIntRand(0, male.length)];
}

// получить массив предметов
function getAcademySubjectList() {
    return [
        'математика',
        'информатика',
        'физика',
        'право',
        'литература',
        'география',
        'химия',
        'экономика',
        'биология',
        'история',
    ];
}

// получить предмет
function getAcademySubject() {
    let items = getAcademySubjectList();

    return items[getIntRand(0, items.length)];
}

// получить массив успеваемости
function getAcademyMarkList(length = 5) {
    return Array(length)
        .fill()
        .map((m) => new Mark(getAcademySubject(), getIntRand(1, 6)));
}

// получить массив названий групп
function getGroupList() {
    return ['Н-12', 'П-10', 'Д-24'];
}

// получить название группы
function getGroup() {
    let items = getGroupList();

    return items[getIntRand(0, items.length)];
}

// получить название файла изображения
function getFileNameGender(gender) {
    // название файлов для мужчин
    let manList = [
        'male_001.jpg',
        'male_002.jpg',
        'male_003.jpg',
        'male_004.jpg',
        'male_005.jpg',
        'male_006.jpg',
        'male_007.jpg',
        'male_008.jpg',
        'male_009.jpg',
        'male_010.jpg',
    ];

    // название файлов для женщин
    let womanList = [
        'female_001.jpg',
        'female_002.jpg',
        'female_003.jpg',
        'female_004.jpg',
        'female_005.jpg',
        'female_006.jpg',
        'female_007.jpg',
        'female_008.jpg',
        'female_009.jpg',
        'female_010.jpg',
    ];

    return gender ? womanList[getIntRand(0, womanList.length)] : manList[getIntRand(0, manList.length)];
}

// запись в cookie
function setCookie(key = '', value = '', time = 360) {
    document.cookie = `${key}=${encodeURIComponent(value)}; max-age=${time}`;
}

// чтение coockie в массив объектов { key, value }
function getCookies() {
    // cookie
    return decodeURIComponent(document.cookie)
        .split('; ')
        .map((p) => {
            let arr = p.split('=');

            return {
                key: arr[0],
                value: arr[1],
            };
        });
}

// чтение cookie по ключу
function getCookieForKey(key = '') {
    return getCookies().find((c) => c.key === key);
}

// очистка cookie
function clearCookies() {
    // получить массив cookie
    getCookies().forEach((c) => (document.cookie = `${c.key}=; max-age=0;`));
}

// получить коллекцию фильмов
function getFilmList() {
    return [
        new Film('Зеленая миля', 'Фрэнк Дарабонт', 'драма', 1999),
        new Film('Список Шиндлера', 'Стивен Спилберг', 'драма', 1993),
        new Film('Побег из Шоушенка', 'Фрэнк Дарабонт', 'драма', 1994),
        new Film('Форрест Гамп', 'Роберт Земекис', 'драма', 1994),
        new Film('Криминальное чтиво', 'Квентин Тарантино', 'криминал', 1994),
        new Film('Поймай меня, если сможешь', 'Ствен Спилберг', 'криминал', 2002),
        new Film('Джентльмены', 'Гай Ричи', 'криминал', 2019),
        new Film('Линкольн для адвоката', 'Брэд Фурман', 'детектив', 2011),
        new Film('Достать ножи', 'Райан Джонсон', 'детектив', 2019),
        new Film('Шестое чувство', 'М. Найт Шьямалан', 'детектив', 1999),
    ];
}

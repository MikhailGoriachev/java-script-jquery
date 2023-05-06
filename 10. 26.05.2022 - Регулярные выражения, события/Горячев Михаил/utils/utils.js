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

// получить город
function getCity() {
    // массив городов
    let cities = ['Донецк', 'Макеевка', 'Киев', 'Иловайск'];

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

    return `${surnames[getIntRand(0, surnames.length)]}
            ${initials.charAt(getIntRand(0, initials.length))}.
            ${initials.charAt(getIntRand(0, initials.length))}.`;
}

// функция получения элемента по IdElement
function $(id) {
    return document.getElementById(id);
}

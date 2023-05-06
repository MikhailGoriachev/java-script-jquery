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

// получение строкового значения по ключу
function getPort() {
    let ports = ['Шанхай', 'Сингапур', 'Тяньцзин', 'Циндао', 'Амстердама', 'Тайчжун', 'Бейрут'];

    return ports[(0, getIntRand(0, ports.length))];
}

// Утилиты

// генерация случайного числа числа
function getRand(min = -10, max = 10) {
    return Math.random() * (max - min) + min;
}

// получить массив случайных чисел
function getArray(length = 10, min = -10, max = 11) {
    // массив
    let array = [];

    // заполнение массива
    for (let i = 0; i < length; i++) {
        array[i] = Math.trunc(getRand(min, max));
    }

    return array;
}

// вывод массива в виде таблицы в строку
function showArrayTable(array = [], title = '', selectIndex = [], lastRow = '', comparator = function () {}) {
    // строка для вывода
    line = `<table>
                ${title.length == 0 ? '' : `<caption><h3>${title}</h3></caption>`}
                <thead>
                    <tr>
                        <th class="header-short">Индекс</th>
                        <th>Значение</th>
                    </tr>
                </thead>
                <tbody>`;

    // вывод элементов в строку
    for (let i = 0; i < array.length; i++) {
        let color = selectIndex.includes(i) || comparator(i, array[i]) ? 'cell-orange' : 'cell-green';

        line += `<tr>
                    <td class='cell-blue text-align-rigth'>${i}</td>
                    <td class='${color} text-align-rigth'>${array[i]}</td>
                </tr>`;
    }

    // добавление последней строки
    line += lastRow;

    return (line += '</tbody></table>');
}

// поиск первого вхождения индекса элемента по комаратору (функции)
function findIndex(array = [], f = function () {}, startIndex = 0) {
    for (let i = startIndex; i < array.length; i++) {
        if (f(array[i])) return i;
    }
}

// поиск первого вхождения индекса элемента по комаратору (функции)
function findLastIndex(array = [], f = function () {}) {
    for (let i = array.length - 1; i >= 0; i--) {
        if (f(array[i])) return i;
    }
}

// сортировка пузырьком
function bubbleSort(arr = [], comp = function (a, b) {}) {
    for (var i = 0, endI = arr.length - 1; i < endI; i++) {
        for (var j = 0, endJ = endI - i; j < endJ; j++) {
            if (comp(arr[j], arr[j + 1])) {
                var swap = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = swap;
            }
        }
    }
    return arr;
}

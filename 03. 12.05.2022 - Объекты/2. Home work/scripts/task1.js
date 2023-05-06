// Задание 1. Целые числа

// Задача 1. Формировать массив размера N целых чисел (и размер и значения) при каждой загрузке страницы:
// •	Вычислить сумму элементов массива, расположенных после последнего отрицательного элемента
// •	Вычислить количество элементов массива, имеющих значение из диапазона [a, b] и их произведение
// •	Каждый отрицательный элемент массива заменить корнем кубическим его абсолютного значения
// •	Преобразовать массив таким образом, чтобы в нем сначала располагались элементы, имеющих значение из диапазона [a, b], а потом — все остальные
// •	Каждый элемент массива, больший нуля заменить его обратным значением (1/x), упорядочить преобразованный массив по убыванию абсолютных значений.

// работа по заданию
function task1() {
    // диапазон значений
    const minLenght = 10,
        maxLenght = 20,
        minValue = -10,
        maxValue = 20,
        min = getIntRand(minValue + 5, minValue + 7),
        max = getIntRand(maxValue - 5, maxValue - 7);

    // формирование массива
    let array = getIntArray(getIntRand(minLenght, maxLenght + 1), minValue, maxValue);

    // вывод массива
    showArrayTable(array, 'Исходный массив');

    // поиск индекса последнего отрицательного элемента
    let index = findLastIndex(array, (elem) => elem < 0);

    // Вычислить сумму элементов массива, расположенных после последнего отрицательного элемента
    let sum = sumFromIndex(array, index + 1);

    // вывод массива
    document.write(
        showArrayTable(
            array,
            `Сумма элементов массива, после последнего отрицательного элемента: ${sum}`,
            '',
            (i, value) => i > index,
            (i, value) => i == index
        )
    );

    // Вычислить количество элементов массива, имеющих значение из диапазона [a, b] и их произведение
    let count = countRangeItems(array, min, max),
        prod = count === 0 ? 0 : prodRangeItems(array, min, max);

    // вывод массива
    document.write(
        showArrayTable(
            array,
            `Вычислить количество элементов массива, имеющих значение из диапазона [a, b] и их произведение:<br> диапазон = [${min}, ${max}], количество = ${count}, произведение = ${prod}`,
            '',
            (i, value) => value >= min && value <= max
        )
    );

    // Каждый отрицательный элемент массива заменить корнем кубическим его абсолютного значения
    array = cbrtNegItems(array);

    // вывод массива
    document.write(
        showArrayTable(
            array,
            `Каждый отрицательный элемент массива заменить корнем кубическим его абсолютного значения`
        )
    );

    // Преобразовать массив таким образом, чтобы в нем сначала располагались элементы, имеющих значение из диапазона [a, b], а потом — все остальные
    sortArray(array, min, max);

    // вывод массива
    document.write(
        showArrayTable(
            array,
            `Преобразовать массив таким образом, чтобы в нем сначала располагались элементы, имеющих значение из диапазона [a, b], а потом — все остальные:<br>диапазон = [${min}, ${max}]`,
            '',
            (i, value) => value >= min && value <= max
        )
    );

    // Каждый элемент массива, больший нуля заменить его обратным значением (1/x), упорядочить преобразованный массив по убыванию абсолютных значений.
    array = replaceAndSort(array);

    // вывод массива
    document.write(
        showArrayTable(
            array,
            `Каждый элемент массива, больший нуля заменить его обратным значением (1/x), упорядочить преобразованный массив по убыванию абсолютных значений`,
            ''
        )
    );
}

// вычислить сумму элементов массива, расположенных после последнего отрицательного элемента
function sumFromIndex(array = [], fromIndex = 0) {
    // подсчёт суммы элементов
    return array.reduce((acc, item, i) => (acc += i >= fromIndex ? item : 0), 0);
}

// вычислить количество элементов массива, имеющих значение из диапазона [a, b]
function countRangeItems(array = [], min = 0, max = 0) {
    return array.reduce((acc, item) => (acc += item >= min && item <= max ? 1 : 0), 0);
}

// вычислить произведение элементов массива, имеющих значение из диапазона [a, b]
function prodRangeItems(array = [], min = 0, max = 0) {
    return array.reduce((acc, item) => (acc *= item >= min && item <= max ? item : 1), 1);
}

// каждый отрицательный элемент массива заменить корнем кубическим его абсолютного значения
function cbrtNegItems(array = []) {
    return array.map((item) => (item < 0 ? Math.cbrt(Math.abs(item)) : item));
}

// преобразовать массив таким образом, чтобы в нем сначала располагались элементы, имеющих значение из диапазона [a, b], а потом — все остальные
function sortArray(array = [], min = 0, max = 0) {
    array.sort((a, b) => (a >= min && a <= max ? -1 : 1));
}

// каждый элемент массива, больший нуля заменить его обратным значением (1/x), упорядочить преобразованный массив по убыванию абсолютных значений.
function replaceAndSort(array = []) {
    return array.map((item) => (item > 0 ? 1 / item : item)).sort((a, b) => Math.abs(b) - Math.abs(b));
}

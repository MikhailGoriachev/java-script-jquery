// Задача 2. Вещественные числа

// Задача 2. Сформировать массив размера N вещественных чисел (и размер и значения) при каждой загрузке страницы.
// •	Удалить из массива все одинаковые элементы, оставив их последние вхождения, вывести размер полученного массива и его элементы.
// •	Утроить (т. е. Повторить трижды) все отрицательные нечетные элементы массива.

// работа по заданию
function task2() {
    // диапазон значений
    const minLenght = 10,
        maxLenght = 20,
        minValue = -10,
        maxValue = 20,
        rangeLenght = 6;

    // массив вещественных чисел
    let array = getRangeArray(getIntRand(minLenght, maxLenght + 1), getDoubleArray(rangeLenght));
    // let array = [];

    // вывод массива
    document.write(showArrayTable(array, 'Исходный массив'));

    // Удалить из массива все одинаковые элементы, оставив их последние вхождения, вывести размер полученного массива и его элементы.
    removeDuplicatesElem(array);

    // вывод массива
    document.write(
        showArrayTable(
            array,
            'Удалить из массива все одинаковые элементы, оставив их последние вхождения, вывести размер полученного массива и его элементы.'
        )
    );

    // Утроить (т. е. Повторить трижды) все отрицательные нечетные элементы массива.
    tripleNegElem(array);

    // вывод массива
    document.write(
        showArrayTable(
            array,
            'Утроить (т. е. Повторить трижды) все отрицательные нечетные элементы массива.',
            '',
            (i, v) => v < 0
        )
    );
}

// Удалить из массива все одинаковые элементы, оставив их последние вхождения, вывести размер полученного массива и его элементы.
function removeDuplicatesElem(array = []) {
    // вырезать элементы по значению кроме последнего вхождения
    function removeButLast(value) {
        // поиск индекса перевого элемента по значению
        function findIndex() {
            // сравнение давух значений
            comp = (a, b) => {
                return Math.abs(a - b) < 1e-5;
            };

            // поиск элементов
            for (let i = 0; i < array.length; i++) {
                if (comp(value, array[i])) return i;
            }

            return -1;
        }

        // количество удалённых элементов
        let count = 0;

        // индекс последнего элемента
        let last = array.lastIndexOf(value),
            index;

        // поиск и удаление дубликатов элементов
        while ((index = findIndex()) != -1 && index != last) {
            // удаление элемента
            array.splice(index, 1);

            // увеличение счётчика удалённых элементов
            count++;

            // уменьшение индекса последнего вхождения элемента
            last--;
        }

        return count;
    }

    // поиск и удаление дубликатов элементов
    for (let i = array.length - 1; i >= 0; i--) {
        i -= removeButLast(array[i]);
    }
}

// Утроить (т. е. Повторить трижды) все отрицательные нечетные элементы массива.
function tripleNegElem(array = []) {
    // утраивание элемента с отрицательным значением
    function tripleIndex(index) {
        array.splice(index, 0, array[index], array[index], array[index]);
    }

    // поиск отрицательных элементов
    for (let i = 0; i < array.length; i++) {
        if (array[i] < 0) {
            tripleIndex(i);
            i += 3;
        }
    }
}

// Задача 3. Книга

// Задача 3. Спроектировать объект для представления данных о книге: название, автор, год издания, цена, изображение обложки.
// Предусмотрите методы для увеличения цены книги на заданное значение (не допускайте значений, меньше или равных нулю),
// увеличения года издания на 1 год, задания нового изображения обложки. Продемонстрируйте работу методов объекта

// работа по заданию
function task3() {
    // объект книги
    let book = {
        title: 'Как перестать программировать и начать жить',
        author: 'Алексей Андреев',
        year: 2001,
        price: 3500,
        cover: 'book-cool.png',

        // увеличение цены книги
        priceIncrease: function (value = 1) {
            this.price += value > 0 ? value : 0;
        },

        // увлечение года издания на 1 год
        yearIncreaseByOne: function () {
            this.year++;
        },

        // задание нового изображения книги
        changeCover: function (value) {
            this.cover = value;
        },
    };

    // вывод объекта
    document.write(showBook(book, 'Исходная книга'));

    // изменение полей объекта книги

    // диапазон значений
    const min = 3,
        max = 10;

    // увеличение цены книги
    book.priceIncrease(getIntRand(min, max) * 100);

    // увеличение года издания на 1 год
    book.yearIncreaseByOne();

    // задание нового изображения книги
    book.changeCover('book-cool-2.jpg');

    // вывод объекта
    document.write(showBook(book, 'Книга после изменений'));
}

// вывод книги
function showBook(book, header = '') {
    return `<table>
        <caption><h2>${header}</h2></caption>
        <tbody>
            <tr>
                <td rowspan="4" class="cell-light-blue">
                    <image src="../images/${book.cover}" height="400"></image>
                </td>
                <td class="cell-green">Название: ${book.title}</td>
            </tr>
            <tr>
                <td class="cell-blue">Автор: ${book.author}</td>
            </tr>
            <tr>
                <td class="cell-orange">Год издания: ${book.year}</td>
            </tr>
            <tr>
                <td class="cell-pink">Цена: ${book.price}</td>
            </tr>
        </tbody>
    </table>`;
}

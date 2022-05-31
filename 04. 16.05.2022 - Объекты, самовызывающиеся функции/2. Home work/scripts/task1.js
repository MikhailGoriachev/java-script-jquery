// Задача 1. Книга

// •	Задача 1. Спроектировать модуль – работа с объектом для представления данных о книге в магазине:
//      автор, название, год издания, фото обложки, цена и количество. Методы должны позволять получать и менять
//      свойства объекта данных, формировать разметку для представления данных (используйте простые решения по
//      разметке, не надо применять того, что еще не изучали, глубже изучайте пройденный материал). Продемонстрируйте
//      работу методов модуля.

// модуль книга
const book = (function (
    author = 'Фамилия И.О.',
    title = 'Неизвестная книга',
    pubYear = new Date().getFullYear(),
    coverView = '',
    price = 1,
    amount = 1
) {
    // поля модуля
    let fields = {
        // автор
        author: author,

        // название
        title: title,

        // год издания
        pubYear: pubYear,

        // фото обложки
        coverView: coverView,

        // цена
        price: price,

        // количество
        amount: amount,
    };

    // константные значения
    const minPubYear = 1600,
        minValue = 0,
        maxValue = 1000000;

    // методы
    return {
        //#region Геттеры и сеттеры

        // автор
        setAuthor: function (author = '') {
            fields.author = author.length > 0 ? author : fields.author;
        },

        getAuthor: function () {
            return fields.author;
        },

        // название
        setTitle: function (title = '') {
            fields.title = title.length > 0 ? title : fields.title;
        },

        getTitle: function () {
            return fields.title;
        },

        // год издания
        setPubYear: function (pubYear = 0) {
            fields.pubYear = pubYear >= minPubYear && pubYear <= new Date().getFullYear() ? pubYear : fields.pubYear;
        },

        getPubYear: function () {
            return fields.pubYear;
        },

        // фото обложки
        setCoverView: function (coverView = '') {
            fields.coverView = coverView;
        },

        getCoverView: function () {
            return fields.coverView;
        },

        // цена
        setPrice: function (price = minValue) {
            fields.price = price >= minValue && price <= maxValue ? price : fields.price;
        },

        getPrice: function () {
            return fields.price;
        },

        // количество
        setAmout: function (amount = 0) {
            fields.amount = amount >= minValue && amount <= maxValue ? amount : fields.amount;
        },

        getAmount: function () {
            return fields.amount;
        },

        //#endregion

        //#region Методы

        // вывод книги в разметку
        show: function () {
            document.write(`<div class="book">
                                <div class="book-image">
                                    <img src="../images/${fields.coverView}" alt="Изображение книги" />
                                </div>
                                <div class="title"><h3>${fields.title}</h3></div>
                                <div>Автор: <span>${fields.author}</span></div>
                                <div>Год издания: <span>${fields.pubYear}</span></div>
                                <div>Цена: <span>${fields.price}</span></div>
                                <div>Количеств: <span>${fields.amount}</span></div>
                            </div>`);
        },

        //#endregion
    };
})();

// работа по заданию
(function Task1() {
    // установка начальных значений
    book.setTitle('Путь программиста');
    book.setAuthor('Джон Сонмез');
    book.setCoverView('book-path-programmer.jpg');
    book.setPrice(4000);
    book.setPubYear(2016);
    book.setAmout(getIntRand(0, 150));

    // вывод книги
    book.show();

    // изменение полей книги
    book.setTitle('Путь самурая (Хагакурэ)');
    book.setAuthor('Ямамото Цунэтомо');
    book.setCoverView('book-samurai.jpg');
    book.setPrice(5500);
    book.setPubYear(2019);
    book.setAmout(getIntRand(0, 150));

    // вывод книги
    book.show();
})();

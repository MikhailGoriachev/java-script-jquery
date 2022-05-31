// Задача 2. Книга

//  •	Задача 2. Спроектировать функцию-конструктор (с использованием прототипов) – данные
//      о книге в магазине: автор, название, год издания, изображение обложки, цена и количество.
//      разметки для представления данных. Создайте массив книг (не более 10), выведите массив на
//      Разработайте методы (на базе прототипов) для вычисления стоимости книги в магазине, формирования
//      страницу, вычислите общую стоимость всех книг магазина, общее количество книг в магазине.

// работа по заданию
(function Task1() {
    // массив книг
    let books = [
        new Book('Джон Сонмез', 'Путь программиста', 2016, 'book-path-programmer.jpg', 3800, getIntRand(0, 20)),
        new Book('Ямамото Цунэтомо', 'Путь самурая (Хагакурэ)', 2019, 'book-samurai.jpg', 3500, getIntRand(0, 20)),
        new Book('Стив Макконнелл', 'Совершенный код', 1993, 'book-1.jpg', 4000, getIntRand(0, 20)),
        new Book('Эрвин Кнут', 'Искусство программирования', 1968, 'book-2.jpg', 4200, getIntRand(0, 20)),
        new Book('Кент Бек', 'Refactoring', 1999, 'book-3.jpg', 4700, getIntRand(0, 20)),
        new Book('Брюс Эккель', 'Философия Java', 1998, 'book-4.jpg', 4800, getIntRand(0, 20)),
        new Book('Анна Фролова', 'Собачье счастье', 2021, 'book-5.jpg', 3700, getIntRand(0, 20)),
        new Book('Чиннатхамби Кирупа', 'JavaScript с нуля', 2021, 'book-6.jpg', 1850, getIntRand(0, 20)),
        new Book('Эрих Гамма', 'Design Patterns', 1994, 'book-7.jpg', 3000, getIntRand(0, 20)),
        new Book('Эрик Фриман', 'Паттерны проектирования', 2004, 'book-8.jpg', 2000, getIntRand(0, 20)),
    ];

    // количество и стоимость
    let result = { amount: 0, cost: 0 };

    // получить количество книг и стоимость
    books.forEach((b) => {
        result.amount += b.amount;
        result.cost += b.cost();
    });

    // вывод статистики
    document.write(`<h3 class='text-align-center'>Статистика</h3>
        <p>Общее количество книг: <b>${result.amount}</b></p>
        <p>Стоимость книг: <b>${result.cost}</b></p>
        </div><div class="container">`);

    // вывод книг
    books.forEach((b) => b.show());

    document.write('</div>');
})();

// объект - Книга
function Book(
    author = 'Фамилия И.О.',
    title = 'Неизвестная книга',
    pubYear = new Date().getFullYear(),
    coverView = '',
    price = 1,
    amount = 1
) {
    //#region поля объекта

    // автор
    this.author = author;

    // название
    this.title = title;

    // год издания
    this.pubYear = pubYear;

    // фото обложки
    this.coverView = coverView;

    // цена
    this.price = price;

    // количество
    this.amount = amount;

    //#endregion

    //#region Методы

    // вывод книги в разметку
    Book.prototype.show = function () {
        document.write(`<div class="book">
                            <div class="book-image">
                                <img src="../images/${this.coverView}" alt="Изображение книги" />
                            </div>
                            <div class="title"><h3>${this.title}</h3></div>
                            <div>Автор: <span>${this.author}</span></div>
                            <div>Год издания: <span>${this.pubYear}</span></div>
                            <div>Цена: <span>${this.price}</span></div>
                            <div>Количеств: <span>${this.amount}</span></div>
                        </div>`);
    };

    // получить стоимость книг
    Book.prototype.cost = function () {
        return this.price * this.amount;
    };

    //#endregion
}

// Класс Фильм:
//      - названием
//      - фамилией и инициалами режиссера
//      - жанром
//      - годом выпуска
class Film {
    // конструктор
    constructor(name, producer, genre, year) {
        // название
        this.name = name;

        // фамилия и инициалы режиссера
        this.producer = producer;

        // жанры
        this.genre = genre;

        // год выпуска
        this.year = year;
    }

    //#region Сеттеры и геттеры

    // название
    set name(value) {
        this._name = value;
    }

    get name() {
        return this._name;
    }

    // фамилия и инициалы режиссера
    set producer(value) {
        this._producer = value;
    }

    get producer() {
        return this._producer;
    }

    // жанр
    set genre(value) {
        this._genre = value;
    }

    get genre() {
        return this._genre;
    }

    // год выпуска
    set year(value) {
        this._year = value;
    }

    get year() {
        return this._year;
    }

    //#endregion

    //#region Методы

    // получение строки с разметкой карточки объёкта для вывода
    showToTableRow(tbody, num) {
        $(tbody).append(`
            <tr>
                <td class="text-align-right">${num}</td>
                <td name="name">${this.name}</td>
                <td name="producer">${this.producer}</td>
                <td name="genre">${this.genre}</td>
                <td name="year" class="text-align-center">${this.year}</td>
            </tr>`);
    }

    //#endregion
}

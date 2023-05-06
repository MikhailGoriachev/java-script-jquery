// Класс Фильмотека
class FilmLibrary {
    // следующий идентификатор
    static _nextId = 0;

    // конструктор
    constructor(name = '', films = []) {
        // идентификатор
        this._id = FilmLibrary._nextId++;

        // название
        this.name = name;

        // фильмы
        this.films = films;

        // таймер
        this._timer = null;
    }

    //#region Сеттеры и геттеры

    // идентификатор
    get id() {
        return this._id;
    }

    // название
    set name(value) {
        this._name = value;
    }

    get name() {
        return this._name;
    }

    // фильмы
    set films(value) {
        this._films = value;
    }

    get films() {
        return this._films;
    }

    // коллекция уникальных жанров
    get genres() {
        return [...new Set(this.films.map((f) => f.genre))];
    }

    // коллекция уникальных режиссеров
    get producers() {
        return [...new Set(this.films.map((f) => f.producer))];
    }

    //#endregion

    //#region Методы

    // сохранение данных в локальном хранилище
    saveData() {
        window.localStorage.filmList = JSON.stringify(this.films);
    }

    // загрузка данных в локальном хранилище
    loadData() {
        // если данные отсутствуют
        if (!window.localStorage.filmList) return false;

        // загрузка данных из локального хранилища
        this.films = JSON.parse(window.localStorage.filmList).map((f) => Object.assign(new Film(), f));

        return true;
    }

    // вывод фильмов в виде таблицы
    showTable(container = '#filmListId') {
        // если таблицы ещё нет
        if (!$(`#filmListTable${this.id}`).length) {
            $(container).append(`
                    <table id="filmListTable${this.id}" class="table">
                    <caption>
                        <h3>Список фильмов</h3>
                    </caption>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th class="width-big">Название</th>
                            <th class="width-normal">Режиссёр</th>
                            <th class="width-normal">Жанр</th>
                            <th>Год выпуска</th>
                        </tr>
                    </thead>

                    <tbody id="filmListTBody${this.id}"></tbody>
                </table>`);
        }

        let num = 1;

        // заполенение таблицы элементами
        this.films.forEach((f) => f.showToTableRow(`#filmListTBody${this.id}`, num++));
    }

    // Вывести фильмы в таблицу. По командным кнопкам, при помощи функции css()
    //  выделить строки таблицы: с заданными жанрами, режиссерами, годом выпуска.

    // выделение фильмов
    selectColor(query = '') {
        // удаление данных из таблицы
        $(`#filmListTBody${this.id}`).empty();

        // очитска текущего выделения
        this.showTable();

        // установка цвета
        $(query).css('background-color', '#c6ff7c');
        // query.css('background-color', '#c6ff7c');
        // $(query).eq(1).css('background-color', '#c6ff7c');

        // удаление текущего таймеру
        clearTimeout(this._timer);

        // возврат цвета
        this._timer = setTimeout(() => {
            // удаление данных из таблицы
            $(`#filmListTBody${this.id}`).empty();

            // вывод таблица
            this.showTable();
        }, 5_000);
    }

    // выделение фильмов с зааднным жанром
    selectColorByGenre(genre = '') {
        this.selectColor(`tr td[name="genre"]:contains(${genre})`);
    }

    // выделение фильмов с заданным режиссером
    selectColorByProducer(producer = '') {
        this.selectColor(`tr td[name="producer"]:contains(${producer})`);
    }

    // выделение фильмов с заданным годом выпуска
    selectColorByYear(year = '') {
        this.selectColor(`tr td[name="year"]:contains(${year})`);
    }

    //#endregion
}

//  Задача 2. Фильмотека

//  Задача 2. Сформировать массив фильмов в фильмотеке (использовать классы, фильмов не менее 10,
//  хранить в локальном хранилище, фильм описывается названием, фамилией и инициалами режиссера,
//  жанром, годом выпуска). Вывести фильмы в таблицу. По командным кнопкам, ячейки таблицы: с заданными
//  жанрами, режиссерами, годом выпуска.

// модуль второго задания
var moduleTask2 = {};

// фильмотека
moduleTask2.filmLibrary = new FilmLibrary('Элит');

// обработчик события загрузки страницы
moduleTask2.init = function () {
    // загрузка данных из локального хранилища
    if (!moduleTask2.filmLibrary.loadData()) {
        moduleTask2.filmLibrary.films = getFilmList().sort(() => 0.5 - Math.random());
        moduleTask2.filmLibrary.saveData();
    }

    // вывод коллекции фильмов картотеки
    moduleTask2.filmLibrary.showTable();

    // обработчики событий

    // выделение фильмов с зааднным жанром
    $('#selectFilmsWithGenre').click(() => moduleTask2.filmLibrary.selectColorByGenre($('#genreListId').val()));

    // выделение фильмов с заданным режиссером
    $('#selectFilmsWithProducer').click(() =>
        moduleTask2.filmLibrary.selectColorByProducer($('#producerListId').val())
    );

    // выделение фильмов с заданным годом выпуска
    $('#selectFilmsWithYear').click(() => moduleTask2.filmLibrary.selectColorByYear($('#yearId').val()));

    // заполнение списка жанров
    $('#genreListId').append(
        moduleTask2.filmLibrary.genres.reduce((acc, item) => (acc += `<option>${item}</option>`), '')
    );

    // заполнение списка режиссеров
    $('#producerListId').append(
        moduleTask2.filmLibrary.producers.reduce((acc, item) => (acc += `<option>${item}</option>`), '')
    );
};

// обработка события загрузки страницы
$(moduleTask2.init);

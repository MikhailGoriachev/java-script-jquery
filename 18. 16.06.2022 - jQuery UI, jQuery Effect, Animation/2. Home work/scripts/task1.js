//  Задача 1. Расписание

//  Задача 1. Требуется разработать классы для работы с расписанием отправлений поездов дальнего
//  следования. Для каждого поезда указывается: номер поезда, станция назначения, время отправления.
//
//  Вокзал характеризуется названием, городом размещения, максимальным количеством поездов в
//  расписании, минимальным количеством поездов в расписании.
//
//  Хранить данные о поездах и вокзале в локальном хранилище, в формате JSON.
//  Функционал для разработки:
//  •	инициализация коллекции сведений о поездах (не менее 12 поездов);
//  •	добавление поезда в расписание
//  •	удаление поезда из расписания
//  •	изменение сведений о поезде в расписании
//  •	вывод сведений по всем поездам, упорядоченный по времени отправления
//  •	вывод сведений по всем поездам, упорядоченный по пункту назначения;
//  •	выделение сведений по поезду с запрошенным интервалом времени отправления;
//  •	выделение сведений по тем поездам, которые следуют до запрошенной станции назначения.
//  При упорядочивании сведений исходную коллекцию поездов не менять, работайте с копией этой коллекции.

// модуль первого задания
var moduleTask1 = {};

// станция
moduleTask1.station = new Station();

// форма
moduleTask1.form = null;

// минимальное количествоо поездов для генерации
moduleTask1.minInitTrainList = 12;

// показать диалоговое окно
moduleTask1.showDialog = function (header = '', text = '') {
    let dialog = $('dialogWarning');

    // если диалоговое окно ещё не создано
    if (!dialog.length) {
        $('body').append(`
            <div id="dialogWarning">
                <p id="dialogWarningText"></p>
            </div>
        `);

        dialog = $('#dialogWarning');

        // создание диалога
        dialog.dialog({
            show: {
                effect: 'blind', duration: 'slow',
            }, hide: {
                effect: 'blind', duration: 'fast',
            }, width: 500, height: 250, modal: true, buttons: {
                Ok: function () {
                    $(this).dialog('close');
                },
            },
        });
    }

    // установка текстовок
    dialog.dialog('option', 'title', header);
    $('#dialogWarningText').html(text);

    // открытие диалога
    dialog.dialog('open');
};

// добавление поезда в расписание
moduleTask1.addTrain = function () {
    // текущее количество городов
    let count = moduleTask1.station.trainList.length;

    // если лимит поездов исчерпан
    if (count === moduleTask1.station.maxTrains) {
        moduleTask1.showDialog('Невозможно добавить поезд!', `Лимит поездов исчерпан (${count}/${moduleTask1.station.maxTrains})`);
        return;
    }

    // запуск формы
    moduleTask1.form.show();
};

// изменение сведений о поезде в расписании
moduleTask1.editTrain = function (e) {
    let id = e.target.id;

    // проверка на режим редактирования
    if (!id || !id.startsWith('btnEdit')) return;

    // получение id записи, из id источника
    id = +id.slice(id.indexOf('_') + 1);

    // запуск формы
    moduleTask1.form.show(moduleTask1.station.trainList.find((t) => t.id === id));
};

// удаление поезда из расписания
moduleTask1.removeTrain = function (e) {
    let id = e.target.id;

    // проверка на режим удаления
    if (!id || !id.startsWith('btnRemove')) return;

    // текущее количество городов
    let count = moduleTask1.station.trainList.length;

    // если лимит поездов исчерпан
    if (count === moduleTask1.station.minTrains) {
        moduleTask1.showDialog('Невозможно удалить поезд!', `Минимальное количество поездов достигнуто (${count})`);
        return;
    }

    // ссыдка на коллекцию поездов
    let list = moduleTask1.station.trainList;

    // получение id записи, из id источника
    id = +id.slice(id.indexOf('_') + 1);

    // удаление поезда из коллекции
    list.splice(list.findIndex((t) => t.id === id), 1);

    // вывод коллекции
    moduleTask1.station.showToHTML();

    // сохранение данных
    moduleTask1.station.save();
};

// вывод сведений по всем поездам, упорядоченный по времени отправления
moduleTask1.sortByTime = function () {
    moduleTask1.station.showToHTML('Поезда. Сортировка по времени отправления', moduleTask1.station.sortByTime());
};

// вывод сведений по всем поездам, упорядоченный по пункту назначения;
moduleTask1.sortByDestination = function () {
    moduleTask1.station.showToHTML('Поезда. Сортировка по пункту назначения', moduleTask1.station.sortByDestination());
};

// выделение сведений по поезду с запрошенным интервалом времени отправления;
moduleTask1.colorByTimeInterval = function () {
    // объекты даты и времени
    let min = new Date(), max = new Date();

    // получение значений диапазона
    let slider = $('#timeRangeId');
    let minVal = slider.slider('values', 0), maxVal = slider.slider('values', 1);

    // установка нижней границы диа
    // пазона
    min.setHours(minVal / 6);
    min.setMinutes((minVal % 6) * 10);

    // установка верхней границы диапазона
    max.setHours(maxVal / 6);
    max.setMinutes((maxVal % 6) * 10);

    // выделение элементов цветом
    moduleTask1.station.colorByTimeInterval(min, max);
};

// выделение сведений по тем поездам, которые следуют до запрошенной станции назначения.
moduleTask1.colorByDestination = function () {
    moduleTask1.station.colorByDestination($('#destinationListId').val());
};

// начальная иницализация
moduleTask1.init = function () {
    // загрузка данных из локальног хранилища
    if (!moduleTask1.station.load()) {
        // генерация списка подездов
        moduleTask1.station.trainList = new Array(moduleTask1.minInitTrainList).fill().map(() => Train.generate());

        // сохранение данных в локальное хранилище
        moduleTask1.station.save();
    }

    // вывод коллекции
    moduleTask1.station.showToHTML();

    // инициализация формы
    moduleTask1.form = new TrainForm((t) => {
        moduleTask1.station.trainList.unshift(t);
        moduleTask1.station.showToHTML();
        moduleTask1.station.save();
    }, () => {
        moduleTask1.station.showToHTML();
        moduleTask1.station.save();
    });

    // установка обработчиков событий

    // добавление поезда в расписание
    $('#addTrain').on('click', moduleTask1.addTrain);

    // контейнер списка поездов
    let container = $('#trainListId');

    // изменение сведений о поезде в расписании
    container.on('click', moduleTask1.editTrain);

    // удаление поезда из расписания
    container.on('click', moduleTask1.removeTrain);

    // вывод поездов в исходном порядке
    $('#sortTrainByDefault').on('click', () => moduleTask1.station.showToHTML());

    // вывод сведений по всем поездам, упорядоченный по времени отправления
    $('#sortTrainByTime').on('click', moduleTask1.sortByTime);

    // вывод сведений по всем поездам, упорядоченный по пункту назначения
    $('#sortTrainByDestination').on('click', moduleTask1.sortByDestination);

    // выделение сведений по поезду с запрошенным интервалом времени отправления
    $('#selectTrainWithTime').on('click', moduleTask1.colorByTimeInterval);

    // выделение сведений по тем поездам, которые следуют до запрошенной станции назначения
    $('#selectTrainWithDestination').on('click', moduleTask1.colorByDestination);

    // заполнение списка станций
    $('#destinationListId').html(getStationNameList().reduce((acc, item) => (acc + `<option>${item}</option>`), ''));

    // диапазон времени
    let elem = $('#timeRangeId');

    // установка контролла для установка периода времени
    elem.slider({
        range: true, min: 0, max: 143, values: [30, 121], slide: function (e, u) {
            $('#selectRangeId').val(`${getValueToTime(u.values[0])} — ${getValueToTime(u.values[1])}`);
        },
    });

    // вывод начальных значений
    $('#selectRangeId').val(`${getValueToTime(elem.slider('values', 0))} — ${getValueToTime(elem.slider('values', 1))}`);
};

// обработка загрузки страницы
$(moduleTask1.init);

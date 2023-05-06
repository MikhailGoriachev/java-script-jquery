// Класс Станция
class Station {
    // Вокзал характеризуется названием, городом размещения, максимальным количеством поездов
    // в расписании, минимальным количеством поездов в расписании.

    // конструктор по умолчанию
    constructor(name = getStationName(), city = getCity(), minTrains = getIntRand(3, 6), maxTrains = getIntRand(15, 20), trainList = []) {
        // название
        this.name = name;

        // город размещения
        this.city = city;

        // минимальное количество поездов
        this.minTrains = minTrains;

        // максимальное количество поездов
        this.maxTrains = maxTrains;

        // поезда
        this.trainList = trainList;

        // таймер (для снятия выделения)
        this._timer = null;

        // интервал времени для таймера (для снятия выделения)
        this._delay = 7_000;
    }

    //#region Сеттеры и геттеры

    // название
    set name(value) {
        this._name = value;
    }

    get name() {
        return this._name;
    }

    // город размещения
    set city(value) {
        this._city = value;
    }

    get city() {
        return this._city;
    }

    // минимальное количество поездов
    set minTrains(value) {
        this._minTrains = value;
    }

    get minTrains() {
        return this._minTrains;
    }

    // максимальное количество поездов
    set maxTrains(value) {
        this._maxTrains = value;
    }

    get maxTrains() {
        return this._maxTrains;
    }

    // список поездов
    set trainList(value) {
        this._trainList = value;
    }

    get trainList() {
        return this._trainList;
    }

    // получить коллекцию станций назначения
    get destinationStationList() {
        return [...new Set(this.trainList.map((t) => t.destination))];
    }

    //#endregion

    //#region Методы

    //#region Обработка по заданию

    // !!! используется slice, так как требуются ссылка на существующие объекты,
    // !!! поэтому глубокое копирование не подходит

    // упорядочивание копии массива по времени отправления
    sortByTime() {
        return this.trainList.slice(0).sort((a, b) => a.departureTime - b.departureTime);
    }

    // упорядочивание копии массива по пункту назначения;
    sortByDestination() {
        return this.trainList.slice(0).sort((a, b) => a.destination.localeCompare(b.destination));
    }

    // выделение сведений по поезду с запрошенным интервалом времени отправления
    colorByTimeInterval(minTime = new DateTime(), maxTime = new DateTime()) {
        // снятие выделения с элеменитов
        this.resetColor();

        minTime = minTime.toLocaleTimeString().slice(0, -3);
        maxTime = maxTime.toLocaleTimeString().slice(0, -3);

        $(`#trainListId .tile span[name="departureTime"]`)
            .filter((i, v) => v.textContent >= minTime && v.textContent <= maxTime)
            .parents('.tile')
            .css('background-color', '#c6ff7c');

        // установка таймера
        this.setTimer(this.resetColor);
    }

    // выделение сведений по тем поездам, которые следуют до запрошенной станции назначения
    colorByDestination(destination = '') {
        // снятие выделения с элеменитов
        this.resetColor();

        $(`#trainListId .tile span[name="destination"]:contains('${destination}')`)
            .parents('.tile')
            .css('background-color', '#c6ff7c');

        // установка таймера
        this.setTimer(this.resetColor);
    }

    //#endregion

    // вывод в разметку
    showToHTML(header = 'Поезда', trainList = this.trainList, container = '#stationTrains') {
        // контейнер
        container = $(container);

        // контейнер списка
        let list = $('#trainListId');

        if (!list.length) {
            container.append(`
            <h2 class="text-align-center">Станция: "${this.name}". Количество записей в расписании (минимум ${this.minTrains}): <span id="countTrain"></span>/${this.maxTrains}</h2>
            <h2 class="text-align-center">${header}</h2>

            <div class="container" id="trainListId"></div>
            `);

            list = $('#trainListId');
        }

        // установка количества записей
        $('#countTrain').html(this.trainList.length);

        // очистка контейнера
        list.empty();

        // заполенение списка поездами
        trainList.forEach((t) => t.showToHTML('#trainListId'));
    }

    // снятие выделения с элементов
    resetColor() {
        $('#trainListId .tile').css('background-color', '#e8e8e8');
    }

    // установка таймера
    setTimer(func = () => {
    }) {
        // удаление текущего таймера
        clearTimeout(this._timer);

        // установка таймера для снятия выделения
        this._timer = setTimeout(func, this._delay);
    }

    // сохранение в локальное хранилище
    save() {
        window.localStorage.stationTrain = JSON.stringify(this);
    }

    // загрузка из локального хранилища
    load() {
        // данные
        let data;

        if (!(data = window.localStorage.stationTrain)) return false;

        // загрузка данных
        this.assign(JSON.parse(data));

        return true;
    }

    // установка данных из объекта
    assign(obj) {
        Object.assign(this, obj);

        // установка данных из объектов поездов
        this.trainList = this.trainList.map((t) => new Train().assign(t));

        return this;
    }

    //#endregion
}

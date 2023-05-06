// Класс Поезд
class Train {
    // следующий идентификатор
    static _nextId = 0;

    // конструктор
    constructor(number = '', destination = '', departureTime = new Date(), imageFile = '') {
        // идентификатор
        this._id = Train._nextId++;

        // номер поезда https://clck.ru/rdqJW
        this.number = number;

        // станция назначения
        this.destination = destination;

        // время отправления
        this.departureTime = departureTime;

        // изображение поезда
        this.imageFile = imageFile;
    }

    //#region Сеттеры и геттеры

    // идентификатор
    get id() {
        return this._id;
    }

    // номер поезда
    set number(value) {
        this._number = value;
    }

    get number() {
        return this._number;
    }

    // станция назначения
    set destination(value) {
        this._destination = value;
    }

    get destination() {
        return this._destination;
    }

    // время отправления
    set departureTime(value) {
        this._dupartureTime = value;
    }

    get departureTime() {
        return this._dupartureTime;
    }

    //#endregion

    //#region Методы

    // генерация объекта со случайными данными
    static generate() {
        // время отправления
        let date = new Date();

        // устанновка времени
        date.setHours(getIntRand(0, 24));
        date.setMinutes(getIntRand(0, 6) * 10);

        return new Train(`${getIntRand(301, 450)}`, getStationName(), date, getTrainFileName());
    }

    // вывод поезда в разметку в виде плитки
    showToHTML(container) {
        // контейнер
        container = $(container);

        // карточка
        $(container).append(`
            <div class="tile">
                <div class="tile-image normal">
                    <img name="imageFile" src="../images/trains/${this.imageFile}" alt="поезд">
                </div>

                <div>Номер: <span name="number">${this.number}</span></div>
                <div>Станция назначения: <span name="destination">${this.destination}</span></div>
                <div>Время отправления: <span name="departureTime">${this._dupartureTime
            .toLocaleTimeString()
            .slice(0, -3)}</span></div>

                <div class="tile-controls">
                    <button class="edit width-small" id="btnEdit_${this.id}">Изменить</button>
                    <button class="remove width-small" id="btnRemove_${this.id}">Удалить</button>
                </div>

            </div>
        `);
    }

    // установка полей из объекта
    assign(obj = null) {
        Object.assign(this, obj);

        this.departureTime = new Date(obj._dupartureTime);

        return this;
    }

    //#endregion
}

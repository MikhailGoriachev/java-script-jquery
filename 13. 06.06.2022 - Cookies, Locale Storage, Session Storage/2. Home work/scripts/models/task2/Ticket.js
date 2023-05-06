// Класс Заявка на получение билета
// пункт назначения, номер рейса,
// фамилию и инициалы пассажира, стоимость билета
class Ticket {
    static _nextId = 0;

    // конструктор
    constructor(destination, flightNumber, fullName, ticketCost) {
        // идентификатор
        this.id = Ticket._nextId++;

        // пункт назначения
        this.destination = destination;

        // номер рейса
        this.flightNumber = flightNumber;

        // фамилия и инициалы пассажира
        this.fullName = fullName;

        // стоимость билета
        this.ticketCost = ticketCost;
    }

    //#region Сеттеры и геттеры

    // пункт назначения
    set destination(destination = '') {
        this._destination = destination;
    }

    get destination() {
        return this._destination;
    }

    // номер рейса
    set flightNumber(flightNumber = '') {
        this._flightNumber = flightNumber;
    }

    get flightNumber() {
        return this._flightNumber;
    }

    // фамилия и инициалы пассажира
    set fullName(fullName = '') {
        this._fullName = fullName;
    }

    get fullName() {
        return this._fullName;
    }

    // стоимость билета
    set ticketCost(ticketCost = 0) {
        this._ticketCost = ticketCost >= 0 ? ticketCost : 0;
    }

    get ticketCost() {
        return this._ticketCost;
    }

    //#endregion

    //#region Методы

    // получить сгенерированный билет
    static getTicketGenerator() {
        return new Ticket(getCity(), `SU ${getIntRand(1000, 10000)}`, getFullName(), getIntRand(20, 40) * 100);
    }

    // строчное представление для вывода объёкта в разме`тку
    toHTML() {
        return `<div class="tile" name="ticket">
                    <div>Пункт назначения: <span>${this.destination}</span></div>
                    <div>Номер рейса: <span>${this.flightNumber}</span></div>
                    <div>Пассажир: <span>${this.fullName}</span></div>
                    <div>Стоимость билета: <span>${this.ticketCost} &#8381;</span></div>

                    <!-- Кнопки управления -->
                    <div class="controls">
                        <button class="width-small" id="btnEdit_${this.id}">Изменить</button>
                        <button class="width-small" id="btnRemove_${this.id}">Удалить</button>
                    </div>    
                </div>`;
    }

    //#endregion
}

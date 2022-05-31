// класс — Клиент
// дата обращения за услугой, название услуги, стоимость услуги
class Client extends Person {
    // конструкор
    constructor(fullName, dateOfBirth, city, dateOfVisit, service, cost) {
        super(fullName, dateOfBirth, city);

        // дата обращения за услугой
        this.dateOfVisit = dateOfVisit;

        // название услуги
        this.service = service;

        // стоимость услуги
        this.cost = cost;
    }

    //#region Сеттеры и геттеры

    // дата обращения за услугой
    set dateOfVisit(dateOfVisit) {
        this._dateOfVisit = dateOfVisit;
    }

    get dateOfVisit() {
        return this._dateOfVisit;
    }

    // название услуги
    set service(service) {
        this._service = service;
    }

    get service() {
        return this._service;
    }

    // стоимость услуги
    set cost(cost) {
        this._cost = cost;
    }

    get cost() {
        return this._cost;
    }

    //#endregion

    //#region Методы

    // вывод представления разметки объекта в строку
    toHTML() {
        return `
                <div class='tile'>
                    <div class='tile-header'>Клиент</div>
                    <div>Фамилия и инициалы: <span>${this.fullName}</span></div>
                    <div>Дата рождения: <span>${this.dateOfBirth.toLocaleDateString()}</span></div>
                    <div>Город проживания: <span>${this.city}</span></div>
                    <div>Дата обращения: <span>${this.dateOfVisit.toLocaleDateString()}</span></div>
                    <div>Услуга: <span>${this.service}</span></div>
                    <div>Стоимость: <span>${this.cost} &#8381;</span></div>
                </div>
            `;
    }

    // строковое представление объекта
    toString() {
        return `${super.toString()} ${this.dateOfVisit} ${this.service} ${this.cost}`;
    }

    // проверка на равенство объектов
    equals(client) {
        return (
            super.equals(client) &&
            this.dateOfVisit === client.dateOfVisit &&
            this.service === client.service &&
            this.cost === client.cost
        );
    }

    //#endregion
}

// класс — Мастер
// тарифная ставка, дата начала работы, признак занятости ремонтом
class Atrisan extends Person {
    // конструктор
    constructor(fullName, dateOfBirth, city, tariff, dateOfWork, isBusy) {
        super(fullName, dateOfBirth, city);

        // тарифная ставка
        this.tariff = tariff;

        // дата начала работы
        this.dateOfWork = dateOfWork;

        // признак занятости ремонтом
        this.isBusy = isBusy;
    }

    //#region Сеттеры и геттеры

    // тарифная ставка
    set tariff(tariff = 0) {
        this._tariff = tariff > 0 ? tariff : 0;
    }

    get tariff() {
        return this._tariff;
    }

    // дата начала работы
    set dateOfwork(dateOfWork = new Date()) {
        this._dateOfWork = dateOfWork;
    }

    get dateOfwork() {
        return this._dateOfWork;
    }

    // признак занятости ремонтом
    set isBusy(isBusy = false) {
        this._isBusy = isBusy;
    }

    get isBusy() {
        return this._isBusy;
    }

    //#endregion

    //#region Методы

    // вывод представления разметки объекта в строку
    toHTML() {
        return `
                <div class='tile'>
                    <div class='tile-header'>Мастер</div>
                    <div>Фамилия и инициалы: <span>${this.fullName}</span></div>
                    <div>Дата рождения: <span>${this.dateOfBirth.toLocaleDateString()}</span></div>
                    <div>Город проживания: <span>${this.city}</span></div>
                    <div>Тарифная ставка: <span>${this.tariff} %</span></div>
                    <div>Начало работы: <span>${this.dateOfWork.toLocaleDateString()}</span></div>
                    <div>Занятость: <span>${this.isBusy ? 'занят' : 'свободен'}</span></div>
                </div>
            `;
    }

    // строковое представление объекта
    toString() {
        return `${super.toString()} ${this.tariff} ${this.dateOfWork} ${this.isBusy}`;
    }

    // проверка на равенство объектов
    equals(artisan) {
        return (
            super.equals(artisan) &&
            this.tariff === artisan.tariff &&
            this.dateOfWork === artisan.dateOfWork &&
            this.isBusy === artisan.isBusy
        );
    }
}

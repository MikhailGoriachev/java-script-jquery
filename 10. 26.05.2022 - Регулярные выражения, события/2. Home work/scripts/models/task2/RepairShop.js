// класс — Ремонтная мастерская
class RepairShop {
    // конструктор
    constructor(name, address, clients, artisans) {
        // название мастерской
        this.name = name;

        // адрес мастерской
        this.address = address;

        // массив клиентов
        this.clients = clients;

        // массив мастеров
        this.artisans = artisans;
    }

    //#region Сеттеры и геттеры

    // название мастерской
    set name(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    // адрес мастерской
    set address(address) {
        this._address = address;
    }

    get address() {
        return this._address;
    }

    // массив клиентов
    set clients(clients) {
        this._clients = clients;
    }

    get clients() {
        return this._clients;
    }

    // массив мастеров
    set artisans(artisans) {
        this._artisans = artisans;
    }

    get artisans() {
        return this._artisans;
    }

    //#endregion

    //#region Методы

    // вывод информации о мастерской
    toString() {
        return `${this.name} ${this.address}`;
    }

    //#endregion
}

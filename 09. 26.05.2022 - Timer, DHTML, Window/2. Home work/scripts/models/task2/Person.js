// класс — Персона
// фамилия и инициалы, дата рождения, город проживания
class Person {
    // конструтор
    constructor(fullName, dateOfBirth, city) {
        // фамилия и инициалы
        this.fullName = fullName;

        // дата рождения
        this.dateOfBirth = dateOfBirth;

        // город проживания
        this.city = city;
    }

    //#region Сеттеры и геттеры

    // фамилия и инициалы
    set fullName(name) {
        this._name = name;
    }

    get fullName() {
        return this._name;
    }

    // дата рождения
    set dateOfBirth(dateOfBirth) {
        this._dateOfBirth = dateOfBirth;
    }

    get dateOfBirth() {
        return this._dateOfBirth;
    }

    // город проживания
    set city(city) {
        this._city = city;
    }

    get city() {
        return this._city;
    }

    //#endregion

    //#region Методы

    // вывод представления разметки объекта в строку
    toHTML() {
        return `
                <div class='tile'>
                    <div class='tile-header'>Клиент</div>
                    <div>Фамилия и инициалы: <span>${this.fullName}</span></div>
                    <div>Дата рождения: <span>${this.dateOfBirth.getYear()}</span></div>
                    <div>Город проживания: <span>${this.city}</span></div>
                </div>
            `;
    }

    // строковое предсталвение объекта
    toString() {
        return `${this.fullName} ${this.dateOfBirth} ${this.city}`;
    }

    // проверка на равенство объектов
    equals(person) {
        return (
            this.fullName === person.fullName && this.dateOfBirth === person.dateOfBirth && this.city === person.city
        );
    }

    //#endregion
}

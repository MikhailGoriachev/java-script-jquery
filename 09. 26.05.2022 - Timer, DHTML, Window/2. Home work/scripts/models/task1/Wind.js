// класс — Ветер
class Wind {
    // конструктор
    constructor(direction = 'С', speed = 0) {
        // поля модуля
        // направление
        this.direction = direction;

        // скорость
        this.speed = speed;
    }

    //#region Сеттеры и геттеры
    // направление
    set direction(direction) {
        this._direction = direction;
    }

    get direction() {
        return this._direction;
    }

    // скорость
    set speed(speed) {
        this._speed = speed;
    }

    get speed() {
        return this._speed;
    }

    //#endregion
    //#region Методы
    // генерация случайных данных
    getRandWind() {
        // массив направлений ветра
        // let dir = ['З', 'С-З', 'C', 'С-В', 'В', 'Ю-В', 'Ю', 'Ю-З'];
        let dir = ['З', 'С', 'В', 'Ю'];

        // диапазон значений скорости ветра
        let min = 5,
            max = 8;

        return new Wind(dir[getIntRand(0, dir.length)], getIntRand(min, max));
    }

    // вывод данных в строку
    toString() {
        return `${this.speed} м/с, ${this.direction}`;
    }
}

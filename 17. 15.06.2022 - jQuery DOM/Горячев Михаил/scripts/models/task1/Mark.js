// Класс Mark:
//      - название предмета,
//      - оценка
class Mark {
    // конструктор
    constructor(name, mark) {
        // название предмета
        this.name = name;

        // оценка
        this.mark = mark;
    }

    //#region Сеттеры и геттеры

    // название предмета
    set name(value) {
        this._name = value;
    }

    get name() {
        return this._name;
    }

    // оценка
    set mark(value) {
        this._mark = value;
    }

    get mark() {
        return this._mark;
    }

    //#endregion
}

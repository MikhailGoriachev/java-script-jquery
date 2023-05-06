// Класс Круг
class Circle {
    // максимальный радиус
    static _maxRadius = 70;

    // минимальный радиус
    static _minRadius = 5;

    // конструктор
    constructor(radius = 50, strokeColor = 'red', fillColor = 'yellow', canvas = null) {
        // радиус
        this.radius = radius;

        // цвет контура
        this.strokeColor = strokeColor;

        // цвет заливки
        this.fillColor = fillColor;

        // точка отрисовки по x
        this.x = 50;

        // точка отрисовки по y
        this.y = 50;

        // canvas
        this.canvas = canvas;
    }

    //#region Сеттеры и геттеры

    // радиус
    set radius(value = 3) {
        this._radius = value;
    }

    get radius() {
        return this._radius;
    }

    // точка отрисовки по x
    set x(value = 0) {
        this._x = value;
    }

    get x() {
        return this._x;
    }

    // точка отрисовки по y
    set y(value = 0) {
        this._y = value;
    }

    get y() {
        return this._y;
    }

    // canvas
    set canvas(value = null) {
        this._canvas = value;
    }

    get canvas() {
        return this._canvas;
    }

    //#endregion

    //#region Методы

    // отрисовка фигуры
    draw() {
        if (!this.canvas) return;

        // контекст canvas
        let context = this.canvas.getContext('2d');

        // сохранение конфигурации полотна
        context.save();

        // установка цвето
        context.fillStyle = this.fillColor;
        context.strokeStyle = this.strokeColor;

        // установка ширины контура
        context.lineWidth = 3;

        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.beginPath();

        // установка на центр
        context.translate(150, 75);

        // отрисовка круга
        context.arc(0, 0, this.radius, 0, 2 * Math.PI);

        // заливка круга
        context.fill();

        // отрисовка контура
        context.stroke();

        // восстановление конфигурации полотна
        context.restore();
    }

    // увеличить радиус
    increaseRadius(value = 0) {
        this._radius += this._radius + value <= Circle._maxRadius ? value : 0;

        // отрисовка фигуры
        this.draw();

        // сохранение данных
        this.saveData();
    }

    // уменьшить радиус
    decreaseRadius(value = 0) {
        this._radius -= this._radius - value >= Circle._minRadius ? value : 0;

        // отрисовка фигуры
        this.draw();

        // сохранение данных
        this.saveData();
    }

    // изменить цвет контура
    setStrokeColor(value = '#eee') {
        this.strokeColor = value;

        // отрисовка фигуры
        this.draw();

        // сохранение данных
        this.saveData();
    }

    // изменить цвет заливки
    setFillColor(value = '#eee') {
        this.fillColor = value;

        // отрисовка фигуры
        this.draw();

        // сохранение данных
        this.saveData();
    }

    // сохранение данных в локальное хранилище
    saveData() {
        window.localStorage.circle = JSON.stringify(this);
    }

    // загрузка данных из локаольного хранилища
    loadData(canvas) {
        // если данных нет
        if (!window.localStorage.circle) {
            return false;
        }

        // получение данных
        Object.assign(this, JSON.parse(window.localStorage.circle));

        // установка canvas
        this.canvas = canvas;

        return true;
    }

    //#endregion
}

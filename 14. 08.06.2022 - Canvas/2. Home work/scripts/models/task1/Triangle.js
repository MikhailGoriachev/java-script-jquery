// Класс Треугольник
class Triangle {
    // максимальная высота
    static _maxHeight = 140;

    // минимальная высота
    static _minHeight = 5;

    // максимальная ширина
    static _maxWidth = 290;

    // минимальная ширина
    static _minWidth = 5;

    // конструктор
    constructor(height = 50, width = 50, strokeColor = 'red', fillColor = 'yellow', canvas = null) {
        // высота
        this.height = height;

        // ширина
        this.width = width;

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

    // высота
    set height(value = 3) {
        this._height = value;
    }

    get height() {
        return this._height;
    }

    // ширина
    set width(value = 3) {
        this._width = value;
    }

    get width() {
        return this._width;
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

    // отрисовка круга
    draw() {
        if (!this.canvas) return;

        // контекст canvas
        let context = this.canvas.getContext('2d');

        // сохранение конфигурации полотна
        context.save();

        // установка цветов
        context.fillStyle = this.fillColor;
        context.strokeStyle = this.strokeColor;

        // установка ширины контура
        context.lineWidth = 3;

        // очистка полотна
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // установка на центр
        context.translate(this.canvas.width / 2 - this.width / 2, this.canvas.height / 2 - this.height / 2);

        // отрисовка трегольника
        context.beginPath();
        context.moveTo(this.width / 2, 0);
        context.lineTo(this.width, this.height);
        context.lineTo(0, this.height);
        context.closePath();

        // заливка
        context.fill();

        // отрисовка контура
        context.stroke();

        // восстановление конфигурации полотна
        context.restore();
    }

    // увеличить высоту
    increaseHeight(value = 0) {
        this.height += this.height + value < Triangle._maxHeight ? value : 0;

        // отрисовка фигуры
        this.draw();
    }

    // уменьшить высоту
    decreaseHeight(value = 0) {
        this.height -= this.height - value >= Triangle._minHeight ? value : 0;

        // отрисовка фигуры
        this.draw();
    }

    // увеличить ширину
    increaseWidth(value = 0) {
        this.width += this.width + value < Triangle._maxWidth ? value : 0;

        // отрисовка фигуры
        this.draw();
    }

    // уменьшить ширину
    decreaseWidth(value = 0) {
        this.width -= this.width - value >= Triangle._minWidth ? value : 0;

        // отрисовка фигуры
        this.draw();
    }

    // изменить цвет контура
    setStrokeColor(value = '#eee') {
        this.strokeColor = value;

        // отрисовка фигуры
        this.draw();
    }

    // изменить цвет заливки
    setFillColor(value = '#eee') {
        this.fillColor = value;

        // отрисовка фигуры
        this.draw();
    }

    //#endregion
}

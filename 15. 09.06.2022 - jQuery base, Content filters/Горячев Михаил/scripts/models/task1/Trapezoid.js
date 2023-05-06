// Класс Треугольник
class Trapezoid {
    // максимальная высота
    static _maxHeight = 140;

    // минимальная высота
    static _minHeight = 5;

    // максимальная ширина
    static _maxWidth = 290;

    // минимальная ширина
    static _minWidth = 5;

    // конструктор
    constructor(
        height = 50,
        widthTop = 50,
        widthBottom = 70,
        strokeColor = 'red',
        fillColor = 'yellow',
        canvas = null
    ) {
        // высота
        this.height = height;

        // ширина верхенго основания
        this.widthTop = widthTop;

        // ширина нижнего основания
        this.widthBottom = widthBottom;

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

    // ширина верхенго основания
    set widthTop(value = 3) {
        this._widthTop = value;
    }

    get widthTop() {
        return this._widthTop;
    }

    // ширина нижнего основания
    set widthBottom(value = 3) {
        this._widthBottom = value;
    }

    get widthBottom() {
        return this._widthBottom;
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

        // установка цветов
        context.fillStyle = this.fillColor;
        context.strokeStyle = this.strokeColor;

        // установка ширины контура
        context.lineWidth = 3;

        // очистка полотна
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // установка на центр
        context.translate(this.canvas.width / 2 - this.widthBottom / 2, this.canvas.height / 2 - this.height / 2);

        // отрисовка трегольника
        context.beginPath();
        context.moveTo(this.widthBottom - this.widthTop, 0);
        context.lineTo(this.widthBottom, 0);
        context.lineTo(this.widthBottom, this.height);
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
        this.height += this.height + value < Trapezoid._maxHeight ? value : 0;

        // отрисовка фигуры
        this.draw();

        // сохранение данных
        this.saveData();
    }

    // уменьшить высоту
    decreaseHeight(value = 0) {
        this.height -= this.height - value >= Trapezoid._minHeight ? value : 0;

        // отрисовка фигуры
        this.draw();

        // сохранение данных
        this.saveData();
    }

    // увеличить ширину
    increaseWidth(value = 0) {
        if (this.widthBottom + value > Trapezoid._maxWidth) {
            return;
        }

        // изменение полей
        this.widthTop += value;
        this.widthBottom += value;

        // отрисовка фигуры
        this.draw();

        // сохранение данных
        this.saveData();
    }

    // уменьшить ширину
    decreaseWidth(value = 0) {
        if (this.widthTop - value < Trapezoid._minWidth) {
            return;
        }

        // изменение полей
        this.widthTop -= value;
        this.widthBottom -= value;

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
        window.localStorage.trapezoid = JSON.stringify(this);
    }

    // загрузка данных из локаольного хранилища
    loadData(canvas) {
        // если данных нет
        if (!window.localStorage.trapezoid) {
            return false;
        }

        // получение данных
        Object.assign(this, JSON.parse(window.localStorage.trapezoid));

        // установка canvas
        this.canvas = canvas;

        return true;
    }

    //#endregion
}

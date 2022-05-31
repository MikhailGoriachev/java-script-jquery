// Задача 1. Фигуры

//  Задача 1. Разработайте иерархию классов в синтаксисе ES6+ для представления объемных тел - сферы,
//  конуса, цилиндра, куба. Разработайте методы для вычисления площади поверхности, объема фигуры,
//  вывода данных по фигуре и сравнения объемных тел по объему. Разработайте геттеры и сеттеры с контролем
//  корректности присваиваемых данных. Некорректные данные заменяйте значениями по умолчанию, сообщения об
//  ошибках не нужны, исключения пока не используем.
//  Выводите также изображения объемных фигур.
//  Сформируйте массив объектов этих классов - по 2 объекта каждого типа. По командам, назначенным на кнопки,
//  отсортируйте копию массива по убыванию объемов, по возрастанию площадей поверхности, выводите исходный
//  массив объемных тел.

// глобальная переменная модуля первого задания
var moduleTask1 = {};

// фигуры
moduleTask1.figures = [];

// установка обработчика события нажатия на кнопку
moduleTask1.showDefaultArray = function () {
    // вывод заголовка
    document.getElementById('headerArray').innerHTML = 'Исходная последовательность';

    // вывод элементов
    document.getElementById('containerId').innerHTML = moduleTask1.figures.reduce(
        (acc, item) => (acc += item.showToString()),
        ''
    );
};

// вывод фиугур по убыванию объёмов
moduleTask1.showSortByVolume = function () {
    // сортировка коллекции по убыванию объёмов
    let figures = moduleTask1.figures.slice(0).sort((a, b) => b.compareTo(a));

    // вывод заголовка
    document.getElementById('headerArray').innerHTML = 'Сортировка по убыванию объёмов';

    // вывод элементов
    document.getElementById('containerId').innerHTML = figures.reduce((acc, item) => (acc += item.showToString()), '');
};

// вывод фиугур по возрастанию площадей
moduleTask1.showSortByArea = function () {
    // сортировка коллекции по убыванию объёмов
    let figures = moduleTask1.figures.slice(0).sort((a, b) => a.area() - b.area());

    // вывод заголовка
    document.getElementById('headerArray').innerHTML = 'Сортировка по возрастанию площадей';

    // вывод элементов
    document.getElementById('containerId').innerHTML = figures.reduce((acc, item) => (acc += item.showToString()), '');
};

// обработчик события окончательной загрузки страницы
window.onload = function () {
    // начальная инициализация
    init();

    // вывод коллекции по умолчанию
    moduleTask1.showDefaultArray();

    // установка обработчика события нажатия на кнопку "По умолчанию"
    document.getElementById('btnDefualt').onclick = moduleTask1.showDefaultArray;

    // установка обработчика события нажатия на кнопку "По убыванию объёма"
    document.getElementById('btnSortVolume').onclick = moduleTask1.showSortByVolume;

    // установка обработчика события нажатия на кнопку "По возрастанию площадей"
    document.getElementById('btnSortArea').onclick = moduleTask1.showSortByArea;
};

// Базовый класс Фигура
class Figure {
    // конструктор
    constructor(name = '', image) {
        // изображение фигуры
        this.image = image;

        // название фигуры
        this.name = name;
    }

    // статические значения
    static minValue = 1e-5;
    static maxValue = 1e30;

    //#region Сеттеры и геттеры

    // изображение фигуры
    set image(image) {
        this._image = image;
    }

    get image() {
        return this._image;
    }

    // название фигуры
    set name(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    //#endregion

    //#region Методы

    // вычисление площади поверхности
    area() {}

    // вычисление объёма фигуры
    volume() {}

    // функция вывода фигуры
    showToString() {}

    // функция сравнения фигур по объёму
    compareTo(figure = new Figure()) {
        return this.volume() - figure.volume();
    }

    //#endregion
}

// сфера
class Sphere extends Figure {
    // конструктор
    constructor(radius = 1) {
        // запуск конструктора базового класса
        super('Сфера', 'sphere.png');

        // радиус
        // this.radius = radius;
        this.radius = radius;
    }

    //#region Методы

    //#region Сеттеры и геттеры

    // радиус
    set radius(radius) {
        this._radius = radius >= Figure.minValue && radius <= Figure.maxValue ? radius : Figure.minValue;
    }

    get radius() {
        return this._radius;
    }

    //#endregion

    // вычисление площади поверхности  S = 4π R 2
    area() {
        return 4 * Math.PI * this.radius * 2;
    }

    // вычисление объёма фигуры
    volume() {
        return (4 / 3) * Math.PI * this.radius ** 3;
    }

    // функция вывода фигуры
    showToString() {
        // строка для вывода
        return `<div class="tile">
                        <div class="tile-image"><img src="../images/${this.image}"></div>
                        <div class="tile-header">${this.name}</div>
                        <div>Радиус: <span>${this.radius.toFixed(3)}</span></div>
                        <div>&nbsp;</div>
                        <div>Площадь: <span>${this.area().toFixed(3)}</span></div>
                        <div>Объём: <span>${this.volume().toFixed(3)}</span></div>
                    </div>`;
    }

    // функция вравнения фигур по объёму
    compareTo(figure = new Figure()) {
        return this.volume() - figure.volume();
    }

    //#endregion
}

// конус
class Conoid extends Figure {
    // конструктор
    constructor(height = 5, radius = 1) {
        // запуск конструктора базового класса
        super('Конус', 'conoid.png');

        // высота
        this.height = height;

        // радиус
        this.radius = radius;
    }

    //#region Сеттеры и геттеры

    // высота
    set height(height) {
        this._height = height >= Figure.minValue && height <= Figure.maxValue ? height : Figure.minValue;
    }

    get height() {
        return this._height;
    }

    // радиус
    set radius(radius) {
        this._radius = radius >= Figure.minValue && radius <= Figure.maxValue ? radius : Figure.minValue;
    }

    get radius() {
        return this._radius;
    }

    //#endregion

    //#region Методы

    // вычисление образующей
    generatrix() {
        return Math.sqrt(this.radius ** 2 + this.height ** 2);
    }

    // вычисление площади поверхности  S = 4π R 2
    area() {
        return Math.PI * this.radius * (this.radius * this.generatrix());
    }

    // вычисление объёма фигуры
    volume() {
        return (1 / 3) * Math.PI * this.height * this.radius ** 2;
    }

    // функция вывода фигуры
    showToString() {
        // строка для вывода
        return `<div class="tile">
                            <div class="tile-image"><img src="../images/${this.image}"></div>
                            <div class="tile-header">${this.name}</div>
                            <div>Высота: <span>${this.height.toFixed(3)}</span></div>
                            <div>Радиус: <span>${this.radius.toFixed(3)}</span></div>
                            <div>Площадь: <span>${this.area().toFixed(3)}</span></div>
                            <div>Объём: <span>${this.volume().toFixed(3)}</span></div>
                        </div>`;
    }

    // функция вравнения фигур по объёму
    compareTo(figure = new Figure()) {
        return this.volume() - figure.volume();
    }

    //#endregion
}

// цилиндр
class Cylinder extends Figure {
    // конструктор
    constructor(height = 5, radius = 1) {
        // запуск конструктора базового класса
        super('Цилиндр', 'cylinder.png');

        // высота
        this.height = height;

        // радиус
        this.radius = radius;
    }

    //#region Сеттеры и геттеры

    // высота
    set height(height) {
        this._height = height >= Figure.minValue && height <= Figure.maxValue ? height : Figure.minValue;
    }

    get height() {
        return this._height;
    }

    // радиус
    set radius(radius) {
        this._radius = radius >= Figure.minValue && radius <= Figure.maxValue ? radius : Figure.minValue;
    }

    get radius() {
        return this._radius;
    }

    //#endregion

    //#region Методы

    // вычисление площади поверхности  S = 4π R 2
    area() {
        return 2 * Math.PI * this.radius * this.height + 2 * Math.PI * this.radius ** 2;
    }

    // вычисление объёма фигуры
    volume() {
        return Math.PI * this.radius ** 2 * this.height;
    }

    // функция вывода фигуры
    showToString() {
        // строка для вывода
        return `<div class="tile">
                                <div class="tile-image"><img src="../images/${this.image}"></div>
                                <div class="tile-header">${this.name}</div>
                                <div>Высота: <span>${this.height.toFixed(3)}</span></div>
                                <div>Радиус: <span>${this.radius.toFixed(3)}</span></div>
                                <div>Площадь: <span>${this.area().toFixed(3)}</span></div>
                                <div>Объём: <span>${this.volume().toFixed(3)}</span></div>
                            </div>`;
    }

    // функция вравнения фигур по объёму
    compareTo(figure = new Figure()) {
        return this.volume() - figure.volume();
    }

    //#endregion
}

// куб
class Cube extends Figure {
    // конструктор
    constructor(side = 5) {
        // запуск конструктора базового класса
        super('Куб', 'cube.png');

        // сторона
        this.side = side;
    }

    //#region Сеттеры и геттеры

    // сторона
    set side(side) {
        this._side = side >= Figure.minValue && side <= Figure.maxValue ? side : Figure.minValue;
    }

    get side() {
        return this._side;
    }

    //#endregion

    //#region Методы

    // вычисление площади поверхности  S = 4π R 2
    area() {
        return 6 * this.side ** 2;
    }

    // вычисление объёма фигуры
    volume() {
        return this.side ** 3;
    }

    // функция вывода фигуры
    showToString() {
        // строка для вывода
        return `<div class="tile">
                                <div class="tile-image"><img src="../images/${this.image}"></div>
                                <div class="tile-header">${this.name}</div>
                                <div>Сторона: <span>${this.side.toFixed(3)}</span></div>
                                <br>
                                <div>Площадь: <span>${this.area().toFixed(3)}</span></div>
                                <div>Объём: <span>${this.volume().toFixed(3)}</span></div>
                            </div>`;
    }

    // функция вравнения фигур по объёму
    compareTo(figure = new Figure()) {
        return this.volume() - figure.volume();
    }

    //#endregion
}

// работа по заданию
function init() {
    // массив фигур
    moduleTask1.figures = [];

    // диапазон значений
    const min = 1,
        max = 5;

    // количество экземпляров каждой фигуры
    const n = 2;

    // добавлние элементов в массив
    [Sphere, Conoid, Cylinder, Cube].forEach((f) => {
        for (let i = 0; i < n; i++) {
            moduleTask1.figures.push(new f(getDoubleRand(min, max), getDoubleRand(min, max)));
        }
    });

    // добавление заголовка и контейнера
    document.getElementsByTagName('section')[0].innerHTML += `<h2 id="headerArray" class="text-align-center">Фигуры</h2>
                                                              <div id="containerId" class="container"></div>`;
}

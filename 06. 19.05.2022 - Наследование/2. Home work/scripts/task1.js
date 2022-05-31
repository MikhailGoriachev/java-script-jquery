// Задача 1. Фигуры

//  Задача 1. Разработайте иерархию классов (функций-конструкторов) для представления объемных
//  фигур - сферы, конуса и цилиндра. Разработайте методы для вычисления площади поверхности,
//  объема фигуры, вывода данных по фигуре и сравнения фигур по объему. Выводите также изображение
//  фигур.

//  Сформируйте массив объектов этих классов - по 2 объекта каждого типа. Отсортируйте массив по
//  убыванию объемов. Отсортируйте массив по возрастанию площадей поверхности.

// работа по заданию
(function Task1() {
    // установка прототипа для фигур с базового класса
    Sphere.prototype = Object.create(Figure.prototype);
    Conoid.prototype = Object.create(Figure.prototype);
    Cylinder.prototype = Object.create(Figure.prototype);

    // массив фигур
    let figures = [];

    // диапазон значений
    const min = 1,
        max = 5;

    // количество экземпляров каждой фигуры
    const n = 2;

    // добавлние элементов в массив
    [Sphere, Conoid, Cylinder].forEach((f) => {
        for (let i = 0; i < n; i++) {
            figures.push(new f(getDoubleRand(min, max), getDoubleRand(min, max)));
        }
    });

    // вывод заголовка
    document.write('<h2 class="text-align-center">Исходная коллекция фигур</h2><div class="container">');

    // вывод элементов
    figures.forEach((f) => f.show());

    // вывод заголовка
    document.write('</div><h2 class="text-align-center">Сортировка по убыванию объёмов</h2><div class="container">');

    // сортировка коллекции по убыванию объёмов
    figures = figures.sort((a, b) => b.CompareTo(a));

    // вывод элементов
    figures.forEach((f) => f.show());

    // вывод заголовка
    document.write(
        '</div><h2 class="text-align-center">Сортировка по возрастанию площадей</h2><div class="container">'
    );

    // сортировка коллекции по возрастанию площадей
    figures = figures.sort((a, b) => a.area() - b.area());

    // вывод элементов
    figures.forEach((f) => f.show());

    document.write('</div>');
})();

// Базовый класс Фигура
function Figure(name = '', image) {
    // изображение фигуры
    this.image = image;

    // название фигуры
    this.name = name;

    // вычисление площади поверхности
    Figure.prototype.area = function () {};

    // вычисление объёма фигуры
    Figure.prototype.volume = function () {};

    // функция вывода фигуры
    Figure.prototype.show = function () {};

    // функция вравнения фигур по объёму
    Figure.prototype.show = function (figure = new Figure()) {};
}

// сфера
function Sphere(radius = 1) {
    // наследование
    Figure.call(this, 'Сфера', 'sphere.png');

    //#region Поля

    // радиус
    this.radius = radius;

    //#endregion

    //#region Методы

    // вычисление площади поверхности  S = 4π R 2
    Sphere.prototype.area = function () {
        return 4 * Math.PI * this.radius * 2;
    };

    // вычисление объёма фигуры
    Sphere.prototype.volume = function () {
        return (4 / 3) * Math.PI * this.radius ** 3;
    };

    // функция вывода фигуры
    Sphere.prototype.show = function () {
        // строка для вывода
        let line = `<div class="tile">
                        <div class="tile-image"><img src="../images/${this.image}"></div>
                        <div class="tile-header">${this.name}</div>
                        <div>Радиус: <span>${this.radius.toFixed(3)}</span></div>
                        <div>&nbsp;</div>
                        <div>Площадь: <span>${this.area().toFixed(3)}</span></div>
                        <div>Объём: <span>${this.volume().toFixed(3)}</span></div>
                    </div>`;

        document.write(line);
    };

    // функция вравнения фигур по объёму
    Sphere.prototype.CompareTo = function (figure = new Figure()) {
        return this.volume() - figure.volume();
    };

    //#endregion
}

// конус
function Conoid(height = 5, radius = 1) {
    // наследование
    Figure.call(this, 'Конус', 'conoid.png');

    //#region Поля

    // высота
    this.height = height;

    // радиус
    this.radius = radius;

    //#endregion

    //#region Методы

    // вычисление образующей
    Conoid.prototype.Generatrix = function () {
        return Math.sqrt(this.radius ** 2 + this.height ** 2);
    };

    // вычисление площади поверхности  S = 4π R 2
    Conoid.prototype.area = function () {
        return Math.PI * this.radius * (this.radius * this.Generatrix());
    };

    // вычисление объёма фигуры
    Conoid.prototype.volume = function () {
        return (1 / 3) * Math.PI * this.height * this.radius ** 2;
    };

    // функция вывода фигуры
    Conoid.prototype.show = function () {
        // строка для вывода
        let line = `<div class="tile">
                            <div class="tile-image"><img src="../images/${this.image}"></div>
                            <div class="tile-header">${this.name}</div>
                            <div>Высота: <span>${this.height.toFixed(3)}</span></div>
                            <div>Радиус: <span>${this.radius.toFixed(3)}</span></div>
                            <div>Площадь: <span>${this.area().toFixed(3)}</span></div>
                            <div>Объём: <span>${this.volume().toFixed(3)}</span></div>
                        </div>`;

        document.write(line);
    };

    // функция вравнения фигур по объёму
    Conoid.prototype.CompareTo = function (figure = new Figure()) {
        return this.volume() - figure.volume();
    };

    //#endregion
}

// цилиндр
function Cylinder(height = 5, radius = 1) {
    // наследование
    Figure.call(this, 'Цилиндр', 'cylinder.png');

    //#region Поля

    // высота
    this.height = height;

    // радиус
    this.radius = radius;

    //#endregion

    //#region Методы

    // вычисление площади поверхности  S = 4π R 2
    Cylinder.prototype.area = function () {
        return 2 * Math.PI * this.radius * this.height + 2 * Math.PI * this.radius ** 2;
    };

    // вычисление объёма фигуры
    Cylinder.prototype.volume = function () {
        return Math.PI * this.radius ** 2 * this.height;
    };

    // функция вывода фигуры
    Cylinder.prototype.show = function () {
        // строка для вывода
        let line = `<div class="tile">
                                <div class="tile-image"><img src="../images/${this.image}"></div>
                                <div class="tile-header">${this.name}</div>
                                <div>Высота: <span>${this.height.toFixed(3)}</span></div>
                                <div>Радиус: <span>${this.radius.toFixed(3)}</span></div>
                                <div>Площадь: <span>${this.area().toFixed(3)}</span></div>
                                <div>Объём: <span>${this.volume().toFixed(3)}</span></div>
                            </div>`;

        document.write(line);
    };

    // функция вравнения фигур по объёму
    Cylinder.prototype.CompareTo = function (figure = new Figure()) {
        return this.volume() - figure.volume();
    };

    //#endregion
}

// Задача 1. Фигуры (page1.html)

// Разработайте иерархию "классов" для представления объемных фигур.
// Разработай методы для вычисления площади поверхности, объема фигуры,
// вывода данных по фигуре и сравнения фигур по объему.
// !! вывести картинку фигуры !!
// Реализуйте "классы" для представления сферы, конуса и цилиндра.
// Разместите объекты этих классов в массиве.
// Отсортируйте массив по убыванию объемов.
// Отсортируйте массив по возрастанию площадей поверхности.

// работа по заданию
function task1() {
    //
}

// базовый класс Фигура
function Figure(name = 'фигура') {
    // название фигуры
    this.name = name;

    // вычисление площади поверхности
    Figure.prototype.area = function () {};

    // вычисление объёма фигуры
    Figure.prototype.volume = function () {};

    // сравнение двух фигур
    Figure.prototype.CompareTo = function (figure = new Figure()) {
        this.area() - figure.area();
    };
}

// сфера
function Sphere(radius = 1) {
    // наследование
    Figure.call(this, 'Сфера');

    // радиус
    this.radius = radius;

    // вычисление площади поверхности  S = 4π R 2
    Figure.prototype.area = function () {
        return 4 * Math.PI * radius * 2;
    };

    // вычисление объёма фигуры
    Figure.prototype.volume = function () {
        return (4 / 3) * Math.PI * radius ** 3;
    };

    // сравнение двух фигур
    Figure.prototype.CompareTo = function (figure = new Figure()) {
        this.area() - figure.area();
    };
}

// конус
function Conoid(height = 5, radius = 1) {
    // наследование
    Figure.call(this, 'Сфера');

    // высота
    this.height = height;

    // радиус
    this.radius = radius;

    // вычисление образующей

    // вычисление площади поверхности  S = 4π R 2
    Figure.prototype.area = function () {
        return 4 * Math.PI * r * 2;
    };

    // вычисление объёма фигуры
    Figure.prototype.volume = function () {
        return (4 / 3) * Math.PI * r ** 3;
    };

    // сравнение двух фигур
    Figure.prototype.CompareTo = function (figure = new Figure()) {
        this.area() - figure.area();
    };
}

// цилиндр

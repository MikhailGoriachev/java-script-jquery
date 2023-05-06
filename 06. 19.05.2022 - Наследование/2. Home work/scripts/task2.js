// Задача 2. Транспорт

//  Задача 2. Создайте класс Vehicle (транспортное средство). На его основе реализовать классы Plane
//  (самолет), Саг (автомобиль) и Ship (корабль).
//  •	Классы должны иметь возможность задавать и получать параметры средств передвижения (географические
//      координаты, цена, скорость, год выпуска) с помощью свойств.
//  •	Дополнительно для самолета должна быть определена высота, для самолета и корабля — количество
//      пассажиров, для корабля — порт приписки.
//  Создайте массив транспортных средств, состоящий из 2х самолетов, 3х кораблей и 5и автомобилей.
//  В массиве найти:
//  •	самое старое транспортное средство
//  •	самое быстрое и самое медленное транспортные средства (может быть найдено больше 1 транспортного
//      средства)

// Класс Координаты
class Coord {
    // конструктор
    constructor(x = getDoubleRand(-190, 191), y = getDoubleRand(-190, 190)) {
        this.x = x;
        this.y = y;
    }

    toString = function () {
        return `<br>${this.x.toFixed(6)}&deg;<br>${this.y.toFixed(6)}&deg;`;
    };
}

// работа по заданию
(function Task2() {
    // наследование методов
    Ship.prototype = Object.create(Vehicle.prototype);
    Plane.prototype = Object.create(Vehicle.prototype);
    Car.prototype = Object.create(Vehicle.prototype);

    // массив
    let vehicles = [
        new Plane(),
        new Plane(),
        new Ship(),
        new Ship(),
        new Ship(),
        new Car(),
        new Car(),
        new Car(),
        new Car(),
        new Car(),
    ];

    // вывод заголовка
    document.write(
        '</div><h2 class="text-align-center">Статистика</h2><div class="grid-container"><h3>Самый старый транспорт</h3>'
    );

    // значение самого старого транспортного средства
    let year = Math.min(...vehicles.map((v) => v.year));

    // поиск и вывод самого старого транспортного средства
    let oldVehicle = vehicles.find((v) => v.year == year);

    // вывод заголовка
    document.write('<h3>Самый быстрый транспорт</h3>');

    // массив скоростей
    let speedList = vehicles.map((v) => v.speed);

    // значение самого быстрое транспортное средства
    let speed = Math.max(...speedList);

    // поиск самого быстрого транспортного средства
    let fastVehicle = vehicles.find((v) => v.speed == speed);

    // вывод заголовка
    document.write('<h3>Самый медленный транспорт</h3>');

    // значение самого медленного транспортного средства
    speed = Math.min(...speedList);

    // поиск самого старого транспортного средства
    let slowVehicle = vehicles.find((v) => v.speed == speed);

    // вывод транспорта
    oldVehicle.show();
    fastVehicle.show();
    slowVehicle.show();

    // вывод заголовка
    document.write('</div>');

    // вывод заголовка
    document.write('<h2 class="text-align-center">Транспортные средства</h2><div class="container">');

    // вывод элементов
    vehicles.forEach((v) => v.show());
})();

// Базовый класс Транспортное средство
function Vehicle(
    name = 'Неизвестно',
    image = '',
    coord = new Coord(),
    price = 1,
    speed = 1,
    year = new Date().getFullYear()
) {
    // название транспортного средства
    this.name = name;

    // изображение
    this.image = image;

    // географические координаты
    this.coord = coord;

    // цена
    this.price = price;

    // скорость
    this.speed = speed;

    // год выпуска
    this.year = year;

    //#region Методы

    // вывод транспортного средства
    Vehicle.prototype.show = function () {};

    //#endregion
}

// Класс Самолет
function Plane(
    coord = new Coord(),
    price = getIntRand(1, 5) * 1e6,
    speed = getIntRand(30, 80) * 10,
    year = getIntRand(1, 20) + 1990,
    height = getIntRand(1, 5) * 1000,
    passengers = getIntRand(30, 120)
) {
    // наследование
    Vehicle.call(this, 'Самолет', 'plane.svg', coord, price, speed, year);

    // высота
    this.height = height;

    // количество пассажиров
    this.passengers = passengers;

    //#region Методы

    // вывод транспортного средства
    Plane.prototype.show = function () {
        // строка для вывода
        let line = `<div class="tile">
                <div class="tile-image-small"><img src="../images/${this.image}"></div>
                <div class="tile-header">${this.name}</div>
                <div>Координаты: <span>${this.coord}</span></div>
                <div>Цена: <span>${this.price}$</span></div>
                <div>Скорость: <span>${this.speed} км/ч</span></div>
                <div>Год выпуска: <span>${this.year}</span></div>
                <div>Высота: <span>${this.height} м</span></div>
                <div>Пассажиры: <span>${this.passengers}</span></div>
            </div>`;

        document.write(line);
    };

    //#endregion
}

// Класс Автомобиль
function Car(
    coord = new Coord(),
    price = getIntRand(9, 20) * 1e3,
    speed = getIntRand(30, 150),
    year = getIntRand(1, 20) + 1990
) {
    // наследование
    Vehicle.call(this, 'Автомобиль', 'car.svg', coord, price, speed, year);

    // вывод транспортного средства
    Car.prototype.show = function () {
        // строка для вывода
        let line = `<div class="tile">
                        <div class="tile-image-small"><img src="../images/${this.image}"></div>
                        <div class="tile-header">${this.name}</div>
                        <div>Координаты: <span>${this.coord}</span></div>
                        <div>Цена: <span>${this.price}$</span></div>
                        <div>Скорость: <span>${this.speed} км/ч</span></div>
                        <div>Год выпуска: <span>${this.year}</span></div>
                    </div>`;

        document.write(line);
    };
}

// Класс Корабль
function Ship(
    coord = new Coord(),
    price = getIntRand(1, 5) * 1e7,
    speed = getIntRand(10, 70),
    year = getIntRand(1, 20) + 1990,
    port = getPort(),
    passengers = getIntRand(30, 120)
) {
    // наследование
    Vehicle.call(this, 'Корабль', 'ship.svg', coord, price, speed, year);

    // количество пассажиров
    this.passengers = passengers;

    // порт приписки
    this.port = port;

    //#region Методы

    // вывод транспортного средства
    Ship.prototype.show = function () {
        // строка для вывода
        let line = `<div class="tile">
                        <div class="tile-image-small"><img src="../images/${this.image}"></div>
                        <div class="tile-header">${this.name}</div>
                        <div>Координаты: <span>${this.coord}</span></div>
                        <div>Цена: <span>${this.price}$</span></div>
                        <div>Скорость: <span>${this.speed} км/ч</span></div>
                        <div>Год выпуска: <span>${this.year}</span></div>
                        <div>Порт: <span>${this.port}</span></div>
                        <div>Пассажиры: <span>${this.passengers}</span></div>
                    </div>`;

        document.write(line);
    };

    //#endregion
}

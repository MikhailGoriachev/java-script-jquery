// Задача 3. Хлебопечка

// •	Задача 1. Спроектировать функцию-конструктор без использования прототипов – представление данных о
//      приготовлении хлеба в бытовой хлебопечке:
//      •	номер программы приготовления,
//      •	цвет корочки (светлый (1), обычный (2), темный (3)),
//      •	масса выпекаемого объекта в кг,
//      •	время старта программы (час и минута).
//      Методы объекта – начать выпечку, добавить дрожжи, завершить выпечку.
//      Продемонстрируйте работу методов.

// работа по заданию
(function task1() {
    // объект Хлебопечка
    let breadMaker = new BreadMaker(getIntRand(1, 10), getIntRand(1, 4), getDoubleRand(0.5, 3));

    // вывод данных
    breadMaker.show();

    // начать выпечку
    breadMaker.startBaking();

    // вывод данных
    breadMaker.show();

    // обавить дрожжи
    breadMaker.addYeast();

    // вывод данных
    breadMaker.show();

    // начать выпечку
    breadMaker.finishBaking();

    // вывод данных
    breadMaker.show();
})();

// функция конструтор - Хлебопечка
function BreadMaker(program = 1, colorCrust = 1, mass = 0.5, timeStart = new Date()) {
    // номер программы приготовления
    this.program = program;

    // цвет корочки (светлый (1), обычный (2), темный (3))
    this.colorCrust = colorCrust;

    // масса выпекаемого объекта в кг
    this.mass = mass;

    // время старта программы (час и минута)
    this.timeStart = timeStart;

    // стадия выпечки
    this.state = 'Ожидание...';

    //#region Методы

    // начать выпечку
    this.startBaking = function () {
        this.state = 'Выпечка начата';
    };

    // добавить дрожжи
    this.addYeast = function () {
        this.state = 'Добавлены дрожжи';
    };

    // завершить выпечку
    this.finishBaking = function () {
        this.state = 'Выпечка завершена';
    };

    // получить цвет корочки по коду
    this.getColorCrustName = function () {
        switch (this.colorCrust) {
            // светлая(1)
            case 1:
                return 'светлая (1)';
            // обычная(2)
            case 2:
                return 'обычная (2)';
            // темная(3)
            case 3:
                return 'темная (3)';

            default:
                break;
        }
    };

    // вывод данных
    this.show = function () {
        document.write(`<div class="bread-maker">
                            <div class="bread-maker-image">
                                <img src="../images/bread-maker.png" alt="Изображение явления" />
                            </div>
                            <div>Номер программы: <span>${this.program}</span></div>
                            <div>Цвет корочки: <span>${this.getColorCrustName()}</span></div>
                            <div>Масса: <span>${this.mass.toFixed(1)} кг</span></div>
                            <div>Время начала: <span>${this.timeStart.getHours()}:${this.timeStart.getMinutes()}</span></div>
                            <div>Стадия выпечки: <br><span>${this.state}</span></div>
                        </div>`);
    };

    //#endregion
}

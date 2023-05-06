// Задача 3. Данные о погоде

//  Задача 2. Спроектировать класс в синтаксисе ES6+ для представления данных о погоде: температура, давление,
//  влажность, скорость и направление ветра, графическое отображение атмосферных явлений (ясно, облачно, дождь,
//  и т.д. – не более 5). Определите метод формирования строки для вывода данных в разметку. Переопределите метод
//  toString() для простой вывода в консоль. Создайте массив данных о погоде за неделю, выведите его на страницу.
//  По командам от кнопок выводите данные о погоде, упорядоченные (только при выводе, порядок элементов в исходном
//  массиве не менять): по убыванию температуры, по возрастанию давления, по убыванию скорости ветра. По командам
//  от кнопок выделяйте самые ветреные и самые тихие дни. Также должна быть кнопка для вывода исходного массива
//  без выделений элементов.

// глобальная переменная модуля первого задания
var moduleTask2 = {};

// исходный массив данных о погоде
moduleTask2.originWeatherList = [];

// текущий массив данных о погоде
moduleTask2.currentWeatherList = [];

// вывод массива в контейнер
moduleTask2.showArray = function (header = 'Исходная последовательность') {
    // вывод заголовка
    document.getElementById('headerArray').innerHTML = header;

    // вывод элементов
    document.getElementById('containerId').innerHTML = moduleTask2.currentWeatherList.reduce(
        (acc, item) => (acc += item.showToString()),
        ''
    );
};

// вывод массива по умолчанию
moduleTask2.showDefaultArray = function () {
    // установка исходного массива, как текущего
    moduleTask2.currentWeatherList = [...moduleTask2.originWeatherList];

    moduleTask2.showArray();
};

// сортировка копии массива
moduleTask2.sortCopy = function (comp = (a, b) => {}) {
    return [...this.originWeatherList].sort(comp);
};

// вывод копии массива по убыванию температуры
moduleTask2.showSortTemperatureArray = function () {
    // сортировка массива
    moduleTask2.currentWeatherList = moduleTask2.sortCopy((a, b) => b.temperature - a.temperature);

    // вывод массива
    moduleTask2.showArray('Сортировка по убыванию температуры');
};

// вывод копии массива по возрастанию давления
moduleTask2.showSortPressureArray = function () {
    // сортировка массива
    moduleTask2.currentWeatherList = moduleTask2.sortCopy((a, b) => a.pressure - b.pressure);

    // вывод массива
    moduleTask2.showArray('Сортировка по возрастанию давления');
};

// вывод копии массива по убыванию скорости ветра
moduleTask2.showSortWindSpeedArray = function () {
    // сортировка массива
    moduleTask2.currentWeatherList = moduleTask2.sortCopy((a, b) => b.wind.speed - a.wind.speed);

    // вывод массива
    moduleTask2.showArray('Сортировка по убыванию скорости ветра');
};

// подсветка элементов по индексам
moduleTask2.colorElemIndexes = function (comp = (index) => {}, backgroundColor = 'rgba(143, 96, 219, 0.562)') {
    // повторный вывод коллекции, для исключения других выделений
    moduleTask2.showArray(document.getElementById('headerArray').innerHTML);

    // получить элементы контейнера
    let nodes = document.getElementsByName('weatherGroup');

    // выбрать все элементы
    for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // если узел не является элементом
        if (n.nodeType != 1) {
            return;
        }

        // если текущий элемент небходимо подсветить
        if (comp(i)) {
            n.style.backgroundColor = backgroundColor;
        }
    }
};

// выделение самых тихих дней недели
moduleTask2.selectQuietestDays = function () {
    // проецирование текущей коллекции на массив скорости ветра
    let map = moduleTask2.currentWeatherList.map((o) => o.wind.speed);

    // самое низкое значение скорости ветра
    let min = Math.min(...map);

    // подсветка элементов по компаратору
    moduleTask2.colorElemIndexes((i) => map[i] === min);
};

// выделение самых ветренных дней недели
moduleTask2.selectWindiestDays = function () {
    // проецирование текущей коллекции на массив скорости ветра
    let map = moduleTask2.currentWeatherList.map((o) => o.wind.speed);

    // самое высокое значение скорости ветра
    let max = Math.max(...map);

    // подсветка элементов по компаратору
    moduleTask2.colorElemIndexes((i) => map[i] === max);
};

// выделение дней с северным ветром
moduleTask2.selectNorthDays = function () {
    // подсветка элементов по компаратору
    moduleTask2.colorElemIndexes((i) => moduleTask2.currentWeatherList[i].wind.direction === 'С');
};

// обработчик события окончательной загрузки страницы
window.onload = function () {
    // инициализация
    init();

    // вывод исходной коллекции
    moduleTask2.showDefaultArray();

    // Сортировка

    // Установка обработчика события на кнопку "По умолчанию"
    document.getElementById('btnDefualt').onclick = moduleTask2.showDefaultArray;

    // Установка обработчика события на кнопку "По убыванию температуры"
    document.getElementById('btnSortTemperature').onclick = moduleTask2.showSortTemperatureArray;

    // Установка обработчика события на кнопку "По возрастанию давления"
    document.getElementById('btnSortPressure').onclick = moduleTask2.showSortPressureArray;

    // Установка обработчика события на кнопку "По убыванию скорости ветра"
    document.getElementById('btnSortWindSpeed').onclick = moduleTask2.showSortWindSpeedArray;

    // Выделение

    // Установка обработчика события на кнопку "Самые тихие дни"
    document.getElementById('btnQuietestDays').onclick = moduleTask2.selectQuietestDays;

    // Установка обработчика события на кнопку "Самые ветренные дни"
    document.getElementById('btnWindiestDays').onclick = moduleTask2.selectWindiestDays;

    // Установка обработчика события на кнопку "Дни с северным ветром"
    document.getElementById('btnNorthDays').onclick = moduleTask2.selectNorthDays;
};

// объект — Данные о погоде
class Weather {
    // конструктор
    constructor(day = 'понедельник', temperature = 0, pressure = 700, humidity = 50, wind = new Wind(), view = '') {
        // #region поля объекта

        // день недели
        this.day = day;

        // температура
        this.temperature = temperature;

        // давление
        this.pressure = pressure;

        // влажность
        this.humidity = humidity;

        // ветер
        this.wind = wind;

        // отображение атмосферного являения
        this.view = view;

        //#endregion
    }
    // константные значения

    //#region Сеттеры и геттеры

    // день недели
    set day(day) {
        this._day = day;
    }

    get day() {
        return this._day;
    }

    // температура
    set temperature(temperature) {
        this._temperature = temperature;
    }

    get temperature() {
        return this._temperature;
    }

    // давление
    set pressure(pressure) {
        this._pressure = pressure;
    }

    get pressure() {
        return this._pressure;
    }

    // влажность
    set humidity(humidity) {
        this._humidity = humidity;
    }

    get humidity() {
        return this._humidity;
    }

    // ветер
    set wind(wind) {
        this._wind = wind;
    }

    get wind() {
        return this._wind;
    }

    // отображение атмосферного являения
    set view(view) {
        this._view = view;
    }

    get view() {
        return this._view;
    }

    //#endregion

    //#region Методы

    // вывод данных в строку в виде плитки
    showToString() {
        return `<div class="weather" name="weatherGroup">
                    <div class="text-align-center"><span>${this.day}</span></div>
                    <div class="weather-image">
                        <img src="../images/${this.view}" alt="Изображение явления" />
                    </div>
                    <div>Температура: <span>${this.temperature}&deg;</span></div>
                    <div>Давление: <span>${this.pressure} гПа</span></div>
                    <div>Влажность: <span>${this.humidity}%</span></div>
                    <div>Ветер: <span>${this.wind.toString()}</span></div>
                </div>`;
    }

    // вывод данных в строку
    toString() {
        return `Температура: ${this.temperature}; Давление: ${this.pressure} гПа; Влажность: ${this.humidity}%;
                Ветер: <span>${this.wind.toString()}`;
    }

    //#endregion
}

// модуль — Ветер
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

    //#endregion
}

// работа по заданию
function init() {
    // массив объектов погоды
    moduleTask2.currentWeatherList = moduleTask2.originWeatherList = [
        new Weather('Понедельник'),
        new Weather('Вторник'),
        new Weather('Среда'),
        new Weather('Четверг'),
        new Weather('Пятница'),
        new Weather('Суббота'),
        new Weather('Воскресенье'),
    ];

    // изменение данных полей
    moduleTask2.originWeatherList.forEach((w) => setFieldsRandWeather(w));

    // добавление заголовка и контейнера
    document.getElementsByTagName('section')[0].innerHTML +=
        '<h2 id="headerArray" class="text-align-center">Погодные условия</h2><div id="containerId" class="container"></div>';
}

// изменить данные полей погоды
function setFieldsRandWeather(weather) {
    weather.temperature = getIntRand(-10, 11);
    weather.humidity = getIntRand(600, 800);
    weather.pressure = getIntRand(40, 80);
    weather.view = getViewWeather();
    weather.wind = new Wind().getRandWind();
}

// получить название файла изображения
function getViewWeather() {
    let files = ['sun.png', 'snow.png', 'rain.png', 'clouds.png'];

    return files[getIntRand(0, files.length)];
}

// Задача 2. Данные о погоде

// •	Задача 2. Спроектировать модуль – представления данных о погоде: температура, давление, влажность,
//      скорость и направление ветра, графическое отображение атмосферных явлений (ясно, облачно, дождь,
//      и т.д. – не более 5). Предусмотрите методы для чтения и записи свойств, вывода данных в разметку.
//      Продемонстрируйте работу методов модуля.

// модуль — Данные о погоде
const weather = (function (temperature = 0, pressure = 700, humidity = 50, wind = Wind(), view = '') {
    // поля модуля
    let fields = {
        // температура
        temperature: temperature,

        // давление
        pressure: pressure,

        // влажность
        humidity: humidity,

        // ветер
        wind: wind,

        // отображение атмосферного являения
        view: view,
    };

    // константные значения
    const minTemp = -80,
        maxTemp = 80,
        minPressure = 600,
        maxPressure = 1000,
        minHumidity = 0,
        maxHumidity = 200;

    return {
        //#region Геттеры и сеттеры

        // температура
        setTemperature: function (temperature = 0) {
            fields.temperature = temperature >= minTemp && temperature <= maxTemp ? temperature : fields.temperature;
        },

        getTemperature: function () {
            return fields.temperature;
        },

        // давление
        setPressure: function (pressure = minPressure) {
            fields.pressure = pressure >= minPressure && pressure <= maxPressure ? pressure : fields.pressure;
        },

        getPressure: function () {
            return fields.pressure;
        },

        // влажность
        setHumidity: function (humidity = minHumidity) {
            fields.humidity = humidity >= minHumidity && humidity <= maxHumidity ? humidity : fields.humidity;
        },

        getHumidity: function () {
            return fields.humidity;
        },

        // ветер
        setWind: function (wind = Wind()) {
            fields.wind = wind;
        },

        getWind: function () {
            return fields.wind;
        },

        // отображение атмосферного являения
        setView: function (view = '') {
            fields.view = view;
        },

        getView: function () {
            return fields.view;
        },

        //#endregion

        //#region Методы

        // вывод данных в разметку
        show: function () {
            document.write(`<div class="weather">
                                <div class="weather-image">
                                    <img src="../images/${fields.view}" alt="Изображение явления" />
                                </div>
                                <div>Температура: <span>${fields.temperature}&deg;</span></div>
                                <div>Давление: <span>${fields.pressure} гПа</span></div>
                                <div>Влажность: <span>${fields.humidity}%</span></div>
                                <div>Ветер: <span>${fields.wind.toString()}</span></div>
                            </div>`);
        },

        //#endregion
    };
})();

// модуль — Ветер
function Wind(direction = 'С-З', speed = 0) {
    // поля модуля
    let fields = {
        // направление
        direction: direction,

        // скорость
        speed: speed,
    };

    return {
        //#region Сеттеры и геттеры

        // направление
        setDirection: function (direction = '') {
            fields.direction = direction.length <= 3 ? direction : fields.direction;
        },

        getDirection: function () {
            return fields.direction;
        },

        // скорость
        setSpeed: function (speed = 1) {
            fields.speed = speed > 0 ? speed : fields.speed;
        },

        getSpeed: function () {
            return fields.speed;
        },

        //#endregion

        //#region Методы

        // генерация случайных данных
        getRandWind: function () {
            // массив направлений ветра
            let dir = ['З', 'С-З', 'C', 'С-В', 'В', 'Ю-В', 'Ю', 'Ю-З'];

            // диапазон значений скорости ветра
            let min = 0,
                max = 20;

            return Wind(dir[getIntRand(0, dir.length)], getIntRand(min, max));
        },

        // вывод данных в строку
        toString: function () {
            return `${fields.speed} м/с, ${fields.direction}`;
        },

        //#endregion
    };
}

// работа по заданию
(function Task2() {
    // количество изменений
    const n = 10;

    // изменение данных полей
    for (let i = 0; i < n; i++) {
        // изменение данных полей
        setFieldsRandWeather();

        // вывод данных
        weather.show();
    }
})();

// изменить данные полей погоды
function setFieldsRandWeather() {
    weather.setTemperature(getIntRand(-10, 11));
    weather.setHumidity(getIntRand(600, 800));
    weather.setPressure(getIntRand(40, 80));
    weather.setView(getViewWeather());
    weather.setWind(Wind().getRandWind());
}

// получить название файла изображения
function getViewWeather() {
    let files = ['sun.png', 'snow.png', 'rain.png', 'clouds.png'];

    return files[getIntRand(0, files.length)];
}

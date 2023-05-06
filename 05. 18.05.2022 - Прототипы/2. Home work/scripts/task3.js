// Задача 3. Данные о погоде

//  •	Задача 3. Спроектировать функцию-конструктор (в синтаксисе class) – данные о погоде: температура,
//      давление, влажность, скорость и направление ветра, графическое отображение атмосферных явлений (ясно,
//      облачно, дождь, и т.д. – не более 5 вариантов). Предусмотрите метод для вывода данных в разметку.
//      Создайте массив данных о погоде за неделю, выведите его на страницу. Определите самый теплый и самый
//      холодный дни недели, количество дождливых дней.

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

    //#region Методы

    // вывод данных в разметку
    show() {
        document.write(`<div class="weather">
                            <div class="text-align-center"><span>${this.day}</span></div>
                            <div class="weather-image">
                                <img src="../images/${this.view}" alt="Изображение явления" />
                            </div>
                            <div>Температура: <span>${this.temperature}&deg;</span></div>
                            <div>Давление: <span>${this.pressure} гПа</span></div>
                            <div>Влажность: <span>${this.humidity}%</span></div>
                            <div>Ветер: <span>${this.wind.toString()}</span></div>
                        </div>`);
    }

    //#endregion
}

// модуль — Ветер
class Wind {
    // конструктор
    constructor(direction = 'С-З', speed = 0) {
        // поля модуля

        // направление
        this.direction = direction;

        // скорость
        this.speed = speed;
    }

    //#region Методы

    // генерация случайных данных
    getRandWind() {
        // массив направлений ветра
        let dir = ['З', 'С-З', 'C', 'С-В', 'В', 'Ю-В', 'Ю', 'Ю-З'];

        // диапазон значений скорости ветра
        let min = 0,
            max = 20;

        return new Wind(dir[getIntRand(0, dir.length)], getIntRand(min, max));
    }

    // вывод данных в строку
    toString() {
        return `${this.speed} м/с, ${this.direction}`;
    }

    //#endregion
}

// работа по заданию
(function Task2() {
    //  Создайте массив данных о погоде за неделю, выведите его на страницу. Определите самый теплый и самый
    //  холодный дни недели, количество дождливых дней.

    // массив объектов погоды
    let data = [
        new Weather('Понедельник'),
        new Weather('Вторник'),
        new Weather('Среда'),
        new Weather('Четверг'),
        new Weather('Пятница'),
        new Weather('Суббота'),
        new Weather('Воскресенье'),
    ];

    // изменение данных полей
    data.forEach((w) => setFieldsRandWeather(w));

    // массив температур
    let temperature = data.map((w) => w.temperature);

    // самый теплый день
    let maxTemp = Math.max(...temperature);
    let warmDay = data[data.findIndex((d) => d.temperature == maxTemp)];

    // самый холодный день
    let minTemp = Math.min(...temperature);
    let coldDay = data[data.findIndex((d) => d.temperature == minTemp)];

    // количесвто дождливых дней
    let countRain = data.reduce((acc, item) => (acc += item.view.includes('rain')), 0);

    // вывод статистики
    document.write(`<h3 class='text-align-center'>Статистика</h3>
                    <p>Cамый теплый день: <b>${warmDay.day}</b></p>
                    <p>Cамый холодный день: <b>${coldDay.day}</b></p>
                    <p>Количесвто дождливых дней: <b>${countRain}</b></p>
                    </div><div class="container">`);

    // вывод
    data.forEach((w) => w.show());

    document.write('</div>');
})();

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

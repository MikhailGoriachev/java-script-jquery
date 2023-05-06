//  Задача 1. Данные о погоде

//  Задача 1. Спроектировать класс в синтаксисе ES6+ для представления данных о погоде: температура, давление,
//  влажность, скорость и направление ветра, графическое отображение атмосферных явлений (ясно, облачно, дождь,
//  и т.д. – не более 5). Определите метод формирования строки для вывода данных в разметку. Переопределите метод
//  toString() для простой вывода в консоль. Создайте массив данных о погоде за неделю, выведите его на страницу.
//  По командам от кнопок выводите данные о погоде, упорядоченные (только при выводе, порядок элементов в исходном
//  массиве не менять): по убыванию температуры, по возрастанию давления, по убыванию скорости ветра. По командам
//  от кнопок выделяйте самые ветреные и самые тихие дни, дни с северным ветром. Выделение должно сниматься через
//  10 секунд. Также должна быть кнопка для вывода исходного массива без выделений элементов.

// глобальная переменная модуля первого задания
var moduleTask1 = {};

// исходный массив данных о погоде
moduleTask1.originWeatherList = [];

// текущий массив данных о погоде
moduleTask1.currentWeatherList = [];

// таймер
moduleTask1.timer = null;

// длительность выделения
moduleTask1.timeoutTimer = 10_000;

// вывод массива в контейнер
moduleTask1.showArray = function (header = 'Исходная последовательность') {
    // заголовок
    let headerElement = document.getElementById('headerArray');

    // вывод заголовка
    headerElement.innerHTML = header != '' ? header : headerElement.innerHTML;

    // вывод элементов
    document.getElementById('containerId').innerHTML = moduleTask1.currentWeatherList.reduce(
        (acc, item) => (acc += item.showToString()),
        ''
    );
};

// вывод массива по умолчанию
moduleTask1.showDefaultArray = function () {
    // установка исходного массива, как текущего
    moduleTask1.currentWeatherList = [...moduleTask1.originWeatherList];

    moduleTask1.showArray();
};

// сортировка копии массива
moduleTask1.sortCopy = function (comp = (a, b) => {}) {
    return [...this.originWeatherList].sort(comp);
};

// вывод копии массива по убыванию температуры
moduleTask1.showSortTemperatureArray = function () {
    // сортировка массива
    moduleTask1.currentWeatherList = moduleTask1.sortCopy((a, b) => b.temperature - a.temperature);

    // вывод массива
    moduleTask1.showArray('Сортировка по убыванию температуры');
};

// вывод копии массива по возрастанию давления
moduleTask1.showSortPressureArray = function () {
    // сортировка массива
    moduleTask1.currentWeatherList = moduleTask1.sortCopy((a, b) => a.pressure - b.pressure);

    // вывод массива
    moduleTask1.showArray('Сортировка по возрастанию давления');
};

// вывод копии массива по убыванию скорости ветра
moduleTask1.showSortWindSpeedArray = function () {
    // сортировка массива
    moduleTask1.currentWeatherList = moduleTask1.sortCopy((a, b) => b.wind.speed - a.wind.speed);

    // вывод массива
    moduleTask1.showArray('Сортировка по убыванию скорости ветра');
};

// подсветка элементов по индексам
moduleTask1.colorElemIndexes = function (comp = (index) => {}, backgroundColor = 'rgba(143, 96, 219, 0.562)') {
    // повторный вывод коллекции, для исключения других выделений
    moduleTask1.showArray(document.getElementById('headerArray').innerHTML);

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

    // удаление текущего таймера
    clearTimeout(moduleTask1.timer);

    // запуск таймера на 10 секунд
    moduleTask1.timer = setTimeout(() => {
        moduleTask1.showArray('');
    }, 10000);
};

// выделение самых тихих дней недели
moduleTask1.selectQuietestDays = function () {
    // проецирование текущей коллекции на массив скорости ветра
    let map = moduleTask1.currentWeatherList.map((o) => o.wind.speed);

    // самое низкое значение скорости ветра
    let min = Math.min(...map);

    // подсветка элементов по компаратору
    moduleTask1.colorElemIndexes((i) => map[i] === min);
};

// выделение самых ветренных дней недели
moduleTask1.selectWindiestDays = function () {
    // проецирование текущей коллекции на массив скорости ветра
    let map = moduleTask1.currentWeatherList.map((o) => o.wind.speed);

    // самое высокое значение скорости ветра
    let max = Math.max(...map);

    // подсветка элементов по компаратору
    moduleTask1.colorElemIndexes((i) => map[i] === max);
};

// выделение дней с северным ветром
moduleTask1.selectNorthDays = function () {
    // подсветка элементов по компаратору
    moduleTask1.colorElemIndexes((i) => moduleTask1.currentWeatherList[i].wind.direction === 'С');
};

// обработчик события окончательной загрузки страницы
window.onload = function () {
    // инициализация
    init();

    // вывод исходной коллекции
    moduleTask1.showDefaultArray();

    // Сортировка

    // Установка обработчика события на кнопку "По умолчанию"
    document.getElementById('btnDefualt').onclick = moduleTask1.showDefaultArray;

    // Установка обработчика события на кнопку "По убыванию температуры"
    document.getElementById('btnSortTemperature').onclick = moduleTask1.showSortTemperatureArray;

    // Установка обработчика события на кнопку "По возрастанию давления"
    document.getElementById('btnSortPressure').onclick = moduleTask1.showSortPressureArray;

    // Установка обработчика события на кнопку "По убыванию скорости ветра"
    document.getElementById('btnSortWindSpeed').onclick = moduleTask1.showSortWindSpeedArray;

    // Выделение

    // Установка обработчика события на кнопку "Самые тихие дни"
    document.getElementById('btnQuietestDays').onclick = moduleTask1.selectQuietestDays;

    // Установка обработчика события на кнопку "Самые ветренные дни"
    document.getElementById('btnWindiestDays').onclick = moduleTask1.selectWindiestDays;

    // Установка обработчика события на кнопку "Дни с северным ветром"
    document.getElementById('btnNorthDays').onclick = moduleTask1.selectNorthDays;
};

// работа по заданию
function init() {
    // массив объектов погоды
    moduleTask1.currentWeatherList = moduleTask1.originWeatherList = [
        new Weather('Понедельник'),
        new Weather('Вторник'),
        new Weather('Среда'),
        new Weather('Четверг'),
        new Weather('Пятница'),
        new Weather('Суббота'),
        new Weather('Воскресенье'),
    ];

    // изменение данных полей
    moduleTask1.originWeatherList.forEach((w) => setFieldsRandWeather(w));

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

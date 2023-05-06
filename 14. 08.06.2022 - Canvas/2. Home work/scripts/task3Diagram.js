// модуль
var moduleTask3Diagram = {};

// работники
moduleTask3Diagram.originWorkers = [];

// создание диаграммы
moduleTask3Diagram.createBarChart = function (canvas, data, width, height, color) {
    if (typeof canvas == 'string') canvas = document.getElementById(canvas);
    canvas.width = width;
    canvas.height = height;
    let context = canvas.getContext('2d');

    // находим максимальное значение в массиве данных
    let max = Math.max(...data);

    let scale = height / max;
    let barWidth = Math.floor(width / data.length);

    // создаем отдельный элемент диаграммы
    for (let i = 0; i < data.length; i++) {
        let barHeight = data[i] * scale,
            x = barWidth * i,
            y = height - barHeight;

        context.fillStyle = color;
        context.fillRect(x, y, barWidth - 2, barHeight);

        context.moveTo(x, y);
        context.textAlign = 'center';
        context.font = '12pt Verdana';
        context.fillStyle = 'white';
        // context.fillText(data[i], x + 10, y + 10);
        context.fillText(data[i], x + barWidth / 2, y + 30);
    }
};

// загрузка данных из локального хранилища
moduleTask3Diagram.loadFromLocalStorage = function () {
    // если данных в локальном хранилище нет
    if (!window.localStorage.workerList) return false;

    // загрузка данных
    moduleTask3Diagram.originWorkers = JSON.parse(window.localStorage.workerList).map((w) =>
        Object.assign(new Worker(), w)
    );

    return true;
};

// обработчик события загрузки страницы
window.addEventListener('load', function () {
    // загрузка данных из локального хранилища
    if (!moduleTask3Diagram.loadFromLocalStorage()) {
        $('header').innerHTML = 'Нет данных для отображения';
        return;
    }

    // отображение данных в графике
    moduleTask3Diagram.createBarChart(
        'diagram',
        moduleTask3Diagram.originWorkers.map((w) => w.getExperience()),
        800,
        400,
        'blue'
    );
});

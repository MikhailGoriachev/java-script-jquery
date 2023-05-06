// модуль
var moduleTask2Diagram = {};

// билеты
moduleTask2Diagram.originTickets = [];

// построение гистограммы при помощи div
// data   - массив данных для визуализации
// width  - ширина поля вывода гистограммы
// height - высота поля вывода гистограммы
// color  - цвет прямоугольников
moduleTask2Diagram.createBarChart = function createBarChart(data, width, height, color) {
    // создаем контейнер для диаграммы
    let chart = document.createElement('div');
    chart.style.width = width + 'px';
    chart.style.height = height + 'px';
    chart.style.position = 'relative';

    // находим максимальное значение в массиве данных
    let max = Math.max(...data);

    // масштаб по вертикалы и ширина
    let scale = height / max;
    let barWidth = Math.floor(width / data.length);

    // поэлементное создание гистограммы
    for (let i = 0; i < data.length; i++) {
        // создаем отдельный элемент диаграммы
        let bar = document.createElement('div');

        // формируем высоту div в зависимости от данных - высотой показываем значение
        bar.style.height = data[i] * scale + 'px';
        bar.style.width = barWidth - 4 + 'px'; // 4px для отступа

        bar.style.position = 'absolute';
        bar.style.margin = '4px';
        bar.style.bottom = '0px';
        bar.style.left = barWidth * i + 'px';

        bar.style.backgroundColor = color;

        bar.innerHTML = `<h4 class="text-align-center">${data[i]}</h4>`;
        bar.style.color = '#fff';
        bar.style.borderRadius = '5px';

        bar.style.boxSizing = 'border-box';

        bar.classList.add('tile');

        bar.style.padding = '0';

        chart.appendChild(bar);
    } // for i

    return chart;
};

// загрузка данных из локального хранилища
moduleTask2Diagram.loadFromLocalStorage = function () {
    // если данных в локальном хранилище нет
    if (!window.localStorage.ticketList) return false;

    // данные
    let data = JSON.parse(window.localStorage.ticketList);

    moduleTask2Diagram.originTickets = data.map((t) => Object.assign(new Ticket(), t));

    return true;
};

// обработчик события загрузки страницы
window.addEventListener('load', function () {
    // загрузка данных из локального хранилища
    if (!moduleTask2Diagram.loadFromLocalStorage()) {
        $('header').innerHTML = 'Нет данных для отображения';
        return;
    }

    // отображение данных в графике
    $('diagram').appendChild(
        moduleTask2Diagram.createBarChart(
            moduleTask2Diagram.originTickets.map((t) => t.ticketCost),
            800,
            400,
            'blue'
        )
    );
});

//  Задача 3. Светофор

//  Задача 3. Реализуйте «светофор» в выделенной части экрана: переключайте
//  цвет области по циклу красный – желтый – зеленый, период переключения 3 с,
//  предусмотрите кнопки разрешения и запрещения работы «светофора»

// глобальная переменная модуля третьего задания
var moduleTask3 = {};

// массив цветов
moduleTask3.colors = ['red', 'yellow', 'green', 'yellow'];

// период переключения цветов
moduleTask3.period = 3_000;

// текущая фаза светофора
moduleTask3.phaseIndex = 1;

// таймер переключения цветов
moduleTask3.timer = null;

// элемент светофора
moduleTask3.element = $('lightsObject');

// начало работы светофора
moduleTask3.start = function () {
    // удаление такущего интервала
    clearInterval(moduleTask3.timer);

    moduleTask3.element = $('lightsObject');

    // начало нового интервала
    moduleTask3.timer = setInterval(() => {
        moduleTask3.element.style.backgroundColor =
            moduleTask3.colors[moduleTask3.phaseIndex++ % moduleTask3.colors.length];
    }, moduleTask3.period);
};

// остановка работы светофора
moduleTask3.stop = function () {
    clearInterval(moduleTask3.timer);
};

// обработчик события загрузки страницы
window.onload = function () {
    // обработчик нажатия на кнопку старта работы светофора
    $('btnStart').onclick = moduleTask3.start;

    // обработчик нажатия на кнопку остановки работы светофора
    $('btnStop').onclick = moduleTask3.stop;
};

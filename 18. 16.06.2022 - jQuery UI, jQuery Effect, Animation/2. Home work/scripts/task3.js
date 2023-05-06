//  Задача 3. Анимация

//  Задача 3. Реализуйте анимацию средствами jQuery – перемещение произвольного небольшого изображения
//  (изображение должно быть фоном блока div) в ограниченном прямоугольнике. Предусмотрите кнопки для
//  запуска и останова движения по замкнутой траектории – движение по кругу (эллипсу).
//  Также предусмотрите кнопки для ручного перемещения изображения (влево, вниз, вправо, вверх).
//  Такие же перемещения должны быть назначены на клавиши A, S, D, W. Дополнительно: реализуйте
//  перетаскивание фигуры в пределах блока.

// модуль первого задания
var moduleTask3 = {};

// блок с изображением
moduleTask3.block = null;

// значение для смещения
moduleTask3.moveValue = 10;

// интервал
moduleTask3.interval = null;

// период интервала
moduleTask3.delay = 10;

// максимальные координаты
moduleTask3.coordRange = {
    // миниально по x
    minX: 0,

    // минимально по y
    minY: 0,

    // максимально по x
    maxX: 400,

    // максимально по y
    maxY: 400,
};

// текущая позиция
moduleTask3.getCoord = function () {
    return moduleTask3.block.position();
};

// являются ли координаты в пределах блока
moduleTask3.isInside = function (pos = { left: 0, top: 0 }) {
    return (
        pos.left >= moduleTask3.coordRange.minX &&
        pos.left <= moduleTask3.coordRange.maxX &&
        pos.top >= moduleTask3.coordRange.minY &&
        pos.top <= moduleTask3.coordRange.maxY
    );
};

// передвижения по сторонам (вверх, вправо, вниз, влево)

// вверх
moduleTask3.toUp = function (isAnimate = true) {
    moduleTask3.move({ left: 0, top: -moduleTask3.moveValue }, isAnimate);
};

// вправо
moduleTask3.toRight = function (isAnimate = true) {
    moduleTask3.move({ left: moduleTask3.moveValue, top: 0 }, isAnimate);
};

// вниз
moduleTask3.toDown = function (isAnimate = true) {
    moduleTask3.move({ left: 0, top: moduleTask3.moveValue }, isAnimate);
};

// влево
moduleTask3.toLeft = function (isAnimate = true) {
    moduleTask3.move({ left: -moduleTask3.moveValue, top: 0 }, isAnimate);
};

// перемещение
moduleTask3.move = function (addValue = { left: 0, top: 0 }, isAmimate = true) {

    // текущая позиция
    let pos = moduleTask3.block.position();

    // изменение позиции
    pos.left += addValue.left;
    pos.top += addValue.top;

    // перемещение элемента
    if (moduleTask3.isInside(pos)) {
        if (isAmimate)
            moduleTask3.block.animate({ left: pos.left, top: pos.top }, 100);
        else
            moduleTask3.block.offset(function (i, coord) {
                coord.left += addValue.left;
                coord.top += addValue.top;

                return coord;
            });
    }
};

// обработчик событий нажатия клавиши
moduleTask3.keyDownHandler = function (e) {

    // фукнция для работы
    let func = null;

    switch (e.code)
    {
        // вверх
        case "KeyW":
            func = moduleTask3.toUp;
            break;

        // вправо
        case "KeyD":
            func = moduleTask3.toRight;
            break;

        // вниз
        case "KeyS":
            func = moduleTask3.toDown;
            break;

        // влево
        case "KeyA":
            func = moduleTask3.toLeft;
            break;
    }

    if (func) {
        clearInterval(moduleTask3.interval);
        moduleTask3.interval = setInterval(() => func(false), moduleTask3.delay);
    }

}

// обработчик события откускания клавиши
moduleTask3.keyUpHandler = function (e) {
    clearInterval(moduleTask3.interval);
}

// движение по замкнутой оси (эллипсу)
moduleTask3.runElipse = function () {
    clearInterval(moduleTask3.interval);

    // центральная точка
    const center = 200;
    const radius = 100;

    // смещение
    let f = 0;

    // угол
    let s = 2 * Math.PI / 180;

    moduleTask3.interval = setInterval(function() { // функция движения
        f += s; // приращение аргумента
        moduleTask3.block.css('left', `${center + radius * Math.sin(f)}px`),
        moduleTask3.block.css('top',  `${center + radius * Math.cos(f)}px`)
    }, moduleTask3.delay)

}

// инициализация
moduleTask3.init = function () {
    // инициализация ссылки на блок
    moduleTask3.block = $('#blockId');

    // установка обработчиков событий

    // нажатия на кнопки

    // вверх
    $('#arrowUp').on('click', () => { clearInterval(moduleTask3.interval); moduleTask3.toUp(); });

    // вправо
    $('#arrowRight').on('click', () => { clearInterval(moduleTask3.interval); moduleTask3.toRight(); });

    // вниз
    $('#arrowDown').on('click', () => { clearInterval(moduleTask3.interval); moduleTask3.toDown(); });

    // влево
    $('#arrowLeft').on('click', () => { clearInterval(moduleTask3.interval); moduleTask3.toLeft(); });

    let body = $('body');

    // обработка нажатия клавиши
    body.on('keydown', moduleTask3.keyDownHandler);

    // обработка отпускания клавиши
    body.on('keyup', moduleTask3.keyUpHandler);

    // старт движение по замкнутой оси
    $('#startElipse').on('click', moduleTask3.runElipse);

    // стоп движение по замкнутой оси
    $('#stopElipse').on('click', () => clearInterval(moduleTask3.interval));

    // сделать блок с изображением draggable
    $("#blockId").draggable({
        start: function () {
            clearInterval(moduleTask3.interval);
        },
        containment:".container-block"
    });
};

// обработка загрузки страницы
$(moduleTask3.init);

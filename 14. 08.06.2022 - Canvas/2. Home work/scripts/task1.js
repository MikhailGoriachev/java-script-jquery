//  Задача 1. Фигуры

//  Задача 1.  Разработайте формы ввода для задания исходных данных и решения следующих задач –
//  вариантов из учебника Павловской Т.А. по C#:
//
//  Проверяйте значения на допустимость: В первом выражении: b > -2, во втором: x > 3,
//  в третьем m > 0. Данные не передавать на сервер, вести обработку в коде JavaScript этой же
//  страницы HTML.  Все формы должны быть размещены на одной странице. Сохранять исходные данные
//  и результаты вычислений в куки. При загрузке страницы читать сохраненные данные из куки,
//  выводить в поля ввода, в области вывода результатов. Срок жизни куки – 72 часа. Предусмотрите
//  кнопку для очистки куки.

// модуль первого задания
var moduleTask1 = {};

// фигуры
moduleTask1.figures = [];

// обработчик загрузки страницы
moduleTask1.init = function () {
    // создание фигур
    moduleTask1.figures = [
        new Rectangle(100, 100, '#2F5F7A', '#AECD54', $('rectCanvas')),
        new Triangle(100, 100, '#2F5F7A', '#AECD54', $('triangleCanvas')),
        new Circle(50, '#2F5F7A', '#AECD54', $('circleCanvas')),
    ];

    // обабочтики событий

    // значение для увеличения фигур
    const value = 10;

    // прямоугольник
    $('incRectHeight').addEventListener('click', () => moduleTask1.figures[0].increaseHeight(value));
    $('decRectHeight').addEventListener('click', () => moduleTask1.figures[0].decreaseHeight(value));

    $('incRectWidth').addEventListener('click', () => moduleTask1.figures[0].increaseWidth(value));
    $('decRectWidth').addEventListener('click', () => moduleTask1.figures[0].decreaseWidth(value));

    // контроллы для выбора цвета
    let stroke = $('rectStrokeColor'),
        fill = $('rectFillColor');

    // настройка контроллов
    stroke.value = moduleTask1.figures[0].strokeColor;
    fill.value = moduleTask1.figures[0].fillColor;

    stroke.addEventListener('change', () => moduleTask1.figures[0].setStrokeColor($('rectStrokeColor').value));
    fill.addEventListener('change', () => moduleTask1.figures[0].setFillColor($('rectFillColor').value));

    // треугольник
    $('incTriangleHeight').addEventListener('click', () => moduleTask1.figures[1].increaseHeight(value));
    $('decTriangleHeight').addEventListener('click', () => moduleTask1.figures[1].decreaseHeight(value));

    $('incTriangleWidth').addEventListener('click', () => moduleTask1.figures[1].increaseWidth(value));
    $('decTriangleWidth').addEventListener('click', () => moduleTask1.figures[1].decreaseWidth(value));

    // контроллы для выбора цвета
    stroke = $('triangleStrokeColor');
    fill = $('triangleFillColor');

    // настройка контроллов
    stroke.value = moduleTask1.figures[1].strokeColor;
    fill.value = moduleTask1.figures[1].fillColor;

    stroke.addEventListener('change', () => moduleTask1.figures[1].setStrokeColor($('triangleStrokeColor').value));
    fill.addEventListener('change', () => moduleTask1.figures[1].setFillColor($('triangleFillColor').value));

    // круг
    $('incCircleRadius').addEventListener('click', () => moduleTask1.figures[2].increaseRadius(value));
    $('decCircleRadius').addEventListener('click', () => moduleTask1.figures[2].decreaseRadius(value));

    // контроллы для выбора цвета
    stroke = $('circleStrokeColor');
    fill = $('circleFillColor');

    // настройка контроллов
    stroke.value = moduleTask1.figures[2].strokeColor;
    fill.value = moduleTask1.figures[2].fillColor;

    stroke.addEventListener('change', () => moduleTask1.figures[2].setStrokeColor($('circleStrokeColor').value));
    fill.addEventListener('change', () => moduleTask1.figures[2].setFillColor($('circleFillColor').value));

    // отрисовка фигур
    moduleTask1.figures.forEach((f) => f.draw());
};

// обработка события загрузки страницы
window.addEventListener('load', moduleTask1.init);

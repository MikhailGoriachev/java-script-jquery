//  Задача 1. Фигуры

//  Задача 1.  Разместите на странице три элемента canvas. Выведите в элементы прямоугольник,
//  равнобедренный треугольник, круг и прямоугольная трапеция, выравнивание элементов – по центру
//  областей вывода. При помощи элементов управления изменяйте размеры фигур (высоту и ширину
//  прямоугольника, высоту и основание треугольника, радиус круга, высоту и основания прямоугольной
//  трапеции), цвет заливки и цвет рамки фигур.
//
// Сохраняйте параметры фигур в локальном хранилище, восстанавливайте параметры при загрузке страницы.

// модуль первого задания
var moduleTask1 = {};

// фигуры
moduleTask1.figures = [];

// сохранение данных в локальное хранилище
moduleTask1.saveData = function () {
    window.localStorage.figureList = JSON.stringify(moduleTask1.figures);

    moduleTask1.figures.forEach((f) => f.saveData());
};

// загрузка данных в локаольное хранилище
moduleTask1.loadData = function () {
    // если данных нет
    if (
        !window.localStorage.trapezoid ||
        !window.localStorage.rectangle ||
        !window.localStorage.circle ||
        !window.localStorage.triangle
    ) {
        return false;
    }

    // загрузка данных
    moduleTask1.figures = [new Rectangle(), new Triangle(), new Circle(), new Trapezoid()];

    // установка данных фигур
    moduleTask1.figures.map((f) => f.loadData(null));

    // установка ссылки на canvas
    moduleTask1.figures[0]._canvas = $('#rectCanvas')[0];
    moduleTask1.figures[1]._canvas = $('#triangleCanvas')[0];
    moduleTask1.figures[2]._canvas = $('#circleCanvas')[0];
    moduleTask1.figures[3]._canvas = $('#trapCanvas')[0];

    return true;
};

// обработчик загрузки страницы
moduleTask1.init = function () {
    // загрузка данных
    if (!moduleTask1.loadData()) {
        // создание фигур
        moduleTask1.figures = [
            new Rectangle(100, 100, '#2F5F7A', '#AECD54', $('#rectCanvas')[0]),
            new Triangle(100, 100, '#2F5F7A', '#AECD54', $('#triangleCanvas')[0]),
            new Circle(50, '#2F5F7A', '#AECD54', $('#circleCanvas')[0]),
            new Trapezoid(100, 70, 100, '#2F5F7A', '#AECD54', $('#trapCanvas')[0]),
        ];

        moduleTask1.saveData();
    }

    // обабочтики событий

    // значение для увеличения фигур
    const value = 10;

    // прямоугольник
    $('#incRectHeight').click(() => moduleTask1.figures[0].increaseHeight(value));
    $('#decRectHeight').click(() => moduleTask1.figures[0].decreaseHeight(value));

    $('#incRectWidth').click(() => moduleTask1.figures[0].increaseWidth(value));
    $('#decRectWidth').click(() => moduleTask1.figures[0].decreaseWidth(value));

    // контроллы для выбора цвета
    let stroke = $('#rectStrokeColor'),
        fill = $('#rectFillColor');

    // настройка контроллов
    stroke.val(moduleTask1.figures[0].strokeColor);
    fill.val(moduleTask1.figures[0].fillColor);

    stroke.change(() => moduleTask1.figures[0].setStrokeColor($('#rectStrokeColor').val()));
    fill.change(() => moduleTask1.figures[0].setFillColor($('#rectFillColor').val()));

    // треугольник
    $('#incTriangleHeight').click(() => moduleTask1.figures[1].increaseHeight(value));
    $('#decTriangleHeight').click(() => moduleTask1.figures[1].decreaseHeight(value));

    $('#incTriangleWidth').click(() => moduleTask1.figures[1].increaseWidth(value));
    $('#decTriangleWidth').click(() => moduleTask1.figures[1].decreaseWidth(value));

    // контроллы для выбора цвета
    stroke = $('#triangleStrokeColor');
    fill = $('#triangleFillColor');

    // настройка контроллов
    stroke.val(moduleTask1.figures[1].strokeColor);
    fill.val(moduleTask1.figures[1].fillColor);

    stroke.change(() => moduleTask1.figures[1].setStrokeColor($('#triangleStrokeColor').val()));
    fill.change(() => moduleTask1.figures[1].setFillColor($('#triangleFillColor').val()));

    // круг
    $('#incCircleRadius').click(() => moduleTask1.figures[2].increaseRadius(value));
    $('#decCircleRadius').click(() => moduleTask1.figures[2].decreaseRadius(value));

    // контроллы для выбора цвета
    stroke = $('#circleStrokeColor');
    fill = $('#circleFillColor');

    // настройка контроллов
    stroke.val(moduleTask1.figures[2].strokeColor);
    fill.val(moduleTask1.figures[2].fillColor);

    stroke.change(() => moduleTask1.figures[2].setStrokeColor($('#circleStrokeColor').val()));
    fill.change(() => moduleTask1.figures[2].setFillColor($('#circleFillColor').val()));

    // трапеция
    $('#incTrapHeight').click(() => moduleTask1.figures[3].increaseHeight(value));
    $('#decTrapHeight').click(() => moduleTask1.figures[3].decreaseHeight(value));

    $('#incTrapWidth').click(() => moduleTask1.figures[3].increaseWidth(value));
    $('#decTrapWidth').click(() => moduleTask1.figures[3].decreaseWidth(value));

    // контроллы для выбора цвета
    stroke = $('#trapStrokeColor');
    fill = $('#trapFillColor');

    // настройка контроллов
    stroke.val(moduleTask1.figures[3].strokeColor);
    fill.val(moduleTask1.figures[3].fillColor);

    stroke.change(() => moduleTask1.figures[3].setStrokeColor($('#trapStrokeColor').val()));
    fill.change(() => moduleTask1.figures[3].setFillColor($('#trapFillColor').val()));

    // отрисовка фигур
    moduleTask1.figures.forEach((f) => f.draw());
};

// обработка события загрузки страницы
$(moduleTask1.init);

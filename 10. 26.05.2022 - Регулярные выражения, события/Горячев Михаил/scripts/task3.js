//  Задача 3. Анимация

//  Задача 3. Реализуйте «светофор» в выделенной части экрана: переключайте
//  цвет области по циклу красный – желтый – зеленый, период переключения 3 с,
//  предусмотрите кнопки разрешения и запрещения работы «светофора»

// глобальная переменная модуля третьего задания
var moduleTask3 = {};

// период
moduleTask3.interval = null;

// длительность периода
moduleTask3.durationPeriod = 14;

// объёкт передвижения
moduleTask3.model = $('imageModel');

// координаты объекта
moduleTask3.modelCoordinates = {
    left: () => +moduleTask3.model.style.left.replace('%', ''),
    top: () => +moduleTask3.model.style.top.replace('%', ''),
};

// установка координат объекта
moduleTask3.setModelCoordinates = function (left = 0, top = 0) {
    moduleTask3.model.style.left = `${left}%`;
    moduleTask3.model.style.top = `${top}%`;
};

// направления
moduleTask3.direction = {
    // перемещение влево вверх
    leftTop: () => {
        let left = moduleTask3.modelCoordinates.left();
        let top = moduleTask3.modelCoordinates.top();

        if (left <= 0 || top <= 0) {
            moduleTask3.currentDirection =
                left == 0 ? moduleTask3.direction.rightTop : moduleTask3.direction.leftBottom;
            return;
        }

        // перемещение влево вверх
        moduleTask3.setModelCoordinates(left - 0.5, top - 0.5);
    },

    // перемещение вправо вниз
    rightBottom: () => {
        let left = moduleTask3.modelCoordinates.left();
        let top = moduleTask3.modelCoordinates.top();

        if (left >= 84 || top >= 90) {
            moduleTask3.currentDirection =
                left == 84 ? moduleTask3.direction.leftBottom : moduleTask3.direction.rightTop;
            return;
        }

        // перемещение вправо вниз
        moduleTask3.setModelCoordinates(left + 0.5, top + 0.5);
    },

    // перемещение вправо вверх
    rightTop: () => {
        let left = moduleTask3.modelCoordinates.left();
        let top = moduleTask3.modelCoordinates.top();

        if (left >= 84 || top <= 0) {
            moduleTask3.currentDirection = top == 0 ? moduleTask3.direction.rightBottom : moduleTask3.direction.leftTop;
            return;
        }

        // перемещение вправо вверх
        moduleTask3.setModelCoordinates(left + 0.5, top - 0.5);
    },

    // перемещение влево вниз
    leftBottom: () => {
        let left = moduleTask3.modelCoordinates.left();
        let top = moduleTask3.modelCoordinates.top();

        if (left <= 0 || top >= 90) {
            moduleTask3.currentDirection =
                top == 90 ? moduleTask3.direction.leftTop : moduleTask3.direction.rightBottom;
            return;
        }

        // перемещение влево вниз
        moduleTask3.setModelCoordinates(left - 0.5, top + 0.5);
    },
};

// текущее направление
moduleTask3.currentDirection = moduleTask3.direction.rightBottom;

// старт работы по заданию
moduleTask3.start = function () {
    clearInterval(moduleTask3.interval);

    moduleTask3.interval = setInterval(() => moduleTask3.currentDirection(), moduleTask3.durationPeriod);
};

// остановка работы по заданию
moduleTask3.stop = function () {
    clearInterval(moduleTask3.interval);
};

// установка обработчика события загрузки страницы
window.onload = function () {
    moduleTask3.model = $('imageModel');

    moduleTask3.model.style.left = '50%';
    moduleTask3.model.style.top = '80%';

    // обработчик кнопки Стар
    $('btnStart').onclick = moduleTask3.start;

    // обработчик кнопки Стоп
    $('btnStop').onclick = moduleTask3.stop;
};

<<<<<<< HEAD
=======
<<<<<<< HEAD
//  Задача 2. Анимация

//  Задача 3. Реализуйте «светофор» в выделенной части экрана: переключайте
//  цвет области по циклу красный – желтый – зеленый, период переключения 3 с,
//  предусмотрите кнопки разрешения и запрещения работы «светофора»

// глобальная переменная модуля третьего задания
var moduleTask2 = {};

// период
moduleTask2.interval = null;

// длительность периода
moduleTask2.durationPeriod = 14;

// объёкт передвижения
moduleTask2.model = $('imageModel');

// координаты объекта
moduleTask2.modelCoordinates = {
    left: () => +moduleTask2.model.style.left.replace('px', ''),
    top: () => +moduleTask2.model.style.top.replace('px', ''),
};

// установка координат объекта
moduleTask2.setModelCoordinates = function (left = 0, top = 0) {
    moduleTask2.model.style.left = `${left}px`;
    moduleTask2.model.style.top = `${top}px`;
};

// направления
moduleTask2.direction = {
    // вверх
    top: () => {
        let left = moduleTask2.modelCoordinates.left();
        let top = moduleTask2.modelCoordinates.top();

        if (top <= 0) {
            return;
        }

        // перемещение вверх
        moduleTask2.setModelCoordinates(left, top - 5);
    },

    // вправо
    right: () => {
        let left = moduleTask2.modelCoordinates.left();
        let top = moduleTask2.modelCoordinates.top();

        if (left >= 480) {
            return;
        }

        // перемещение вправо
        moduleTask2.setModelCoordinates(left + 5, top);
    },

    // вниз
    down: () => {
        let left = moduleTask2.modelCoordinates.left();
        let top = moduleTask2.modelCoordinates.top();

        if (top >= 440) {
            return;
        }

        // перемещение вниз
        moduleTask2.setModelCoordinates(left, top + 5);
    },

    // влево
    left: () => {
        let left = moduleTask2.modelCoordinates.left();
        let top = moduleTask2.modelCoordinates.top();

        if (left <= 0) {
            return;
        }

        // перемещение влево
        moduleTask2.setModelCoordinates(left - 5, top);
    },

    // перемещение влево вверх
    leftTop: () => {
        let left = moduleTask2.modelCoordinates.left();
        let top = moduleTask2.modelCoordinates.top();

        if (left <= 0 || top <= 0) {
            moduleTask2.currentDirection =
                left == 0 ? moduleTask2.direction.rightTop : moduleTask2.direction.leftBottom;
            return;
        }

        // перемещение влево вверх
        moduleTask2.setModelCoordinates(left - 5, top - 5);
    },

    // перемещение вправо вниз
    rightBottom: () => {
        let left = moduleTask2.modelCoordinates.left();
        let top = moduleTask2.modelCoordinates.top();

        if (left >= 480 || top >= 440) {
            moduleTask2.currentDirection =
                left == 480 ? moduleTask2.direction.leftBottom : moduleTask2.direction.rightTop;
            return;
        }

        // перемещение вправо вниз
        moduleTask2.setModelCoordinates(left + 5, top + 5);
    },

    // перемещение вправо вверх
    rightTop: () => {
        let left = moduleTask2.modelCoordinates.left();
        let top = moduleTask2.modelCoordinates.top();

        if (left >= 480 || top <= 0) {
            moduleTask2.currentDirection = top == 0 ? moduleTask2.direction.rightBottom : moduleTask2.direction.leftTop;
            return;
        }

        // перемещение вправо вверх
        moduleTask2.setModelCoordinates(left + 5, top - 5);
    },

    // перемещение влево вниз
    leftBottom: () => {
        let left = moduleTask2.modelCoordinates.left();
        let top = moduleTask2.modelCoordinates.top();

        if (left <= 0 || top >= 440) {
            moduleTask2.currentDirection =
                top == 440 ? moduleTask2.direction.leftTop : moduleTask2.direction.rightBottom;
            return;
        }

        // перемещение влево вниз
        moduleTask2.setModelCoordinates(left - 5, top + 5);
    },
};

// текущее направление
moduleTask2.currentDirection = moduleTask2.direction.rightBottom;

// старт работы по заданию
moduleTask2.start = function () {
    clearInterval(moduleTask2.interval);

    moduleTask2.interval = setInterval(() => moduleTask2.currentDirection(), moduleTask2.durationPeriod);
};

// остановка работы по заданию
moduleTask2.stop = function () {
    clearInterval(moduleTask2.interval);
};

// установка движение объекта при нажатии на клавишу
moduleTask2.setDirectionKeyDown = function (e) {
    let direction = moduleTask2.direction.top;

    switch (e.code) {
        // вверх
        case 'KeyW':
            direction = moduleTask2.direction.top;
            break;

        // вправо
        case 'KeyD':
            direction = moduleTask2.direction.right;
            break;

        // вниз
        case 'KeyS':
            direction = moduleTask2.direction.down;
            break;

        // влево
        case 'KeyA':
            direction = moduleTask2.direction.left;
            break;

        // иначе
        default:
            direction = null;
            break;
    }

    // удаление текущего интервала
    clearInterval(moduleTask2.interval);

    // начало движения
    moduleTask2.interval = setInterval(direction, moduleTask2.durationPeriod);
};

// обработка события отпускания клавиши
moduleTask2.setDirectionKeyUp = function () {
    // удаление текущего интервала
    clearInterval(moduleTask2.interval);
};

// обработка события нажатие клавиши мыши
moduleTask2.drag = function (e) {
    // текущие координаты мыши
    let mouseX = e.clientX,
        mouseY = e.clientY;

    // координаты элемента
    let originX = moduleTask2.model.offsetLeft,
        originY = moduleTask2.model.offsetTop;

    // разница между координатами мыши и координатами элемента
    let diffX = mouseX - originX,
        diffY = mouseY - originY;

    function mouseMove(e) {
        x = e.clientX - diffX;
        y = e.clientY - diffY;

        // перемещение элемента
        moduleTask2.model.style.left = (x >= 0 && x <= 480 ? x : moduleTask2.model.style.left) + 'px';
        moduleTask2.model.style.top = (y >= 0 && y <= 440 ? y : moduleTask2.model.style.left) + 'px';
    }

    function mouseUp() {
        // удаление слушателей
        document.removeEventListener('mousemove', mouseMove, true);
        document.removeEventListener('mouseup', mouseUp, true);
    }

    // обработка нажатия клавиши мыши
    document.addEventListener('mousemove', mouseMove, true);

    // обработка отпускания клавиши мыши
    document.addEventListener('mouseup', mouseUp, true);
};

// обраотка события отпускания клавиши мыши
moduleTask2.setDirectionMouseUp = function (e) {};

// установка обработчика события загрузки страницы
window.onload = function () {
    moduleTask2.model = $('imageModel');

    moduleTask2.model.style.left = '250px';
    moduleTask2.model.style.top = '250px';

    // обработчик кнопки Стар
    $('btnStart').addEventListener('click', moduleTask2.start, false);

    // обработчик кнопки Стоп
    $('btnStop').addEventListener('click', moduleTask2.stop, false);

    // установка обработчика события на нажатие клавиши
    document.getElementsByTagName('body')[0].addEventListener('keydown', moduleTask2.setDirectionKeyDown, false);
    document.getElementsByTagName('body')[0].addEventListener('keyup', moduleTask2.setDirectionKeyUp, false);

    // установка обработчика события перетаскиваия мыши
    moduleTask2.model.addEventListener('mousedown', moduleTask2.drag);
=======
>>>>>>> master
//  Задача 2. Заявки

//  Задача 2. Каждая заявка на авиабилет содержит: пункт назначения, номер рейса,
//  фамилию и инициалы пассажира, стоимость билета. Разработайте класс для хранения
//  заявки, создайте массив заявок из 10 - 12 элементов. Выведите массив заявок в
//  разметку, предусмотрите команды:
//  •	Вывод исходного массива заявок
//  •	Вывод копии массива, упорядоченного по пунктам назначения;
//  •	Вывод копии массива, упорядочив по стоимости билета;
//  •	Вывод копии массива, выделив все заявки со стоимостью выше 3000 рублей,
//      снять выделение через 10 с

// глобальная переменная модуля второго задания
var moduleTask2 = {};

// размер массива
moduleTask2.size = 10;

// исходная коллекция билетов
moduleTask2.originTickets = Array(moduleTask2.size)
    .fill()
    .map((elem) => Ticket.getTicketGenerator());

// массив представления билетов
moduleTask2.viewTickets = [...moduleTask2.originTickets];

// таймер
moduleTask2.timer = null;

// длительность работы таймера
moduleTask2.timeoutTimer = 10_000;

// вывод массива билетов
moduleTask2.showTickets = function () {
    $('ticketsList').innerHTML = moduleTask2.viewTickets.reduce((acc, elem) => (acc += elem.toHTML()), '');
};

// вывод массива клиентов без упорядочивания
moduleTask2.showDefultTickets = function () {
    // установка исходного массива
    moduleTask2.viewTickets = [...moduleTask2.originTickets];

    // вывод массива клиентов
    moduleTask2.showTickets();
};

// вывод копии массива билетов упорядоченных по пануктам назначения
moduleTask2.showTicketsByDestinations = function () {
    // упорядочивание массива
    moduleTask2.viewTickets.sort((a, b) => a.destination.localeCompare(b.destination));

    // вывод массива
    moduleTask2.showTickets();
};

// вывод копии массива билетов упорядоченных по стоимости билета
moduleTask2.showTicketsByTicketCost = function () {
    // упорядочивание массива
    moduleTask2.viewTickets.sort((a, b) => a.ticketCost - b.ticketCost);

    // вывод массива
    moduleTask2.showTickets();
};

// выделение цветом билета
moduleTask2.selectColorElems = function (
    containerId = '',
    comp = () => {},
    resetColor = () => {},
    color = 'rgba(143, 96, 219, 0.562)'
) {
    // вывод массива для отчистки прошлых выделений
    moduleTask2.showTickets();

    // контейнер для вывода клиентов
    let elements = document.getElementsByName('ticket');

    // выделение цветом клиента
    for (let i = 0, k = 0; i < elements.length; i++) {
        // текущий элемент разметки
        const elem = elements[i];

        // сравнение по компаратору
        if (comp(k)) {
            // выделение цветом
            elem.style.backgroundColor = color;
        }

        k++;
    }

    // удаление текущего таймера
    clearTimeout(moduleTask2.timer);

    // запуск таймера для очистки выделения
    moduleTask2.timer = setTimeout(resetColor, 10000);
};

// вывеление копии массива билетов со стоимостью выше 3000 рублей
moduleTask2.selectColorTicketCostOver = function () {
    // стоимость билета по заданию
    const cost = 3_000;

    // вывод массива клиентов
    moduleTask2.selectColorElems(
        'ticketsList',
        (i) => moduleTask2.viewTickets[i].ticketCost > cost,
        moduleTask2.showTickets
    );
};

// обработчик события загрузки страницы
window.onload = function () {
    // вывод билетов
    moduleTask2.showDefultTickets();

    // установка обработчиков на кнопки

    // Клиенты

    // <button id="btnTicketsDefualt">По умолчанию</button>
    // <button id="btnTicketsSortByDestinations">По назначениям</button>
    // <button id="btnTicketsSortByCost">По стоимости</button>
    // <button id="btnTicketsSelectByCostOver">Стоимость выше 3000 &#8381;</button>

    // По умолчанию
    $('btnTicketsDefualt').onclick = moduleTask2.showDefultTickets;

    // По назначениям
    $('btnTicketsSortByDestinations').onclick = moduleTask2.showTicketsByDestinations;

    // По стоимости
    $('btnTicketsSortByCost').onclick = moduleTask2.showTicketsByTicketCost;

    // Стоимость выше 3000
    $('btnTicketsSelectByCostOver').onclick = moduleTask2.selectColorTicketCostOver;
<<<<<<< HEAD
=======
>>>>>>> remotes/origin/main
>>>>>>> master
};

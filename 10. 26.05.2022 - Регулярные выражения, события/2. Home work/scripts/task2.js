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
};

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

// форма доавления заявки
moduleTask2.addTicketForm = null;

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
    $('ticketsListId').innerHTML = moduleTask2.viewTickets.reduce((acc, elem) => (acc += elem.toHTML()), '');
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
    comp = () => {},
    resetColor = () => {},
    period = moduleTask2.timeoutTimer,
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
    moduleTask2.timer = setTimeout(resetColor, period);
};

// вывеление копии массива билетов со стоимостью выше указанного значения
moduleTask2.selectColorTicketCostOver = function (cost) {
    if (cost === 0) {
        moduleTask2.showTickets();
        return;
    }

    // вывод массива клиентов
    moduleTask2.selectColorElems((i) => moduleTask2.viewTickets[i].ticketCost > cost, moduleTask2.showTickets);
};

// обработчик события загрузки страницы
window.addEventListener('load', function () {
    // установка формы
    moduleTask2.addTicketForm = new TicketForm('formContainerId', (ticket) => {
        // добавлени заявки в массив
        moduleTask2.originTickets.unshift(ticket);

        // вывод массива по умолчанию
        moduleTask2.showDefultTickets();

        // подсветка нового билета
        moduleTask2.selectColorElems((i) => i === 0, moduleTask2.showDefultTickets, 2_500);
    });

    // вывод билетов
    moduleTask2.showDefultTickets();

    // установка обработчиков событий

    // По умолчанию
    $('btnTicketsDefualt').addEventListener('click', moduleTask2.showDefultTickets, false);

    // По назначениям
    $('btnTicketsSortByDestinations').addEventListener('click', moduleTask2.showTicketsByDestinations, false);

    // По стоимости
    $('btnTicketsSortByCost').addEventListener('click', moduleTask2.showTicketsByTicketCost, false);

    // Поле для ввода стомиости
    $('inpCostOverId').addEventListener('input', () =>
        moduleTask2.selectColorTicketCostOver(+$('inpCostOverId').value)
    );

    // Обработка нажатия кнопки при вводе стоимости
    $('inpCostOverId').addEventListener('keypress', filterInputForNumber, false);

    // Добавление заявки на билет
    $('btnAddTicket').addEventListener('click', () => moduleTask2.addTicketForm.show(), false);
});

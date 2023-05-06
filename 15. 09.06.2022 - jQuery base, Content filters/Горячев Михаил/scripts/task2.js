//  Задача 2. Заявки

//  Задача 2. Каждая заявка на авиабилет содержит: пункт назначения, номер рейса, фамилию
//  и инициалы пассажира, стоимость билета. Разработайте класс для хранения заявки, создайте
//  массив заявок из 10 - 12 элементов. Выведите массив заявок в разметку, предусмотрите
//  команды (назначенные на экранные кнопки и клавиши):
//  •	Вывод исходного массива заявок
//  •	Вывод копии массива, упорядоченного по пунктам назначения;
//  •	Вывод копии массива, упорядочив по стоимости билета;
//  •	Вывод копии массива, упорядочив по номеру рейса
//  •	Вывод копии массива, выделив все заявки со стоимостью выше значения, вводимого из
//      строки ввода (не используйте формы), снимайте выделение через 10 с
//  •	Вывод копии массива с выделением заявок в заданный пункт назначения, выделение
//      выполняйте при помощи фильтра контента jQuery), снимайте выделение через 10 с
//  •	Вывод копии массива с выделением заявок с заданным номером рейса, выделение
//      выполняйте при помощи фильтра контента jQuery), снимайте выделение через 10 с
//
//  Разработайте форму (на той же странице, на которой выводится массив заявок) для добавления
//  заявки.  По кнопке «Отмена» все поля формы очищаются, по кнопке «Добавить» создается новый
//  объект заявки на авиабилет, добавляется в массив объектов, выводится на страницу. Реализуйте
//  изменение и удаление записей коллекции в форме.
//
//  При создании массива проверить его наличие в локальном хранилище, если массива нет – записать
//  его в локальное хранилище, если массив есть в хранилище – прочитать данные в массив. После
//  изменения коллекции выполняйте запись в локальное хранилище.
//
//  На отдельной странице выведите гистограмму стоимостей билетов, гистограмму стройте на базе
//  блоков div по примеру в файлах 001_images\000_chart.html и BarChart.js из занятия 08.09.2022

// глобальная переменная модуля второго задания
var moduleTask2 = {};

// форма доавления заявки
moduleTask2.ticketForm = null;

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
    $('#ticketsListId').html(moduleTask2.viewTickets.reduce((acc, elem) => (acc += elem.toHTML()), ''));
};

// вывод массива билетов без упорядочивания
moduleTask2.showDefultTickets = function () {
    // установка исходного массива
    moduleTask2.viewTickets = [...moduleTask2.originTickets];

    // вывод массива билетов
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
// moduleTask2.selectColorElems = function (
//     comp = () => {},
//     resetColor = () => {},
//     period = moduleTask2.timeoutTimer,
//     color = 'rgba(143, 96, 219, 0.562)'
// ) {
//     // вывод массива для отчистки прошлых выделений
//     moduleTask2.showTickets();

//     // контейнер для вывода билетов
//     let elements = document.getElementsByName('ticket');

//     // выделение цветом клиента
//     for (let i = 0, k = 0; i < elements.length; i++) {
//         // текущий элемент разметки
//         const elem = elements[i];

//         // сравнение по компаратору
//         if (comp(k)) {
//             // выделение цветом
//             elem.style.backgroundColor = color;
//         }

//         k++;
//     }

//     // удаление текущего таймера
//     clearTimeout(moduleTask2.timer);

//     // запуск таймера для очистки выделения
//     moduleTask2.timer = setTimeout(resetColor, period);
// };

// выделение цветом билета
moduleTask2.selectColorElems = function (
    comp = () => {},
    resetColor = () => {},
    period = moduleTask2.timeoutTimer,
    color = 'rgba(143, 96, 219, 0.562)'
) {
    // вывод массива для отчистки прошлых выделений
    moduleTask2.showTickets();

    // контейнер для вывода билетов
    let elements = $('.ticket');

    // выделение цветом клиента
    for (let i = 0, k = 0; i < elements.length; i++) {
        // сравнение по компаратору
        if (comp(k)) {
            // выделение цветом
            elements[i].style.backgroundColor = color;
        }

        k++;
    }

    // удаление текущего таймера
    clearTimeout(moduleTask2.timer);

    // запуск таймера для очистки выделения
    moduleTask2.timer = setTimeout(resetColor, period);
};

// выделение цветом билета
moduleTask2.selectColorElemsQuery = function (
    query = '',
    resetColor = () => {},
    period = moduleTask2.timeoutTimer,
    color = 'rgba(143, 96, 219, 0.562)'
) {
    // вывод массива для отчистки прошлых выделений
    moduleTask2.showTickets();

    // подсветка элементов
    $(query).css('background-color', color);

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

    // вывод массива билетов
    moduleTask2.selectColorElems((i) => moduleTask2.viewTickets[i].ticketCost > cost, moduleTask2.showTickets);
};

// вывеление копии массива билетов с заданным пунктом назначения
moduleTask2.selectColorTicketPoint = function (value) {
    if (value === '') {
        moduleTask2.showTickets();
        return;
    }

    // вывод массива билетов
    moduleTask2.selectColorElemsQuery(`.ticket:contains("${value}")`, moduleTask2.showTickets);
};

// вывеление копии массива билетов с заданным номером рейса
moduleTask2.selectColorTicketFlightNumber = function (value) {
    if (value === '') {
        moduleTask2.showTickets();
        return;
    }

    // вывод массива билетов
    moduleTask2.selectColorElemsQuery(`.ticket:contains("${value}")`, moduleTask2.showTickets);
};

// удаление билета
moduleTask2.removeTicket = function (ticket = new Ticket()) {
    moduleTask2.originTickets.splice(
        moduleTask2.originTickets.findIndex((t) => t.id === ticket.id),
        1
    );
};

// сохранение данных в локальном хранилище
moduleTask2.saveToLocalStorage = function () {
    window.localStorage.ticketList = JSON.stringify(moduleTask2.originTickets);
};

// загрузка данных из локального хранилища
moduleTask2.loadFromLocalStorage = function () {
    // если данных в локальном хранилище нет
    if (!window.localStorage.ticketList) return false;

    // данные
    let data = JSON.parse(window.localStorage.ticketList);

    moduleTask2.originTickets = data.map((t) => Object.assign(new Ticket(), t));

    return true;
};

// обработка события клика по контейнеру
moduleTask2.ticketListEventHandler = function (e) {
    // элемент, на котором вызвано событие
    let target = e.target;

    // работник
    let idTicket = /\d+$/.exec(target.id);
    let ticket = moduleTask2.originTickets.find((t) => t.id == idTicket);

    switch (true) {
        // редактирование
        case target.id.startsWith('btnEdit'):
            // запуск формы в режиме редактирования
            moduleTask2.ticketForm.show(false, ticket);

            break;

        // удаление
        case target.id.startsWith('btnRemove'):
            // удлаение работника
            moduleTask2.removeTicket(ticket);

            // обновление вывода коллекции
            moduleTask2.showDefultTickets();

            break;

        // другое событие
        default:
            return;
    }

    // запись в локальное хранилище
    moduleTask2.saveToLocalStorage();
};

// получить список пунтков назнаяения
moduleTask2.getDestinationsList = function () {
    return [...new Set(moduleTask2.originTickets.map((t) => t.destination))];
};

// обработчик события загрузки страницы
$(function () {
    // загрузка данных из локального хранилища
    if (!moduleTask2.loadFromLocalStorage()) moduleTask2.saveToLocalStorage();

    // установка формы
    moduleTask2.ticketForm = new TicketForm(
        '#formContainerId',
        (ticket) => {
            // добавлени заявки в массив
            moduleTask2.originTickets.unshift(ticket);

            // вывод массива по умолчанию
            moduleTask2.showDefultTickets();

            // подсветка нового билета
            moduleTask2.selectColorElems((i) => i === 0, moduleTask2.showDefultTickets, 2_500);

            // запись в локальное хранилище
            moduleTask2.saveToLocalStorage();
        },
        () => {
            // обновление вывода коллекции
            moduleTask2.showDefultTickets();

            // запись в локальное хранилище
            moduleTask2.saveToLocalStorage();
        }
    );

    // вывод билетов
    moduleTask2.showDefultTickets();

    // установка обработчиков событий

    // По умолчанию
    $('#btnTicketsDefualt').click(moduleTask2.showDefultTickets);

    // По назначениям
    $('#btnTicketsSortByDestinations').click(moduleTask2.showTicketsByDestinations);

    // По стоимости
    $('#btnTicketsSortByCost').click(moduleTask2.showTicketsByTicketCost);

    // Поле для ввода стомиости
    $('#selectCostOverId').click(() => moduleTask2.selectColorTicketCostOver(+$('#inpCostOverId').val()));

    // добавление заявки
    $('#btnAddTicket').click(() => moduleTask2.ticketForm.show(true));

    // обработка события клика по контейнеру
    $('#ticketsListId').click(moduleTask2.ticketListEventHandler);

    // заполнение списка доступных для выбора пунктов назначения
    $('#pointListId').html(
        moduleTask2.getDestinationsList().reduce((acc, item) => (acc += `<option>${item}</option>`), '')
    );

    // выделение билетов с заданным пунктом назначения
    $('#selectTicketsWithPoint').click(() => moduleTask2.selectColorTicketPoint($('#pointListId').val()));

    // выделение билетов с заданным пунктом назначения
    $('#selectFilmsWithProducer').click(() => moduleTask2.selectColorTicketFlightNumber($('#inpflightNumberId').val()));
});

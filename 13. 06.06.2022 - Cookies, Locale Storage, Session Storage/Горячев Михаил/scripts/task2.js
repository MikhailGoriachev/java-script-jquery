//  Задача 2. Заявки

//  Задача 2. Каждая заявка на авиабилет содержит: пункт назначения, номер рейса, фамилию
//  и инициалы пассажира, стоимость билета. Разработайте класс для хранения заявки, создайте
//  массив заявок из 10 - 12 элементов. Выведите массив заявок в разметку, предусмотрите команды
//  (назначенные на экранные кнопки и клавиши):
//  •	Вывод исходного массива заявок
//  •	Вывод копии массива, упорядоченного по пунктам назначения;
//  •	Вывод копии массива, упорядочив по стоимости билета;
//  •	Вывод копии массива, упорядочив по номеру рейса
//  •	Вывод копии массива, выделив все заявки со стоимостью выше значения, вводимого из строки
//  ввода (не используйте формы), сни-майте выделение через 10 с
//  Разработайте форму (на той же странице, на которой выводится массив заявок) для добавления
//  заявки.  По кнопке «Отмена» все поля формы очищаются, по кнопке «Добавить» создается новый
//  объект заявки на авиабилет, добавляется в массив объектов, выводится на страницу. Реализуйте
//  изменение и удаление записей коллекции в форме.
//  При создании массива проверить его наличие в локальном хранилище, если массива нет – записать
//  его в локальное хранилище, если массив есть в хранилище – прочитать данные в массив. После
//  изменения коллекции выполняйте запись в локальное хранилище.

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

// удлаение билета
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

// обработчик события загрузки страницы
window.addEventListener('load', function () {
    // загрузка данных из локального хранилища
    if (!moduleTask2.loadFromLocalStorage()) moduleTask2.saveToLocalStorage();

    // установка формы
    moduleTask2.ticketForm = new TicketForm(
        'formContainerId',
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

    // добавление заявки
    $('btnAddTicket').addEventListener('click', () => moduleTask2.ticketForm.show(true), false);

    // обработка события клика по контейнеру
    $('ticketsListId').addEventListener('click', moduleTask2.ticketListEventHandler, false);
});

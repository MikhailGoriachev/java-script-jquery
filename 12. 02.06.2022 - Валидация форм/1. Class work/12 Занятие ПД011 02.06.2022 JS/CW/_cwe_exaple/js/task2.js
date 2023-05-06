/*
* Задача 2.
* Каждая заявка на авиабилет содержит: пункт назначения, номер рейса, фамилию
* и инициалы пассажира, стоимость билета. Разработайте класс для хранения
* заявки, создайте массив заявок из 10 - 12 элементов. Выведите массив заявок
* в разметку, предусмотрите команды:
*     • Вывод исходного массива заявок
*     • Вывод копии массива, упорядоченного по пунктам назначения;
*     • Вывод копии массива, упорядочив по стоимости билета;
*     • Вывод копии массива, упорядочив по номеру рейса
*     • Вывод копии массива, выделив все заявки со стоимостью
*       выше значения, вводимого из строки ввода (не используйте формы),
*       снять выделение через 10 с
* Разработайте форму (на той же странице, на которой выводится массив заявок)
* для добавления заявки.  По кнопке «Отмена» все поля формы очищаются, по
* кнопке «Добавить» создается новый объект заявки на авиабилет, добавляется
* в массив объектов, выводится на страницу.
*
* */

// Класс, представляющий заявку на авиабилет с полями:
//     фамилию и инициалы пассажира,
//     пункт назначения,
//     номер рейса,
//     стоимость билета
class Ticket  {
    constructor(fullName, destination, flight, cost) {
        this.fullName = fullName;
        this.destination = destination;
        this.flight = flight;
        this.cost = cost;
    } // constructor


    // переопределение метода Object
    toString() { return `
        <td>${this.fullName}</td>
        <td>${this.destination}</td>
        <td>${this.flight}</td>
        <td>${this.cost}</td>`;
    } // toString


    // формирование строки с данными объекта для вывода в разметку
    toTableRow(row) {return `
        <tr id="cln${row}">
        <td>${row}</td>
        <td class="align-left">${this.fullName}</td>
        <td class="align-left">${this.destination}</td>
        <td class="align-left">${this.flight}</td>
        <td class="align-right">${this.cost}</td>
        <td><input type="button" value="Изменить"> <input type="button" value="Удалить"> </td>
        </tr>`;
    } // toTableRow

    // для элемента массива формируем идентификатор, находим соответствующую строки таблицы
    // и меняем ее оформление, если на элементе массива сработает предикат
    toTableRowMark(row, predicate) {
        // можно работать с коллекцией классов CSS через свойство classList или напрямую
        // со свойствами стиля
        // predicate(this)?item.classList.add("selected-tr"):item.classList.remove("selected-tr");
        if (predicate(this))
            $("cln" + row).style.backgroundColor = "linen";
    } // toTableRowMark
} // class Ticket


// класс для работы с коллекцией заказов на авиабилеты
class Booking {
    constructor(title, tickets) {
        this.title = title;
        this.tickets = tickets;
    }

    // вывод название авиакомпании и коллекции заявок в разметку по кликам на кнопки
    show(header) {
        $("title").innerText = header;
        let row = 1;
        $("tickets").innerHTML = this.tickets.reduce((acc, t) => acc + t.toTableRow(row++), "");
    } // show

    // вывод коллекции заявок в разметку
    static show(header, tickets) {
        $("title").innerText = header;
        let row = 1;
        $("tickets").innerHTML = tickets.reduce((acc, t) => acc + t.toTableRow(row++), "");
    } // show

    // изменение стиля в строках таблицы, для которых сработает предикат
    static showMarked(title, booking, predicate, timeOut = 10_000) {
        // вывод без выделения - просто чистим вывод :)
        booking.show(title);

        let row = 1;
        booking.tickets.forEach(t => t.toTableRowMark(row++, predicate));

        // снятие выделения через 10_000 мс
        setTimeout(() => booking.show(title), timeOut);
    } // showMarked

    // сортировка копии массива заявок на авиабилеты по пунктам назначения
    orderByDestination() {
        return [...this.tickets].sort((t1, t2) => t1.destination.localeCompare(t2.destination));
    } // orderByDestination

    // сортировка копии массива заявок на авиабилеты упорядоченного по стоимости
    orderByCost() {
        return [...this.tickets].sort((t1, t2) => t1.cost - t2.cost);
    } // orderByCost

    // сортировка копии массива заявок на авиабилеты по номеру рейса
    orderByFlight() {
        return [...this.tickets].sort((t1, t2) => t1.flight.localeCompare(t2.flight));
    } // orderByFlight
} // class Booking


// настройка события загрузки страницы на слушателя этого события
window.addEventListener('load', handler, false);

// обработчик события загрузки страницы
function handler() {
    // массив заявок
    let tickets = [
        new Ticket('Иванова О.Л.',  'Симферополь', "SU 34",   2_200),
        new Ticket('Баранова Е.К.', 'Москва',      "S7 121",  2_300),
        new Ticket('Котова К.Л.',   'Петербург',   "U6 1330", 4_500),
        new Ticket('Хижняк П.В.',   'Москва',      "S7 121",  2_300),
        new Ticket('Хижняк В.Е.',   'Москва',      "S7 121",  2_300),
        new Ticket('Кобелев А.Р.',  'Адлер',       "U6 1200", 3_400),
        new Ticket('Яворский Р.Д.', 'Адлер',       "U6 1200", 3_400),
        new Ticket('Гревцова С.И.', 'Мелитополь',  "SU 42",   2_000),
        new Ticket('Кобелев А.С.',  'Мелитополь',  "SU 42",   2_000),
        new Ticket('Дивак С.С.',    'Херсон',      "S7 566",  2_100),
        new Ticket('Брегеда Н.А.',  'Москва',      "S7 121",  2_300),
        new Ticket('Цыбенко Е.А.',  'Адлер',       "U6 1200", 3_400),
    ];

    // формирование массива заявок
    let booking = new Booking('Восторг-Авиа', tickets);

    // Начальный вывод данных о заявках на авиабилеты
    booking.show(`Заявки на авиабилеты авиакомпании "${booking.title}"`);

    // Вывод заявок на авиабилеты без изменения
    $("btnSrcData").addEventListener('click',
        () => booking.show(`Заявки на авиабилеты авиакомпании "${booking.title}"`),
    false);

    // Вывод копии массива заявок на авиабилеты с упорядочиванием по пунктам назначения
    $("btnOrderByDestination").addEventListener('click', () => Booking.show(
        `Заявки на авиабилеты авиакомпании "${booking.title}", по пунктам назначения`,
        booking.orderByDestination()
    ), false);

    // Вывод копии массива заявок на авиабилеты с упорядочиванием по стоимости
    $("btnOrderByCost").addEventListener('click', () => Booking.show(
        `Заявки на авиабилеты авиакомпании "${booking.title}", по стоимости`,
        booking.orderByCost()
    ), false);


    // Вывод копии массива заявок на авиабилеты с упорядочиванием по номеру рейса
    $("btnOrderByFlight").addEventListener('click', () => Booking.show(
        `Заявки на авиабилеты авиакомпании "${booking.title}", по номеру рейса`,
        booking.orderByFlight()
    ), false);

    // Вывод заявок на авиабилеты с выделением заявок, дороже 3000 руб.
    $("btnSelectTickets").addEventListener("click", () => {
        let cost = $("boundCost").value;
        Booking.showMarked(
            `Выделены заявки на билеты авиакомпании "${booking.title}", стоимость заявок > ${cost}`,
            booking, t => t.cost >= cost
        );
    }, false);

} // handler
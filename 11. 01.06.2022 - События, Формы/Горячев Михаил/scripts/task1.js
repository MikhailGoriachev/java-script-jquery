<<<<<<< HEAD
//  Задача 1. Заявки

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
var moduleTask1 = {};

// размер массива
moduleTask1.size = 10;

// исходная коллекция билетов
moduleTask1.originTickets = Array(moduleTask1.size)
    .fill()
    .map((elem) => Ticket.getTicketGenerator());

// массив представления билетов
moduleTask1.viewTickets = [...moduleTask1.originTickets];

// таймер
moduleTask1.timer = null;

// длительность работы таймера
moduleTask1.timeoutTimer = 10_000;

// вывод массива билетов
moduleTask1.showTickets = function () {
    $('ticketsList').innerHTML = moduleTask1.viewTickets.reduce((acc, elem) => (acc += elem.toHTML()), '');
};

// вывод массива клиентов без упорядочивания
moduleTask1.showDefultTickets = function () {
    // установка исходного массива
    moduleTask1.viewTickets = [...moduleTask1.originTickets];

    // вывод массива клиентов
    moduleTask1.showTickets();
};

// вывод копии массива билетов упорядоченных по пануктам назначения
moduleTask1.showTicketsByDestinations = function () {
    // упорядочивание массива
    moduleTask1.viewTickets.sort((a, b) => a.destination.localeCompare(b.destination));

    // вывод массива
    moduleTask1.showTickets();
};

// вывод копии массива билетов упорядоченных по стоимости билета
moduleTask1.showTicketsByTicketCost = function () {
    // упорядочивание массива
    moduleTask1.viewTickets.sort((a, b) => a.ticketCost - b.ticketCost);

    // вывод массива
    moduleTask1.showTickets();
};

// выделение цветом билета
moduleTask1.selectColorElems = function (
    containerId = '',
    comp = () => {},
    resetColor = () => {},
    color = 'rgba(143, 96, 219, 0.562)'
) {
    // вывод массива для отчистки прошлых выделений
    moduleTask1.showTickets();

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
    clearTimeout(moduleTask1.timer);

    // запуск таймера для очистки выделения
    moduleTask1.timer = setTimeout(resetColor, 10000);
};

// вывеление копии массива билетов со стоимостью выше указанного значения
moduleTask1.selectColorTicketCostOver = function (cost) {
    if (cost === 0) {
        moduleTask1.showTickets();
        return;
    }

    // вывод массива клиентов
    moduleTask1.selectColorElems(
        'ticketsList',
        (i) => moduleTask1.viewTickets[i].ticketCost > cost,
        moduleTask1.showTickets
    );
};

// обработчик события загрузки страницы
window.onload = function () {
    // вывод билетов
    moduleTask1.showDefultTickets();

    // установка обработчиков событий

    // По умолчанию
    $('btnTicketsDefualt').addEventListener('click', moduleTask1.showDefultTickets, false);

    // По назначениям
    $('btnTicketsSortByDestinations').addEventListener('click', moduleTask1.showTicketsByDestinations, false);

    // По стоимости
    $('btnTicketsSortByCost').addEventListener('click', moduleTask1.showTicketsByTicketCost, false);

    // Поле для ввода стомиости
    $('inpCostOverId').addEventListener(
        'input',
        () => moduleTask1.selectColorTicketCostOver(+$('inpCostOverId').value),
        false
    );

    // Обработка нажатия кнопки при вводе стоимости
    $('inpCostOverId').addEventListener('keypress', filterInputForNumber, false);
=======
//  Задача 1. Строки

//  Задача 1. Решите задачи на обработку строк при помощи методов регу-лярных выражений, строки
//  задавайте присваиванием:
//  •	Даны строки S и S0. Удалить из строки S последнюю подстроку, сов-падающую с S0. Если
//      совпадающих подстрок нет, то вывести строку S без изменений
//  •	Даны строки S, S1 и S2. Заменить в строке S все вхождения строки S1 на строку S2
//  •	Дана строка S, слова в которой разделяются одним пробелом. Найти количество слов,
//      начинающихся на гласную букву, без учета регистра, вывести найденные слова
//  •	Дана строка, состоящая из слов, разделенных одним пробелом. Сформировать строку,
//      состоящую из этих же слов в порядке, обрат-ном алфавитному. Вывести исходную и
//      преобразованную строки
//  •	Дана строка, состоящая из слов, разделенных одним пробелом. Сформировать строку,
//      состоящую из этих же слов, размещенных в обратном порядке. Вывести исходную и
//      преобразованную строки

// глобальная переменная модуля первого задания
var moduleTask1 = {};

//  •	Даны строки S и S0. Удалить из строки S последнюю подстроку, сов-падающую с S0. Если
//      совпадающих подстрок нет, то вывести строку S без изменений
moduleTask1.point1 = function (str, str0) {
    // удаление подстроки
    return str.replace(new RegExp(`${str0}$`), '');
};

//  •	Даны строки S, S1 и S2. Заменить в строке S все вхождения строки S1 на строку S2
moduleTask1.point2 = function (str = '', str0 = '', str1 = '') {
    return str.replace(new RegExp(str0, 'g'), str1);
};

//  •	Дана строка S, слова в которой разделяются одним пробелом. Найти количество слов,
//      начинающихся на гласную букву, без учета регистра, вывести найденные слова
moduleTask1.point3 = function (str = '') {
    // результирующий объект
    let result = {
        count: 0,
        words: [],
        toString() {
            return `Слова: ${this.words}; Количество: ${this.count}`;
        },
    };

    // результат текущего поиска
    let word;

    // регулярное выражение для поиска
    let exp = /\s[eyuoaуёеыаоэяию][а-я]*/gi;

    // поиск слов
    while ((word = exp.exec(str)) != null) {
        result.count++;
        result.words.push(word);
    }

    return result;
};

//  •	Дана строка, состоящая из слов, разделенных одним пробелом. Сформировать строку,
//      состоящую из этих же слов в порядке, обрат-ном алфавитному. Вывести исходную и
//      преобразованную строки
moduleTask1.point4 = function (str = '') {
    return str
        .split(/ /)
        .sort((a, b) => b.localeCompare(a))
        .join(' ');
};

//  •	Дана строка, состоящая из слов, разделенных одним пробелом. Сформировать строку,
//      состоящую из этих же слов, размещенных в обратном порядке. Вывести исходную и
//      преобразованную строки
moduleTask1.point5 = function (str = '') {
    return str.split(/ /).reverse().join(' ');
};

// обработка по заданию
moduleTask1.run = function () {
    // строки для обработки
    let str = 'Милости прошу к нашему шалашу в Анапе я пирогов покрошу и откушать попрошу';

    // подстроки
    let str1 = '',
        str2 = '';

    //  •	Даны строки S и S0. Удалить из строки S последнюю подстроку, сов-падающую с S0. Если
    //      совпадающих подстрок нет, то вывести строку S без изменений
    str1 = 'прошу';

    moduleTask1.pointRunAndShow(
        `Удалить из строки S последнюю подстроку, совпадающую с S<small>0</small><br>S0 = ${str1}`,
        moduleTask1.point1,
        str,
        str1
    );

    //  •	Даны строки S, S1 и S2. Заменить в строке S все вхождения строки S1 на строку S2
    str1 = 'прошу';
    str2 = '>ВСТАВКА<';

    moduleTask1.pointRunAndShow(
        `Заменить в строке S все вхождения строки S<small>1</small> на строку S<small>2</small>
        <br>S<small>1</small> = ${str1}, S<small>2</small> = ${str2}`,
        moduleTask1.point2,
        str,
        str1,
        str2
    );

    //  •	Дана строка S, слова в которой разделяются одним пробелом. Найти количество слов,
    //      начинающихся на гласную букву, без учета регистра, вывести найденные слова
    moduleTask1.pointRunAndShow(
        `Найти количество слов, начинающихся на гласную букву, без учета регистра, вывести найденные слова`,
        moduleTask1.point3,
        str
    );

    //  •	Дана строка, состоящая из слов, разделенных одним пробелом. Сформировать строку,
    //      состоящую из этих же слов в порядке, обратном алфавитному. Вывести исходную и
    //      преобразованную строки
    moduleTask1.pointRunAndShow(
        `Сформировать строку, состоящую из этих же слов в порядке, обратном алфавитному`,
        moduleTask1.point4,
        str
    );

    //  •	Дана строка, состоящая из слов, разделенных одним пробелом. Сформировать строку,
    //      состоящую из этих же слов, размещенных в обратном порядке. Вывести исходную и
    //      преобразованную строки
    moduleTask1.pointRunAndShow(
        `Сформировать строку, состоящую из этих же слов, размещенных в обратном порядке`,
        moduleTask1.point5,
        str
    );
};

// вывод строки и задания
moduleTask1.showPoint = function (title = 'Исходная строка', str = '', stringResult = '') {
    // $('title').innerHtml = title;
    $('title').innerHTML = title;
    $('sourceString').innerHTML = str;
    $('resultString').innerHTML = stringResult;
};

// запуск и вывод пункта по заданию
moduleTask1.pointRunAndShow = function (title = '', point = () => {}, str = '', str1 = '', str2 = '') {
    // выполнение задания
    let result = point(str, str1, str2);

    // вывод данных
    moduleTask1.showPoint(title, str, result);
};

// установка обработчика события загрузки страницы
window.onload = function () {
    // строки для обработки
    let str = 'Милости прошу к нашему шалашу в Анапе я пирогов покрошу и откушать попрошу';

    // подстроки
    let str1 = '',
        str2 = '';

    //  •	Даны строки S и S0. Удалить из строки S последнюю подстроку, сов-падающую с S0. Если
    //      совпадающих подстрок нет, то вывести строку S без изменений
    str1 = 'прошу';

    // установка обработчика события на кнопку
    $('btnPoint1').onclick = () =>
        moduleTask1.pointRunAndShow(
            `Пункт 1. Удалить из строки S последнюю подстроку, совпадающую с S<small>0</small><br>S0 = ${str1}`,
            moduleTask1.point1,
            str,
            str1
        );

    //  •	Даны строки S, S1 и S2. Заменить в строке S все вхождения строки S1 на строку S2
    str1 = 'прошу';
    str2 = '>ВСТАВКА<';

    // установка обработчика события на кнопку
    $('btnPoint2').onclick = () =>
        moduleTask1.pointRunAndShow(
            `Пункт 2. Заменить в строке S все вхождения строки S<small>1</small> на строку S<small>2</small>
            <br>S<small>1</small> = ${str1}, S<small>2</small> = ${str2}`,
            moduleTask1.point2,
            str,
            str1,
            str2
        );

    //  •	Дана строка S, слова в которой разделяются одним пробелом. Найти количество слов,
    //      начинающихся на гласную букву, без учета регистра, вывести найденные слова

    // установка обработчика события на кнопку
    $('btnPoint3').onclick = () =>
        moduleTask1.pointRunAndShow(
            `Пункт 3. Найти количество слов, начинающихся на гласную букву, без учета регистра, вывести найденные слова`,
            moduleTask1.point3,
            str
        );

    //  •	Дана строка, состоящая из слов, разделенных одним пробелом. Сформировать строку,
    //      состоящую из этих же слов в порядке, обратном алфавитному. Вывести исходную и
    //      преобразованную строки

    // установка обработчика события на кнопку
    $('btnPoint4').onclick = () =>
        moduleTask1.pointRunAndShow(
            `Пункт 4. Сформировать строку, состоящую из этих же слов в порядке, обратном алфавитному`,
            moduleTask1.point4,
            str
        );

    //  •	Дана строка, состоящая из слов, разделенных одним пробелом. Сформировать строку,
    //      состоящую из этих же слов, размещенных в обратном порядке. Вывести исходную и
    //      преобразованную строки

    // установка обработчика события на кнопку
    $('btnPoint5').onclick = () =>
        moduleTask1.pointRunAndShow(
            `Пункт 5. Сформировать строку, состоящую из этих же слов, размещенных в обратном порядке`,
            moduleTask1.point5,
            str
        );

    // установка обработки первой кнопки, по умолчнанию при загрузке страцниы
    $('btnPoint1').onclick();
>>>>>>> remotes/origin/main
};

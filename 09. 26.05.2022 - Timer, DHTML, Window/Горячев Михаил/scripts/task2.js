//  Задача 2. Ремонт

//  Задача 2. Спроектировать иерархию классов для предприятия ремонта бытовой техники.
//  Создайте массивы объектов и выполните обработку по заданию. Базовый класс – персона
//  (фамилия и инициалы, дата рождения, город проживания), производный от базового
//  класс – клиент (дата обращения за услугой, название услуги, стоимость услуги),
//  производный от базового класс – мастер (тарифная ставка, дата начала работы, признак
//  занятости ремонтом). Переопределите методы toString(), equals() для клиента и мастера.
//
//  Создайте массивы клиентов и мастеров (не менее 12 элементов), выводите эти массивы в
//  разметку в порядке инициализации. По кликам по кнопкам упорядочивайте клиентов при выводе
//  по алфавиту, мастеров – по тарифной ставке (порядок в исходном массиве не менять). Также
//  предусмотрите кнопки для вывода массивов без упорядочивания. По кликам на кнопки выделяйте
//  клиента/клиентов из города Иловайск, мастера/мастеров с максимальным тарифом. Через 10 с
//  после выполнения команды выводите массивы в исходном порядке, без выделения.

// глобальная переменная модуля второго задания
var moduleTask2 = {};

// объект мастерской
moduleTask2.repairShop = new RepairShop(
    'Элит',
    'г.Донецк, ул.Промышленная, д.1',
    getClientArray(12),
    getArtisanArray(12)
);

// массив представления клинетов
moduleTask2.viewClients = [...moduleTask2.repairShop.clients];

// массив представления мастеров
moduleTask2.viewArtisans = [...moduleTask2.repairShop.artisans];

// таймер
moduleTask2.timer = null;

// длительность работы таймера
moduleTask2.timeoutTimer = 10_000;

// вывод массива клиентов
moduleTask2.showClients = function () {
    $('clientsList').innerHTML = moduleTask2.viewClients.reduce((acc, elem) => (acc += elem.toHTML()), '');
};

// вывод массива мастеров
moduleTask2.showArtisans = function () {
    $('artisansList').innerHTML = moduleTask2.viewArtisans.reduce((acc, elem) => (acc += elem.toHTML()), '');
};

// вывод массива клиентов без упорядочивания
moduleTask2.showDefultClients = function () {
    // установка исходного массива
    moduleTask2.viewClients = [...moduleTask2.repairShop.clients];

    // вывод массива клиентов
    moduleTask2.showClients();
};

// вывод массива мастеров без упорядочивания
moduleTask2.showDefultArtisans = function () {
    // установка исходного массива
    moduleTask2.viewArtisans = [...moduleTask2.repairShop.artisans];

    // вывод массива клиентов
    moduleTask2.showArtisans();
};

// вывод массива клиентов по алфавиту
moduleTask2.showClientsByAlphabet = function () {
    // упорядочивание массива по алфавиту
    // moduleTask2.viewClients = moduleTask2.viewClients.sort((a, b) => a.fullName < b.fullName);
    moduleTask2.viewClients.sort();

    // вывод массива клиентов
    moduleTask2.showClients();
};

// вывод массива мастеров по тарифу
moduleTask2.showArtisansByTariff = function () {
    // упорядочивание массива по тарифу
    // moduleTask2.viewClients = moduleTask2.viewArtisans.sort((a, b) => a.tariff - b.tariff);
    moduleTask2.viewArtisans.sort((a, b) => a.tariff - b.tariff);

    // вывод массива мастеров
    moduleTask2.showArtisans();
};

// выделение цветом клиента
moduleTask2.selectColorElems = function (
    containerId = '',
    comp = () => {},
    resetColor = () => {},
    color = 'rgba(143, 96, 219, 0.562)'
) {
    // вывод массива для отчистки прошлых выделений
    moduleTask2.showClients();

    // контейнер для вывода клиентов
    let containerElems = $(containerId).childNodes;

    // выделение цветом клиента
    for (let i = 0, k = 0; i < containerElems.length; i++) {
        // текущий элемент разметки
        const elem = containerElems[i];

        // проверка типа элемента
        if (elem.nodeType != 1) {
            continue;
        }

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

// вывеление массива клиентов по городу Иловайску
moduleTask2.selectColorClientsByCity = function () {
    // вывод массива клиентов
    moduleTask2.selectColorElems(
        'clientsList',
        (i) => moduleTask2.viewClients[i].city === 'Иловайск',
        moduleTask2.showClients
    );
};

// вывеление массива мастеров с максимальным тарифом
moduleTask2.selectColorArtisansByMaxTariff = function () {
    // максимальный тариф
    let maxTariff = Math.max(...moduleTask2.viewArtisans.map((elem) => elem.tariff));

    // подсветка мастеров
    moduleTask2.selectColorElems(
        'artisansList',
        (i) => moduleTask2.viewArtisans[i].tariff === maxTariff,
        moduleTask2.showArtisans
    );
};

// обработчик события загрузки страницы
window.onload = function () {
    // вывод клиентов
    moduleTask2.showDefultClients();

    // вывод мастеров
    moduleTask2.showDefultArtisans();

    // установка обработчиков на кнопки

    // Клиенты

    // По умолчанию
    $('btnClientDefualt').onclick = moduleTask2.showDefultClients;

    // По алфавиту
    $('btnClientSortByAlphabet').onclick = moduleTask2.showClientsByAlphabet;

    // Выделить клиентов: город Иловайск
    $('btnSelectByCity').onclick = moduleTask2.selectColorClientsByCity;

    // Мастера

    // По умолчанию
    $('btnArtisanDefualt').onclick = moduleTask2.showDefultArtisans;

    // По тарифной ставке
    $('btnArtisanSortByTariff').onclick = moduleTask2.showArtisansByTariff;

    // По возрастанию площадей
    $('btnSelectByMaxTariff').onclick = moduleTask2.selectColorArtisansByMaxTariff;
};

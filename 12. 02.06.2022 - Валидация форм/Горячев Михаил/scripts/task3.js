//  Задача 3. Работники

//  Создать массив объектов класса Worker. В массиве должно быть не менее 10 экземпляров. В объекте Worker должны быть
//  следующие поля:
//  •	идентификатор работника
//  •	фамилия и инициалы работника;
//  •	название занимаемой должности;
//  •	пол (мужской или женский, другие варианты не требуются);
//  •	год поступления на работу;
//  •	имя файла с фотографией работника (графические файлы, рекомендуемые имена файлов: man_001.jpg, woman_001.jpg,
//      подготовьте файлы заранее, добавлять файлы в приложении не надо);
//  •	величина оклада работника;
//  •	метод вычисления стажа работника для текущей даты.
//
//  Выполнить для массива работников (объектов Worker) при помощи кликов по экранным кнопкам или по выбранным клавишам
//  следующие обработки (после 15 секунд выводить массив в исходном состоянии):
//  •	вывод массива с упорядочиванием фамилий по алфавиту;
//  •	вывод массива с выделением работников с окладами, равными мини-мальному, упорядочивание по алфавиту;
//  •	вывод массива с выделением работников с окладами, равными макси-мальному, упорядочивание по должностям;
//  •	вывод массива с выделением работников с превышением заданного в строке ввода стажа работы, упорядочивать массив
//      по окладу.
//
//  Разработайте форму (на той же странице, на которой выводится массив работников) для добавления работника, должность
//  работника выбирайте из выпадающего списка, предусмотрите валидацию для года поступления на работу (от 2002 года и
//  позднее), оклада (от 10000 до 300000), фамилия и инициалы – поле обязательное для заполнения (т.е. поле не должно
//  быть пустым).  Имя файла с фотографией генерируйте случайным образом. По кнопке «Отмена» все поля формы очищаются,
//  по кнопке «Добавить» создается новый объект Worker, добавляется в массив объектов, выводится на страницу.
//
//  Требуется удалять работника из массива. Для этого в каждой строке таблицы (или в каждой карточке) предусмотрите
//  кнопку «Удалить».
//
//  Редактирование работника должно выполняться в этой же форме, вызов редактирования – кнопка «Изменить» в строке
//  таблицы или в карточке.

// глобальная переменная модуля второго задания
var moduleTask3 = {};

// форма добавления/изменения работника
moduleTask3.formWorker = null;

// размер массива
moduleTask3.size = 10;

// исходная коллекция
moduleTask3.originWorkers = Array(moduleTask3.size)
    .fill()
    .map((elem) => Worker.getWorkerGenerator());

// массив представления
moduleTask3.viewWorkers = [...moduleTask3.originWorkers];

// таймер
moduleTask3.timer = null;

// длительность работы таймера
moduleTask3.timeoutTimer = 15_000;

// вывод массива
moduleTask3.showWorkers = function () {
    $('workerListId').innerHTML = moduleTask3.viewWorkers.reduce((acc, elem) => (acc += elem.toHTML()), '');
};

// вывод массива с таймером, по которому будет выведет исходный массив
moduleTask3.showWorkersWithTimer = function () {
    // вывод колллекции
    moduleTask3.showWorkers();

    // запуск таймера
    moduleTask3.timer = setTimeout(moduleTask3.showDefultWorkers, moduleTask3.timeoutTimer);
};

// вывод массива без упорядочивания
moduleTask3.showDefultWorkers = function () {
    // установка исходного массива
    moduleTask3.viewWorkers = [...moduleTask3.originWorkers];

    // вывод массива
    moduleTask3.showWorkers();
};

// вывод массива с упорядочиванием фамилий по алфавиту;
moduleTask3.showWorkersByFullName = function () {
    // упорядочивание массива
    moduleTask3.viewWorkers.sort((a, b) =>
        a.fullName.match(/^[А-ЯA-Z][а-яa-z]{0,} /).input.localeCompare(b.fullName.match(/^[А-ЯA-Z][а-яa-z]{0,} /).input)
    );

    // вывод массива
    moduleTask3.showWorkersWithTimer();
};

// вывод массива с выделением работников с окладами, равными минимальному,
// упорядочивание по алфавиту;
moduleTask3.showWorkersByFullNameMinSalary = function () {
    // упорядочивание массива
    moduleTask3.viewWorkers.sort((a, b) =>
        a.fullName.match(/^[А-ЯA-Z][а-яa-z]{0,} /).input.localeCompare(b.fullName.match(/^[А-ЯA-Z][а-яa-z]{0,} /).input)
    );

    // минимальный оклад
    let salary = Math.min(...moduleTask3.viewWorkers.map((w) => w.salary));

    // вывод массива
    moduleTask3.selectColorElems((i) => moduleTask3.viewWorkers[i].salary === salary, moduleTask3.showDefultWorkers);
};

// вывод массива с выделением работников с окладами, равными максимальному,
// упорядочивание по должностям;
moduleTask3.showWorkersByPositionMaxSalary = function () {
    // упорядочивание массива
    moduleTask3.viewWorkers.sort((a, b) => a.position.localeCompare(b.position));

    // минимальный оклад
    let salary = Math.max(...moduleTask3.viewWorkers.map((w) => w.salary));

    // вывод массива
    moduleTask3.selectColorElems((i) => moduleTask3.viewWorkers[i].salary === salary, moduleTask3.showDefultWorkers);
};

// вывод массива с выделением работников с превышением заданного в строке ввода
// стажа работы, упорядочивать массив по окладу.
moduleTask3.showWorkersByExperienceOver = function (experience) {
    // упорядочивание массива
    moduleTask3.viewWorkers.sort((a, b) => a.salary - b.salary);

    if (experience === 0) {
        moduleTask3.showWorkers();
        return;
    }

    // вывод массива клиентов
    moduleTask3.selectColorElems(
        (i) => moduleTask3.viewWorkers[i].getExperience() > experience,
        moduleTask3.showDefultWorkers
    );
};

// выделение цветом элементов
moduleTask3.selectColorElems = function (
    comp = () => {},
    resetColor = () => {},
    period = moduleTask3.timeoutTimer,
    color = 'rgba(143, 96, 219, 0.562)'
) {
    // вывод массива для отчистки прошлых выделений
    moduleTask3.showWorkers();

    // контейнер для вывода клиентов
    let elements = document.getElementsByName('worker');

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
    clearTimeout(moduleTask3.timer);

    // запуск таймера для очистки выделения
    moduleTask3.timer = setTimeout(resetColor, period);
};

// удлаение работника
moduleTask3.removeWorker = function (worker = new Worker()) {
    moduleTask3.originWorkers.splice(
        moduleTask3.originWorkers.findIndex((w) => w.id === worker.id),
        1
    );
};

// обработка события клика по контейнеру
moduleTask3.workerListEventHandler = function (e) {
    // элемент, на котором вызвано событие
    let target = e.target;

    // let reg = /_\d+/;

    // работник
    let idWorker = /\d+$/.exec(target.id);
    let worker = moduleTask3.originWorkers.find((w) => w.id == idWorker);

    switch (true) {
        // редактирование
        case target.id.startsWith('btnEdit'):
            // запуск формы в режиме редактирования
            moduleTask3.formWorker.show(false, worker);

            break;

        // удаление
        case target.id.startsWith('btnRemove'):
            // удлаение работника
            moduleTask3.removeWorker(worker);

            // обновление вывода коллекции
            moduleTask3.showDefultWorkers();

            break;

        // другое событие
        default:
            return;
    }
};

// обработчик события загрузки страницы
window.onload = function () {
    // установка формы
    moduleTask3.formWorker = new WorkerForm(
        'formContainerId',
        (worker) => {
            // добавлени работника в массив
            moduleTask3.originWorkers.unshift(worker);

            // вывод массива по умолчанию
            moduleTask3.showDefultWorkers();

            // подсветка нового билета
            moduleTask3.selectColorElems((i) => i === 0, moduleTask3.showDefultWorkers, 2_500);
        },
        () => {
            // обновление вывода коллекции
            moduleTask3.showDefultWorkers();
        }
    );

    // вывод билетов
    moduleTask3.showDefultWorkers();

    // установка обработчиков событий

    // По умолчанию
    $('btnDefultWorkers').addEventListener('click', moduleTask3.showDefultWorkers, false);

    // вывод массива с упорядочиванием фамилий по алфавиту;
    $('btnWorkersByFullName').addEventListener('click', moduleTask3.showWorkersByFullName, false);

    // вывод массива с выделением работников с окладами, равными минимальному, упорядочивание
    // по алфавиту;
    $('btnWorkersByFullNameMinSalary').addEventListener('click', moduleTask3.showWorkersByFullNameMinSalary, false);

    // вывод массива с выделением работников с окладами, равными максимальному, упорядочивание
    // по должностям;
    $('btnWorkersByPositionMaxSalary').addEventListener('click', moduleTask3.showWorkersByPositionMaxSalary, false);

    // вывод массива с выделением работников с превышением заданного в строке ввода стажа работы,
    // упорядочивать массив по окладу.
    $('btnExperienceOverId').addEventListener(
        'click',
        () => moduleTask3.showWorkersByExperienceOver(+$('inpExperienceOverId').value),
        false
    );

    // вывод массива с выделением работников с окладами, равными максимальному, упорядочивание
    // по должностям;
    $('btnWorkerAdd').addEventListener('click', () => moduleTask3.formWorker.show(true), false);

    // обработка события клика по контейнеру
    $('workerListId').addEventListener('click', moduleTask3.workerListEventHandler, false);
};

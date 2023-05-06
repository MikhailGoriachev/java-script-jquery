//  Задача 1. Студенты

//  Задача 1. Описать класс Student, содержащий поля:
//  •	фамилия и инициалы;
//  •	пол студента;
//  •	фотография студента (заранее подготовленные файлы, с именами man001, woman001 и т.д.
//      Имя файла генерируется в зависимости от пола студента);
//  •	название группы;
//  •	успеваемость (массив из пяти элементов типа Mark)
//  •	Mark – класс: название предмета, оценка
//  Реализуйте действия с коллекцией объектов класса Student, сохранять коллекцию в локальном
//  хранилище. В форме используйте выпадающие списки для выбора предмета, группы. Контент для
//  выпадающих списков формируйте в коде, методам вставки элементов DOM:
//  •	заполнение данными (сгенерированными) массива из десяти элементов
//  •	вывод массива студентов в исходном порядке
//  •	добавление и редактирование студента в форме
//  •	удаление студента
//  •	выделение студентов, имеющих хотя бы одну оценку 2 (средствами jQuery, не менять модель),
//      при помощи методов работы с элементами DOM выделить (фоном, цветом и т.п.) саму оценку и
///     предмет
//  •	выделение студентов, имеющих оценки 4 и 5 (средствами jQuery, не менять модель)
//  •	выделение студентов заданной группы (средствами jQuery, не менять модель), при помощи
//      методов работы с элементами DOM выделить (фоном, цветом и т.п.) название группы
//  •	упорядочивание копии массива студентов по возрастанию среднего балла (работаем с моделью)
//  •	упорядочивание копии массива студентов по фамилиям и инициалам (работаем с моделью)
//  •	упорядочивание копии массива студентов по названию группы (работаем с моделью)

// модуль первого задания
var moduleTask1 = {};

// начальный размер массива
moduleTask1.initStudentsLenght = 10;

// таймер
moduleTask1.timer = null;

// длительность таймера
moduleTask1.durationTimer = 7_000;

// массив студентов
moduleTask1.originStudentList = [];

// форма для создания/редактирования студента
moduleTask1.form = null;

// сохраниение данных в локальное хранилище
moduleTask1.saveData = function () {
    window.localStorage.setItem('originStudentList', JSON.stringify(moduleTask1.originStudentList));
};

// загрузка данных из локального хранилища
moduleTask1.loadData = function () {
    // если данных нет в локальном хранилище
    if (!window.localStorage.originStudentList) {
        return false;
    }

    // загрузка данных
    moduleTask1.originStudentList = JSON.parse(window.localStorage.originStudentList).map((s) =>
        new Student().assign(s)
    );

    return true;
};

// генерация коллекции студентов
moduleTask1.generateStudents = function (length = moduleTask1.initStudentsLenght) {
    return Array(length)
        .fill()
        .map(() => Student.generateStudent());
};

// вывод коллекции студентов
moduleTask1.showStudents = function (students) {
    $('#studentList').empty();
    students.forEach((s) => s.showToHTML('#studentList'));
};

// добавление студента
moduleTask1.addStudent = function () {
    moduleTask1.form.show();
};

// редактирование студента
moduleTask1.editStudent = function (e) {
    if (!e.target || !e.target.id.startsWith('btnEdit')) return;

    let id = +/\d+$/.exec(e.target.id);

    // получение текущего выбранного студента
    moduleTask1.form.show(
        false,
        moduleTask1.originStudentList.find((s) => s.id === id)
    );
};

// удаление студента
moduleTask1.removeStudent = function (e) {
    if (!e.target || !e.target.id.startsWith('btnRemove')) return;

    let id = +/\d+$/.exec(e.target.id);

    // получение текущего выбранного студента
    moduleTask1.originStudentList.splice(
        moduleTask1.originStudentList.findIndex((s) => s.id === id),
        1
    );

    // сохранение данных
    moduleTask1.saveData();

    // вывод коллекции
    moduleTask1.showOriginStudents();
};

// выделение студентов по предикату
// moduleTask1.selectStudents = function (predicate = () => {}) {};

// снятие выделения
moduleTask1.clearSelectColor = function () {
    // $('.student-tile').css({ 'background-color': '#e8e8e8' });
    moduleTask1.showOriginStudents();
};

// снятие выделения по истечению таймера
moduleTask1.clearSelectColorTimer = function () {
    // удаление текущего таймера
    clearTimeout(moduleTask1.timer);

    // установка таймера
    moduleTask1.timer = setTimeout(moduleTask1.clearSelectColor, moduleTask1.durationTimer);
};

// выделение студентов цветом по запросы
moduleTask1.selectColor = function (query, isColorField = true) {
    // снятие текущего выделения
    moduleTask1.clearSelectColor();

    // выделение
    if (isColorField)
        $(query).css('color', 'blue').parents('.student-tile').css('background-color', 'rgb(217, 255, 168)');
    else $(query).parents('.student-tile').css('background-color', 'rgb(217, 255, 168)');

    // снятие выделения по истечыению таймера
    moduleTask1.clearSelectColorTimer();
};

// выделение студентов, имеющих хотя бы одну оценку 2 (средствами jQuery, не менять модель)
moduleTask1.selectStudentsWithMark2 = function () {
    moduleTask1.selectColor('.studentMarkList :contains("2")');
};

// выделение студентов, имеющих оценки 4 и 5 (средствами jQuery, не менять модель)
moduleTask1.selectStudentsWithMark4And5 = function () {
    moduleTask1.selectColor('.student-tile :has(.studentMarkList:contains("5"):contains("4"))', false);
};

// выделение студентов заданной группы (средствами jQuery, не менять модель)
moduleTask1.selectStudentsByGroup = function (group) {
    moduleTask1.selectColor(`.studentGroup:contains("${group}")`);
};

// вывод массива студентов в исходном порядке
moduleTask1.showOriginStudents = function () {
    moduleTask1.showStudents(moduleTask1.originStudentList);
};

// упорядочивание копии массива студентов по возрастанию среднего балла (работаем с моделью)
moduleTask1.sortStudentsByAverageMark = function () {
    moduleTask1.showStudents(moduleTask1.originStudentList.slice().sort((a, b) => a.avgMark - b.avgMark));
};

// упорядочивание копии массива студентов по фамилиям и инициалам (работаем с моделью)
moduleTask1.sortStudentsByFullName = function () {
    moduleTask1.showStudents(
        moduleTask1.originStudentList.slice().sort((a, b) => a.fullName.localeCompare(b.fullName))
    );
};

// упорядочивание копии массива студентов по названию группы (работаем с моделью)
moduleTask1.sortStudentsByGroup = function () {
    moduleTask1.showStudents(moduleTask1.originStudentList.slice().sort((a, b) => a.group.localeCompare(b.group)));
};

// получить коллекцию групп
moduleTask1.getCityList = function () {
    return new Array(...new Set(moduleTask1.originStudentList.map((s) => s.group)));
};

// обработчик события загрузки страницы
moduleTask1.init = function () {
    // загрузка данных из локального хранилища
    if (!moduleTask1.loadData()) {
        // генерация данных
        moduleTask1.originStudentList = moduleTask1.generateStudents();

        // запись в локальное хранилище
        moduleTask1.saveData();
    }

    // отображение данных в исходном порядке
    moduleTask1.showStudents(moduleTask1.originStudentList);

    // создание формы
    moduleTask1.form = new StudentForm(
        (s) => {
            moduleTask1.originStudentList.splice(0, 0, s);
            moduleTask1.saveData();
            moduleTask1.showOriginStudents();
            moduleTask1.selectColor('.student-tile:eq(0)');
        },
        () => {
            moduleTask1.saveData();
            moduleTask1.showOriginStudents();
        }
    );

    // установка обработчиков событий

    // добавление студента
    $('#addStudent').click(moduleTask1.addStudent);

    // редактирование студента
    $('#studentList').click(moduleTask1.editStudent);

    // редактирование студента
    $('#studentList').click(moduleTask1.removeStudent);

    // выделение студентов, имеющих хотя бы одну оценку 2 (средствами jQuery, не менять модель)
    $('#selectStudentsWithMark2').click(moduleTask1.selectStudentsWithMark2);

    // выделение студентов, имеющих оценки 4 и 5 (средствами jQuery, не менять модель)
    $('#selectStudentsWithMark4And5').click(moduleTask1.selectStudentsWithMark4And5);

    // выделение студентов заданной группы (средствами jQuery, не менять модель)
    $('#selectStudentsByGroup').click(() => moduleTask1.selectStudentsByGroup($('#groupListId').val()));

    // вывод массива студентов в исходном порядке
    $('#showOriginStudents').click(moduleTask1.showOriginStudents);

    // упорядочивание копии массива студентов по возрастанию среднего балла (работаем с моделью)
    $('#sortStudentsByAverageMark').click(moduleTask1.sortStudentsByAverageMark);

    // упорядочивание копии массива студентов по фамилиям и инициалам (работаем с моделью)
    $('#sortStudentsByFullName').click(moduleTask1.sortStudentsByFullName);

    // упорядочивание копии массива студентов по названию группы (работаем с моделью)
    $('#sortStudentsByGroup').click(() => moduleTask1.sortStudentsByGroup($('#groupListId').prop('value')));

    // заполенения списка групп
    $('#groupListId').html(() =>
        moduleTask1.getCityList().reduce((acc, item) => (acc += `<option>${item}</option>`), '')
    );
};

// обработка события загрузки страницы
// window.addEventListener('load', moduleTask1.windowLoadEventHandler);
$(moduleTask1.init);

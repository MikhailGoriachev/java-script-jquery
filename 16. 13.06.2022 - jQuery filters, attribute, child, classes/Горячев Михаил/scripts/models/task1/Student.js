//  Класс Student:
//      - фамилия и инициалы;
//      - пол студента;
//      - фотография студента (заранее подготовленные файлы, с именами man001, woman001 и т.д.
//        Имя файла генерируется в зависимости от пола студента);
//      - название группы;
//      - успеваемость (массив из пяти элементов типа Mark)
//      - Mark – класс: название предмета, оценка
class Student {
    // следующий идентификатор (нужен при создании объекта)
    static _nextId = 0;

    // конструктор
    constructor(fullName = '', gender = 0, image = '', group = '', markList = []) {
        // идентификатор
        this._id = Student._nextId++;

        // фамилия и инициалы
        this.fullName = fullName;

        // пол студента
        this.gender = gender;

        // фотография студента (имя файла)
        this.image = image;

        // название группы
        this.group = group;

        // успеваемость
        this.markList = markList;
    }

    //#region Сеттеры и геттеры

    // получение идентификатора
    get id() {
        return this._id;
    }

    // фамилия и инициалы
    set fullName(value) {
        this._fullName = value;
    }

    get fullName() {
        return this._fullName;
    }

    // пол студента
    set gender(value) {
        this._gender = value;
    }

    get gender() {
        return this._gender;
    }

    // фотография студента (имя файла)
    set image(value) {
        this._image = value;
    }

    get image() {
        return this._image;
    }

    // название группы
    set group(value) {
        this._group = value;
    }

    get group() {
        return this._group;
    }

    // успеваемость
    set markList(value) {
        this._markList = value;
    }

    get markList() {
        return this._markList;
    }

    // средний бал
    get avgMark() {
        return this.markList.reduce((acc, item) => (acc += item.mark), 0) / this.markList.length;
    }

    //#endregion

    //#region Методы

    // создание модели из объекта
    assign(obj) {
        Object.assign(this, obj);

        this.markList = obj._markList.map((mark) => new Mark(mark._name, mark._mark));

        return this;
    }

    // генерация студента
    static generateStudent() {
        // гендер
        let gender = getIntRand(0, 2);

        return new Student(
            getFullNameGender(gender),
            gender,
            getFileNameGender(gender),
            getGroup(),
            getAcademyMarkList()
        );
    }

    // получение строки с разметкой карточки объёкта для вывода
    showToHTML(container) {
        // контейнер для карточки
        $(container).append(
            $(
                `
            <div class="student-tile" id="student${this.id}">
                <div class="student-info">
                    <div class="student-column-info student-tile-image">
                        <img src="../images/persons/${this.image}" id="studentImg${this.id}"></img>
                    </div>
                    <div class="student-column-info">
                        <div class="field">Студент: <b class="studentFullName" 
                                        id="studentFullName${this.id}">${this.fullName}</b></div class="field">
                        <div class="field">Пол: <b class="studentGender" id="studentGender${this.id}">${
                    this.gender ? 'женский' : 'мужской'
                }</b></div class="field">
                        <div class="field">Группа: <b class="studentGroup" id="studentGroup${this.id}">${
                    this.group
                }</b></div class="field">
                        
                        <b>Успеваемость (средний балл: ${this.avgMark}):</b>
                        <ul id="studentMarkList${this.id}" class="studentMarkList">
                            ${this.markList.reduce(
                                (acc, mark) => (acc += `<li>${mark.name}: <b class="mark">${mark.mark}</b></li>`),
                                ''
                            )}
                        </ul>
                    </div>
                </div>

                <div class="student-tile-controls">
                    <button class="edit width-small" id="btnEdit${this.id}">Изменить</button>
                    <button class="remove width-small" id="btnRemove${this.id}">Удалить</button>
                </div>
            </div>
        `
            )
        );
    }

    //#endregion
}

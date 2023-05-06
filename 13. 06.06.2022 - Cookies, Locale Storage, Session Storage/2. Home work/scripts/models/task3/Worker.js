// Класс Работник

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

class Worker {
    // следующий id
    static nextId = 0;

    // конструктор по умолчанию
    constructor(fullName = '', position = '', gender = 0, yearOfEmployment = 2002, fileName = '', salary = 15_000) {
        // идентификатор
        this.id = Worker.nextId++;

        // фамилия и инициалы
        this.fullName = fullName;

        // название занимаемой должности
        this.position = position;

        // пол (мужской или женский, другие варианты не требуются)
        // 0 - мужской, 1 - женский
        this.gender = gender;

        // год поступления на работу
        this.yearOfEmployment = yearOfEmployment;

        // величина оклада работника
        this.salary = salary;

        // имя файла с фотографией работника
        this.fileName = fileName;
    }

    //#region Сеттеры и геттеры

    // идентификатор
    set id(value) {
        this._id = value;
    }

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

    // название занимаемой должности
    set position(value) {
        this._position = value;
    }

    get position() {
        return this._position;
    }

    // пол (мужской или женский, другие варианты не требуются)
    set gender(value) {
        this._gender = value;
    }

    get gender() {
        return this._gender;
    }

    // год поступления на работу
    set yearOfEmployment(value) {
        this._yearOfEmployment = value;
    }

    get yearOfEmployment() {
        return this._yearOfEmployment;
    }

    // величина оклада работника
    set salary(value) {
        this._salary = value;
    }

    get salary() {
        return this._salary;
    }

    // имя файла с фотографией работника
    set fileName(value) {
        this._fileName = value;
    }

    get fileName() {
        return this._fileName;
    }

    //#endregion

    //#region Методы

    // метод вычисления стажа работника для текущей даты
    getExperience() {
        return new Date().getFullYear() - this.yearOfEmployment;
    }

    // получить сгенерированный билет
    static getWorkerGenerator() {
        // гендер
        let gender = getIntRand(0, 2);

        return new Worker(
            getFullNameGender(gender),
            getPosition(),
            gender,
            getIntRand(2002, new Date().getFullYear()),
            getFileNameGender(gender),
            getIntRand(10, 300) * 1000
        );
    }

    // вывод разметки представления работника в строку
    toHTML() {
        return `
            <div class="tile" name="worker">
                <div class="tile-image">
                    <img src="../images/persons/${this.fileName}" alt="Изображение">
                </div>
                <div>Работник: <span>${this.fullName}</span></div>
                <div>Должность: <span>${this.position}</span></div>
                <div>Пол: <span>${this.gender ? 'женский' : 'мужской'}</span></div>
                <div>Год трудоустройства: <span>${this.yearOfEmployment}</span></div>
                <div>Стаж: <span>${this.getExperience()}</span></div>
                <div>Оклад: <span>${this.salary}</span></div>

                <!-- Кнопки управления -->
                <div class="controls">
                    <button class="width-small" id="btnEdit_${this.id}">Изменить</button>
                    <button class="width-small" id="btnRemove_${this.id}">Удалить</button>
                </div>

            </div>
            `;
    }

    //#endregion
}

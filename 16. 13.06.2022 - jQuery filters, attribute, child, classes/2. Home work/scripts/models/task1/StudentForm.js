// форма для добавления/изменения работника
class StudentForm {
    // получение номера формы (используется для генерации идентификатора)
    static nextId = 0;

    // конструкор (если форма ticket === null, то форма в режиме добавления, иначе в режиме радактирование)
    constructor(addEventHandler = null, editEventHandler = null, student = null) {
        // является статус формы добавлением
        this.isAdd = student === null;

        // установка объекта
        this.student = this.isAdd ? new Student() : student;

        // id номер формы
        this.idNumber = StudentForm.nextId++;

        // обработка добавления
        this.addEventHandler = addEventHandler;

        // обработка редактирования
        this.editEventHandler = editEventHandler;

        // инициализация формы
        this.initToHTML();
    }

    //#region Сеттеры и геттеры

    // объект
    set student(student = new Student()) {
        this._student = student;
    }

    get student() {
        return this._student;
    }

    //#endregion

    //#region Методы

    // создание формы в разметке (создаётся в скрытом режиме)
    initToHTML() {
        // контейнер формы
        let container = $('#studentForm');

        // разметка списка предметов для выпадающего списка
        let listSub = getAcademySubjectList().reduce((acc, item) => (acc += `<option>${item}</option>`), ''),
            listMark = [1, 2, 3, 4, 5].reduce((acc, item) => (acc += `<option>${item}</option>`), ''),
            listGroup = getGroupList().reduce((acc, item) => (acc += `<option>${item}</option>`), '');

        // создание формы
        let formHTML = `
            <form id="studentForm${this.idNumber}" class="form">
            <h2 class="text-align-center" id="frmHeader${this.idNumber}">
                ${this.isAdd ? 'Добавление студента' : 'Изменение студента'}
            </h2>

            <!-- Фамилия и инициалы студента -->
            <div class="field">
                <label for="frmFullNameId" class="field-label">Студент:</label>

                <input
                    type="text"
                    name="frmFullName"
                    id="frmFullNameId${this.idNumber}"
                    class="text-field-input"
                    placeholder="Фамилия И.О."
                    pattern="^[А-ЯA-Z][а-яa-z]{0,} [А-ЯA-Z]\. ?[А-ЯA-Z]\.$"
                    title="Фамилия и инициалы студента должны быть введены в правильном формате (Фамилия И.О.)"
                    required
                />
            </div>

            <!-- Группа -->
            <div class="field">
                <label for="frmGroupId" class="field-label">Группа:</label>

                <select
                    name="frmGroup"
                    id="frmGroupId${this.idNumber}"
                    class="text-field-input"
                    required
                >
                    ${listGroup}
                </select>
            </div>

            <!-- Пол (мужской/женский) -->
            <div class="field">
                <label for="frmGenderId" class="field-label">Пол:</label>

                <select name="frmGender" id="frmGenderId${this.idNumber}" class="text-field-input" required>
                    <option>мужской</option>
                    <option>женский</option>
                </select>
            </div>

            <!-- Список оценок -->
            <div class="field">
                <label class="field-label">Список оценок:</label>
                <div class="field-grid-list">
                ${new Array(5).fill().reduce(
                    (acc) =>
                        (acc += `
                    <div class="field-grid-list-key">
                        ${`
                        <select
                            name="frmSubjectList"
                            class="text-field-input frmSubjectList"
                            required
                        >
                            ${listSub}
                        </select>
                        `}
                    </div>

                    <div class="field-grid-list-value">
                        ${`
                        <select
                            name="frmMarkList"
                            class="text-field-input frmMarkList"
                            required
                        >
                            ${listMark}
                        </select>
                        `}
                    </div>
                `),
                    ''
                )}
                </div>
            </div>

            <!-- Кнопки управления -->
            <div class="controls">
                <input
                    class="width-small"
                    type="submit"
                    value="Добавить"
                    name="btnSubmit"
                    id="btnSubmitId${this.idNumber}"
                />
                <input
                    class="width-small"
                    type="reset"
                    value="Отмена"
                    name="btnCancelId"
                    id="btnCandelId${this.idNumber}"
                />
            </div>
        </form>        
    `;

        // добавление формы в контейнер
        container.append($(formHTML));

        // скрытие формы
        this.hide();

        // подписка на событие отправки формы
        $(`#studentForm${this.idNumber}`).submit((e) => {
            // скрытие формы
            this.hide();

            // отмена поведения элемента по умолчанию
            e.preventDefault();

            // гендер до изменения
            let genderOld = this.student.gender;

            // установка значений в поля
            this.student.fullName = $(`#frmFullNameId${this.idNumber}`).val();
            this.student.group = $(`#frmGroupId${this.idNumber}`).val();
            this.student.gender = $(`#frmGenderId${this.idNumber}`).val() === 'женский';

            let subs = $('.frmSubjectList');
            let marks = $('.frmMarkList');

            this.student.markList = [];

            for (let i = 0; i < subs.length; i++) {
                this.student.markList.push(new Mark(subs[i].value, +marks[i].value));
            }

            this.student.image = this.isAdd
                ? getFileNameGender(this.student.gender)
                : this.student.gender == genderOld
                ? this.student.image
                : getFileNameGender(this.student.gender);

            // запуск обработчика
            this.isAdd ? this.addEventHandler(this.student) : this.editEventHandler(this.student);

            // очистка полей
            e.target.reset();
        });

        // подписка на событие отмены формы
        $(`#btnCandelId${this.idNumber}`).click(() => this.hide());
    }

    // отображение формы
    show(isAdd = this.isAdd, student = new Student()) {
        // установка состояния отображения формы
        this.isAdd = isAdd;

        // установка рабочего
        this.student = student;

        $(`#frmHeader${this.idNumber}`).html(this.isAdd ? 'Добавление студента' : 'Редактирование студента');
        $(`#btnSubmitId${this.idNumber}`).val(this.isAdd ? 'Добавить' : 'Сохранить');
        $(`#studentForm${this.idNumber}`).css('display', 'block');

        // установка значений из объекта
        if (!this.isAdd) {
            $(`#frmFullNameId${this.idNumber}`).val(this.student.fullName);
            $(`#frmGroupId${this.idNumber}`).val(this.student.group);
            $(`#frmGenderId${this.idNumber}`).val(this.student.gender ? 'женский' : 'мужской');

            let sub = $(`.frmSubjectList`);
            let mark = $(`.frmMarkList`);

            for (let i = 0; i < sub.length; i++) {
                sub[i].value = this.student.markList[i].name;
                mark[i].value = this.student.markList[i].mark;
            }
        }
    }

    // скрытие формы
    hide() {
        $(`#studentForm${this.idNumber}`).css('display', 'none');
    }

    //#endregion
}

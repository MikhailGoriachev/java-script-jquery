// форма для добавления/изменения работника
class WorkerForm {
    // получение номера формы (используется для генерации идентификатора)
    static nextId = 0;

    // конструкор (если форма ticket === null, то форма в режиме добавления, иначе в режиме радактирование)
    constructor(idContainer = '', addEventHandler = null, editEventHandler = null, worker = null) {
        // является статус формы добавлением
        this.isAdd = worker === null;

        // установка объекта
        this.worker = this.isAdd ? new Worker() : worker;

        // id номер формы
        this.idNumber = WorkerForm.nextId++;

        // обработка добавления
        this.addEventHandler = addEventHandler;

        // обработка редактирования
        this.editEventHandler = editEventHandler;

        // инициализация формы
        this.initToHTML(idContainer);
    }

    //#region Сеттеры и геттеры

    // объект
    set worker(worker = new Worker()) {
        this._worker = worker;
    }

    get worker() {
        return this._worker;
    }

    //#endregion

    //#region Методы

    // создание формы в разметке (создаётся в скрытом режиме)
    initToHTML(idContainer = '') {
        // контейнер формы
        let container = $(idContainer);

        // создание формы
        let formHTML = `
                <form id="workerForm${this.idNumber}" class="form" >
                <h2 class="text-align-center" id="frmHeader${this.idNumber}">
                    ${this.isAdd ? 'Добавление работника' : 'Изменение работника'}
                </h2>

                <!-- Фамилия и инициалы работника -->
                <div class="field">
                    <label for="frmFullNameId" class="field-label">Работник:</label>

                    <input
                        type="text"
                        name="frmFullName"
                        id="frmFullNameId${this.idNumber}"
                        class="text-field-input"
                        placeholder="Фамилия И.О."
                        pattern="^[А-ЯA-Z][а-яa-z]{0,} [А-ЯA-Z]\. ?[А-ЯA-Z]\.$"
                        title="Фамилия и инициалы работника должны быть введены в правильном формате (Фамилия И.О.)"
                        required
                    />
                </div>

                
                <!-- Должность -->
                <div class="field">
                    <label for="frmPositionId" class="field-label">Должность:</label>

                    <select name="frmPosition" 
                            id="frmPositionId${this.idNumber}" 
                            class="text-field-input" 
                            required>
                    </select>
                </div>

                <!-- Пол (мужской/женский) -->
                <div class="field">
                    <label for="frmGenderId" class="field-label">Пол:</label>

                    <select name="frmGender" 
                            id="frmGenderId${this.idNumber}" 
                            class="text-field-input" 
                            required>
                            <option>мужской</option>
                            <option>женский</option>
                    </select>
                </div>

                <!-- Год трудоустройства -->
                <div class="field">
                    <label for="frmYearOfEmploymentId" class="field-label">Год трудоустройства:</label>

                    <input
                        type="number"
                        min="2002"
                        max="${new Date().getFullYear()}"
                        name="frmYearOfEmployment"
                        id="frmYearOfEmploymentId${this.idNumber}"
                        class="text-field-input"
                        placeholder="Год"
                        title="Год трудоустройства работника должнен быть в диапазоне: 2002 - ${new Date().getFullYear()}"
                        required
                    />
                </div>

                <!-- Оклад -->
                <div class="field">
                    <label for="frmSalaryId" class="field-label">Оклад:</label>

                    <input
                        type="number"
                        min="10000"
                        max="300000"
                        name="frmSalary"
                        id="frmSalaryId${this.idNumber}"
                        class="text-field-input"
                        placeholder="Оклад (&#8381;)"
                        title="Оклад работника должнен быть в диапазоне: 10 000 - 300 000"
                        required
                    />
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
        `;

        // добавление формы в контейнер
        container.innerHTML = formHTML;

        // добавление должностей в список
        $(`frmPositionId${this.idNumber}`).innerHTML = getPositionList().reduce(
            (acc, item) => (acc += `<option>${item}</option>`),
            ''
        );

        // скрытие формы
        this.hide();

        // подписка на событие отправки формы
        $(`workerForm${this.idNumber}`).addEventListener('submit', (e) => {
            // скрытие формы
            this.hide();

            // отмена поведения элемента по умолчанию
            e.preventDefault();

            // гендер до изменения
            let genderOld = this.worker.gender;

            // установка значений в поля
            this.worker.fullName = $(`frmFullNameId${this.idNumber}`).value;
            this.worker.position = $(`frmPositionId${this.idNumber}`).value;
            this.worker.gender = $(`frmGenderId${this.idNumber}`).value === 'женский';
            this.worker.yearOfEmployment = $(`frmYearOfEmploymentId${this.idNumber}`).value;
            this.worker.salary = $(`frmSalaryId${this.idNumber}`).value;

            this.worker.fileName = this.isAdd
                ? getFileNameGender(this.worker.gender)
                : this.worker.gender == genderOld
                ? this.worker.fileName
                : getFileNameGender(this.worker.gender);

            // запуск обработчика
            this.isAdd ? this.addEventHandler(this.worker) : this.editEventHandler(this.worker);

            // очистка полей
            e.target.reset();
        });

        // подписка на событие отмены формы
        $(`btnCandelId${this.idNumber}`).addEventListener('click', () => this.hide());
    }

    // отображение формы
    show(isAdd = this.isAdd, worker = new Worker()) {
        // установка состояния отображения формы
        this.isAdd = isAdd;

        // установка рабочего
        this.worker = worker;

        $(`frmHeader${this.idNumber}`).innerHTML = this.isAdd ? 'Добавление работника' : 'Редактирование работника';
        $(`btnSubmitId${this.idNumber}`).value = this.isAdd ? 'Добавить' : 'Сохранить';
        $(`workerForm${this.idNumber}`).style.display = 'block';

        // установка значений из объекта
        if (!this.isAdd) {
            $(`frmFullNameId${this.idNumber}`).value = this.worker.fullName;
            $(`frmPositionId${this.idNumber}`).value = this.worker.position;
            $(`frmGenderId${this.idNumber}`).value = this.worker.gender ? 'женский' : 'мужской';
            $(`frmYearOfEmploymentId${this.idNumber}`).value = this.worker.yearOfEmployment;
            $(`frmSalaryId${this.idNumber}`).value = this.worker.salary;
        }
    }

    // скрытие формы
    hide() {
        $(`workerForm${this.idNumber}`).style.display = 'none';
    }

    //#endregion
}

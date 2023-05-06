// форма для добавления/изменения поезда
class TrainForm {
    // получение номера формы (используется для генерации идентификатора)
    static nextId = 0;

    // конструкор (если форма train === null, то форма в режиме добавления, иначе в режиме радактирование)
    constructor(addEventHandler = null, editEventHandler = null, train = null) {
        // является статус формы добавлением
        this.isAdd = train === null;

        // установка объекта
        this.train = this.isAdd ? new Train() : train;

        // id номер формы
        this.idNumber = TrainForm.nextId++;

        // обработка добавления
        this.addEventHandler = addEventHandler;

        // обработка редактирования
        this.editEventHandler = editEventHandler;

        // инициализация формы
        this.initToHTML();
    }

    //#region Сеттеры и геттеры

    // объект
    set train(value) {
        this._train = value;
    }

    get train() {
        return this._train;
    }

    //#endregion

    //#region Методы

    // создание формы в разметке (создаётся в скрытом режиме)
    initToHTML() {
        // контейнер формы
        let container = $('#trainForm');
        // создание формы
        let formHTML = `
                <form id="trainForm${this.idNumber}" class="form">
                <h2 class="text-align-center" id="frmHeader${this.idNumber}">
                    ${this.isAdd ? 'Добавление студента' : 'Изменение студента'}
                </h2>
        
                <!-- Номер поезда https://clck.ru/rdqJW -->
                <div class="field">
                    <label for="frmNumberId${this.idNumber}" class="field-label">Номер поезда:</label>
        
                    <input
                        type="text"
                        name="frmNumber"
                        id="frmNumberId${this.idNumber}"
                        class="text-field-input"
                        placeholder="Номер"
                        pattern="^[0-9]{1,5}$"
                        title="Номер поезда должен состоять только из цифр, от 1 до 5 символов"
                        required
                    />
                </div>
        
                <!-- Станция назначения -->
                <div class="field">
                    <label for="frmDestinationId${this.idNumber}" class="field-label">Станция назначения:</label>
        
                    <select
                        name="frmDestination"
                        id="frmDestinationId${this.idNumber}"
                        class="text-field-input"
                        required
                    >
                    </select>
                </div>
        
                <!-- Время отправления -->
                <div class="field">
                    <label for="frmTimeRangeId${this.idNumber}" class="field-label">Время отправления:</label>
                    <input id="selectRangeId${
            this.idNumber
        }" type="text" class="text-field-input" title="Для изменения передвигайте слайдер (расположен ниже)" readonly>
                    <div id="frmTimeRangeId${this.idNumber}"></div>
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
        $(`#trainForm${this.idNumber}`).hide();

        // заполнение списка мест назначения
        $(`#frmDestinationId${this.idNumber}`).append(
            $(getStationNameList().reduce((a, s) => (a += `<option>${s}</option>`), ''))
        );

        // параметры для слайдера времени
        let id = `#selectRangeId${this.idNumber}`;

        // инициализация контролла для установки времени
        $(`#frmTimeRangeId${this.idNumber}`).slider({
            min: 0,
            max: 143,
            value: 50,
            slide: function (e, u) {
                $(id).val(getValueToTime(u.value));
            },
        });

        // подписка на событие отправки формы
        $(`#trainForm${this.idNumber}`).submit((e) => {
            // скрытие формы
            this.hide();

            // отмена поведения элемента по умолчанию
            e.preventDefault();

            // объект для времени
            let date = new Date();

            // значение времени
            let val = $(`#frmTimeRangeId${this.idNumber}`).slider('option', 'value');

            // устанвка времени отправления
            date.setHours(val / 6);
            date.setMinutes((val % 6) * 10);

            // установка значений в поля
            this.train.number = $(`#frmNumberId${this.idNumber}`).val();
            this.train.destination = $(`#frmDestinationId${this.idNumber}`).val();
            this.train.departureTime = date;
            this.train.imageFile = this.train.imageFile === '' ? getTrainFileName() : this.train.imageFile;

            // запуск обработчика
            this.isAdd ? this.addEventHandler(this.train) : this.editEventHandler(this.train);

            // очистка полей
            e.target.reset();
        });

        // подписка на событие отмены формы
        $(`#btnCandelId${this.idNumber}`).click(() => this.hide());
    }

    // отображение формы
    show(train) {
        // установка состояния отображения формы
        this.isAdd = train === undefined;

        // установка рабочего
        this.train = this.isAdd ? new Train() : train;

        // установка на элементы формы
        $(`#frmHeader${this.idNumber}`).html(this.isAdd ? 'Добавление поезда' : 'Редактирование поезда');
        $(`#btnSubmitId${this.idNumber}`).val(this.isAdd ? 'Добавить' : 'Сохранить');

        // установка значений из объекта
        if (!this.isAdd) {
            $(`#frmNumberId${this.idNumber}`).val(this.train.number);
            $(`#frmDestinationId${this.idNumber}`).val(this.train.destination);
        } else {
            // установка времени в модель
            this.train.departureTime.setHours(8);
            this.train.departureTime.setMinutes(30);
        }

        // установка данных по времени
        $(`#selectRangeId${this.idNumber}`).val(this.train.departureTime.toLocaleTimeString().slice(0, -3));
        $(`#frmTimeRangeId${this.idNumber}`).slider('option', 'value', getTimeToValue(this.train.departureTime));

        // отображение формы
        $(`#trainForm${this.idNumber}`).show('fade');
    }

    // скрытие формы
    hide() {
        $(`#trainForm${this.idNumber}`).hide('fade', 'slow');
    }

    //#endregion
}

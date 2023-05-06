// форма для добавления/изменения работника
class TicketForm {
    // получение номера формы (используется для генерации идентификатора)
    static nextId = 0;

    // конструкор (если форма ticket === null, то форма в режиме добавления, иначе в режиме радактирование)
    constructor(idContainer = '', addEventHandler = null, editEventHandler = null, ticket = null) {
        // является ли статус формы добавлением
        this.isAdd = ticket === null;

        // установка объекта
        this.ticket = this.isAdd ? new Ticket() : ticket;

        // id номер формы
        this.idNumber = TicketForm.nextId++;

        // обработка добавления
        this.addEventHandler = addEventHandler;

        // обработка редактирования
        this.editEventHandler = editEventHandler;

        // инициализация формы
        this.initToHTML(idContainer);
    }

    //#region Сеттеры и геттеры

    // объект
    set ticket(ticket = new Ticket()) {
        this._ticket = ticket;
    }

    get ticket() {
        return this._ticket;
    }

    //#endregion

    //#region Методы

    // создание формы в разметке (создаётся в скрытом режиме)
    initToHTML(idContainer = '') {
        // контейнер формы
        let container = $(idContainer);

        // создание формы
        let formHTML = `
                <form id="ticketForm${this.idNumber}" class="form" >
                <h2 class="text-align-center" id="frmHeader${this.idNumber}">${
            this.isAdd ? 'Добавление заявки' : 'Изменение работника'
        }</h2>

                <!-- Место назначения -->
                <div class="field">
                    <label for="frmDestinationId" class="field-label">Место назначения:</label>

                    <select name="frmDestination" id="frmDestinationId${
                        this.idNumber
                    }" class="text-field-input" required>
                    </select>
                </div>

                <!-- Номер рейса -->
                <div class="field">
                    <label for="frmFlightNumberId" class="field-label">Номер рейса:</label>
                    <input
                        type="text"
                        name="frmFlightNumber"
                        id="frmFlightNumberId${this.idNumber}"
                        class="text-field-input"
                        placeholder="AZ 12345"
                        pattern="^[A-Z]{2} [0-9]{4,5}$"
                        title="Номер рейса должен быть в формате: AA 12345"
                        required
                    />
                </div>

                <!-- Фамилия и инициалы пассажира -->
                <div class="field">
                    <label for="frmFullNameId" class="field-label">Пассажир:</label>

                    <input
                        type="text"
                        name="frmFullName"
                        id="frmFullNameId${this.idNumber}"
                        class="text-field-input"
                        placeholder="Фамилия И.О."
                        pattern="^[А-ЯA-Z][а-яa-z]{0,} [А-ЯA-Z]\. ?[А-ЯA-Z]\.$"
                        data-message="Фамилия и инициалы пассажира должны быть в формате: Фамилия И.О."
                        title="Фамилия и инициалы пассажира должны быть введены в правильном формате (Фамилия И.О.)"
                        required
                    />
                </div>

                <!-- Стоимость билета -->
                <div class="field">
                    <label for="frmTicketCostId" class="field-label">Стоимость билета:</label>

                    <input
                        type="number"
                        min="0"
                        max="100_000"
                        name="frmTicketCost"
                        id="frmTicketCostId${this.idNumber}"
                        class="text-field-input"
                        placeholder="Стоимость (&#8381;)"
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
            </form>
        `;

        // добавление формы в контейнер
        container.innerHTML = formHTML;

        // заполнение списка
        $(`frmDestinationId${this.idNumber}`).innerHTML = getCityList().reduce(
            (acc, item) => (acc += `<option>${item}</option>`),
            ''
        );

        // скрытие формы
        this.hide();

        // подписка на событие отправки формы
        $(`ticketForm${this.idNumber}`).addEventListener('submit', (e) => {
            // скрытие формы
            this.hide();

            // отмена поведения элемента по умолчанию
            e.preventDefault();

            // установка значений в поля
            this.ticket.destination = $(`frmDestinationId${this.idNumber}`).value;
            this.ticket.flightNumber = $(`frmFlightNumberId${this.idNumber}`).value;
            this.ticket.fullName = $(`frmFullNameId${this.idNumber}`).value;
            this.ticket.ticketCost = $(`frmTicketCostId${this.idNumber}`).value;

            // запуск обработчика
            this.isAdd ? this.addEventHandler(this.ticket) : this.editEventHandler(this.ticket);

            // очистка полей
            e.target.reset();
        });

        // подписка на событие отмены формы
        $(`btnCandelId${this.idNumber}`).addEventListener('click', () => this.hide());
    }

    // отображение формы
    show(isAdd = this.isAdd, ticket = new Ticket()) {
        // установка состояния отображения формы
        this.isAdd = isAdd;

        // установка рабочего
        this.ticket = ticket;

        $(`frmHeader${this.idNumber}`).innerHTML = this.isAdd ? 'Добавление заявки' : 'Редактирование заявки';
        $(`btnSubmitId${this.idNumber}`).value = this.isAdd ? 'Добавить' : 'Сохранить';
        $('ticketForm' + this.idNumber).style.display = 'block';

        // установка значений из объектов
        if (!this.isAdd) {
            $(`frmDestinationId${this.idNumber}`).value = this.ticket.destination;
            $(`frmFlightNumberId${this.idNumber}`).value = this.ticket.flightNumber;
            $(`frmFullNameId${this.idNumber}`).value = this.ticket.fullName;
            $(`frmTicketCostId${this.idNumber}`).value = this.ticket.ticketCost;
        }
    }

    // скрытие формы
    hide() {
        $('ticketForm' + this.idNumber).style.display = 'none';
    }

    //#endregion
}

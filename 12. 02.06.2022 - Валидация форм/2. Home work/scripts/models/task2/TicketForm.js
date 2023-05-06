// форма для добавления/изменения работника
class TicketForm {
    // получение номера формы (используется для генерации идентификатора)
    static nextId = 0;

    // конструкор (если форма ticket === null, то форма в режиме добавления, иначе в режиме радактирование)
    constructor(idContainer = '', submitEventHandler = null) {
        // установка объекта
        this.ticket = new Ticket();

        // id номер формы
        this.idNumber = TicketForm.nextId++;

        // инициализация формы
        this.initToHTML(idContainer, submitEventHandler);
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
    initToHTML(idContainer = '', submitEventHandler = null) {
        // контейнер формы
        let container = $(idContainer);

        // создание формы
        let formHTML = `
                <form id="ticketForm${this.idNumber}" class="form" >
                <h2 class="text-align-center">Добавление заявки</h2>

                <!-- Место назначения -->
                <div class="field">
                    <label for="frmDestinationId" class="field-label">Место назначения:</label>

                    <select name="frmDestination" id="frmDestinationId${this.idNumber}" class="text-field-input" required>
                        <option>Донецк</option>
                        <option>Киев</option>
                        <option>Мариуполь</option>
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
                        placeholder="AA 12345"
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
            submitEventHandler(this.ticket);

            // очистка полей
            e.target.reset();
        });

        // подписка на событие отмены формы
        $(`btnCandelId${this.idNumber}`).addEventListener('click', () => this.hide());
    }

    // отображение формы
    show() {
        $('ticketForm' + this.idNumber).style.display = 'block';
    }

    // скрытие формы
    hide() {
        $('ticketForm' + this.idNumber).style.display = 'none';
    }

    //#endregion
}

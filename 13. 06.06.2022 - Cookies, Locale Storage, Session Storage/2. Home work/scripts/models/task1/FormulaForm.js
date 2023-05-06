// форма для ввода чисел и вывода формулы и резульата
class FormulaForm {
    // получение номера формы (используется для генерации идентификатора)
    static nextId = 0;

    // длительность хранения cookie
    static timeAgeCookie = 72 * 3600;

    // конструктор
    constructor(
        header = '',
        minRange = Number.MIN_VALUE,
        maxRange = Number.MAX_VALUE,
        calc = (number) => {},
        containerId = ''
    ) {
        // ID формы
        this.idForm = FormulaForm.nextId++;

        // заголовок
        this.header = header;

        // минимальное значение диапазона
        this.minRange = minRange;

        // максимальное значение диапазона
        this.maxRange = maxRange;

        // функция запуска вычисления
        this.calc = calc;

        // контейнер
        this.containerId = containerId;

        // число
        this.number = 0;

        // результат
        this.result = { z1: 0, z2: 0 };

        // создание формы в разметке
        this.initToHTML();

        // загрузка данных из cookie
        this.loadFromCookie();
    }

    //#region Сеттеры и геттеры

    // ID формы
    set idForm(value) {
        this._idForm = value;
    }

    get idForm() {
        return this._idForm;
    }

    // заголовок
    set header(value) {
        this._header = value;
    }

    get header() {
        return this._header;
    }

    // минимальное значение диапазона
    set minRange(value) {
        this._minRange = value;
    }

    get minRange() {
        return this._minRange;
    }

    // максимальное значение диапазона
    set maxRange(value) {
        this._maxRange = value;
    }

    get maxRange() {
        return this._maxRange;
    }

    // функция запуска вычисления
    set calc(value) {
        this._calc = value;
    }

    get calc() {
        return this._calc;
    }

    // контейнер
    set containerId(value) {
        this._containerId = value;
    }

    get containerId() {
        return this._containerId;
    }

    // число
    set number(value) {
        this._number = value;
    }

    get number() {
        return this._number;
    }

    // результат
    set result(value) {
        this._result = value;
    }

    get result() {
        return this._result;
    }

    //#endregion

    //#region Методы

    // создание формы в разметке
    initToHTML() {
        // контейнер
        let container = $(this.containerId);

        let htmlForm = `
                <form id="formulaForm${this.idForm}" class="formula-form">
                    <h2 class="text-align-center">${this.header}</h2>
                    <div class="field">
                        <label>Текущее число: <b id="currentNumber${this.idForm}">———</b></label>
                    </div>
                    <hr />

                    <div class="field">
                        <label>Результат:</label>
                        <p>z<sub>1</sub> = <b id="z1Result${this.idForm}">———</b></p>
                        <p>z<sub>2</sub> = <b id="z2Result${this.idForm}">———</b></p>
                    </div>

                    <hr />

                    <!-- Ввод нового числа -->
                    <div class="field">
                        <label for="frmNumberId${this.idForm}" class="field-label">Ввод нового числа:</label>
                        <input
                            type="number"
                            min="${this.minRange}"
                            max="${this.maxRange}"
                            name="frmNumber"
                            id="frmNumberId${this.idForm}"
                            step="any"
                            class="text-field-input"
                            placeholder="Введите число от ${this.minRange} до ${this.maxRange}"
                            required
                        />
                    </div>

                    <!-- Кнопки управления -->
                    <div class="controls">
                        <input
                            class="width-small"
                            type="submit"
                            value="Вычислить"
                            name="btnSubmit"
                            id="btnSubmitId${this.idForm}"
                        />
                    </div>
                </form>
        `;

        // вывод в резметку контейнера
        container.innerHTML = htmlForm;

        // let form = $(`formulaForm${this.idForm}`);

        // установка обработчика события на кнопку
        // $(`formulaForm${this.idForm}`).addEventListener('submit', (e) => {
        // form.addEventListener('submit', (e) => {
        $(`formulaForm${this.idForm}`).addEventListener('submit', (e) => {
            e.preventDefault();

            this.number = +$(`frmNumberId${this.idForm}`).value;
            this.result = this.calc(this.number);

            // вывод введённого числа
            $(`currentNumber${this.idForm}`).innerHTML = this.currentNumber = this.number;

            // вывод результата в поля
            $(`z1Result${this.idForm}`).innerHTML = this.result.z1.toFixed(5);
            $(`z2Result${this.idForm}`).innerHTML = this.result.z2.toFixed(5);

            // сохранение данных в cookie
            this.saveToCookie();
        });
    }

    // созранение данных формы в cookie
    saveToCookie() {
        // запись cookie
        setCookie(
            `formulaForm${this.idForm}`,
            JSON.stringify({ result: this.result, currentNumber: this.currentNumber }),
            1000000
        );
    }

    // загрузка данных формы из cookie
    loadFromCookie() {
        // данные
        let data = getCookieForKey(`formulaForm${this.idForm}`);

        // если данных нет
        if (!data) return;

        // получение объёкта
        data = JSON.parse(data.value);

        // вывод введённого числа
        $(`currentNumber${this.idForm}`).innerHTML = this.number = data.currentNumber;

        // установка результата
        this.result = data.result;

        // вывод результата в поля
        $(`z1Result${this.idForm}`).innerHTML = typeof this.result.z1 === 'number' ? this.result.z1.toFixed(5) : 'NaN';
        $(`z2Result${this.idForm}`).innerHTML = typeof this.result.z2 === 'number' ? this.result.z2.toFixed(5) : 'NaN';
    }

    //#endregion
}

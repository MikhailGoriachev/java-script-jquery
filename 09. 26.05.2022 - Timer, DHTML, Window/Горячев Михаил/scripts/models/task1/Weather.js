// класс — Данные о погоде
class Weather {
    // конструктор
    constructor(day = 'понедельник', temperature = 0, pressure = 700, humidity = 50, wind = new Wind(), view = '') {
        // #region поля объекта
        // день недели
        this.day = day;

        // температура
        this.temperature = temperature;

        // давление
        this.pressure = pressure;

        // влажность
        this.humidity = humidity;

        // ветер
        this.wind = wind;

        // отображение атмосферного являения
        this.view = view;

        //#endregion
    }
    // константные значения
    //#region Сеттеры и геттеры
    // день недели
    set day(day) {
        this._day = day;
    }

    get day() {
        return this._day;
    }

    // температура
    set temperature(temperature) {
        this._temperature = temperature;
    }

    get temperature() {
        return this._temperature;
    }

    // давление
    set pressure(pressure) {
        this._pressure = pressure;
    }

    get pressure() {
        return this._pressure;
    }

    // влажность
    set humidity(humidity) {
        this._humidity = humidity;
    }

    get humidity() {
        return this._humidity;
    }

    // ветер
    set wind(wind) {
        this._wind = wind;
    }

    get wind() {
        return this._wind;
    }

    // отображение атмосферного являения
    set view(view) {
        this._view = view;
    }

    get view() {
        return this._view;
    }

    //#endregion
    //#region Методы
    // вывод данных в строку в виде плитки
    showToString() {
        return `<div class="weather" name="weatherGroup">
                    <div class="text-align-center"><span>${this.day}</span></div>
                    <div class="weather-image">
                        <img src="../images/${this.view}" alt="Изображение явления" />
                    </div>
                    <div>Температура: <span>${this.temperature}&deg;</span></div>
                    <div>Давление: <span>${this.pressure} гПа</span></div>
                    <div>Влажность: <span>${this.humidity}%</span></div>
                    <div>Ветер: <span>${this.wind.toString()}</span></div>
                </div>`;
    }

    // вывод данных в строку
    toString() {
        return `Температура: ${this.temperature}; Давление: ${this.pressure} гПа; Влажность: ${this.humidity}%;
                Ветер: <span>${this.wind.toString()}`;
    }
}

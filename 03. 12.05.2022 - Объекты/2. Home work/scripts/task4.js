// Задача 4. Данные о погоде

// Задача 4. Спроектировать объект для представления данных о погоде: температура, давление, влажность,
// скорость и направление ветра, графическое отображение атмосферных явлений (ясно, облачно, дождь, и
// т.д. – не более 5 видов явлений). Предусмотрите методы для задания вида явления, увеличения давления
// (максимальное значение давления 1200 гПа), вывода объекта в разметку, продемонстрируйте работу методов
// объекта

// работа по заданию
function task4() {
    // диапазон значений
    const minTemp = -15,
        maxTemp = 35,
        minPress = 800,
        maxPress = 1200,
        minHum = 20,
        maxHum = 70,
        minSpeed = 2,
        maxSpeed = 20,
        directions = ['северное', 'южное', 'западное', 'восточное'];

    // представления природных явлений
    let views = ['sun.jpg', 'thunderstorm.jpeg', 'clouds.jpg', 'snow.jpg'];
    viewIndex = 0;

    // объект данных о погоде
    let data = {
        // температура
        temperature: getIntRand(minTemp, maxTemp),

        // давление
        pressure: getIntRand(minPress, maxPress),

        // влажность
        humidity: getIntRand(minHum, maxHum),

        // скорость ветра
        windSpeed: getIntRand(minSpeed, maxSpeed),

        // направление ветра
        windDirection: directions[getIntRand(0, directions.length)],

        // отображение природного явления
        view: views[viewIndex],

        // максимальное значение давления
        maxPressure: 1200,

        // изменение природного явления
        changeView: function (viewName = 'sun.jpg') {
            this.view = viewName;
        },

        // увеличение давления
        pressureIncrease: function (value = 0) {
            this.pressure += this.pressure + value <= this.maxPressure ? value : this.maxPressure;
        },

        // вывод объекта в разметку
        show: function (header = 'Исходные данные') {
            document.write(`<table>
                    <caption><h2>${header}</h2></caption>
                        <tbody>
                            <tr>
                                <td rowspan="5" >
                                    <image src="../images/${this.view}" height="400" width="600"></image>
                                </td>
                                <td class="cell-green cell-longer">Температура: ${this.temperature}&#176;</td>
                            </tr>
                            <tr>
                                <td class="cell-blue">Давление: ${this.pressure} гПа</td>
                            </tr>
                            <tr>
                                <td class="cell-orange">Влажность: ${this.humidity}%</td>
                            </tr>
                            <tr>
                                <td class="cell-pink">Скорсть ветра: ${this.windSpeed} м/с</td>
                            </tr>
                            <tr>
                                <td class="cell-red">Направление ветра: ${this.windDirection}</td>
                            </tr>
                        </tbody>
                    </table>`);
        },
    };

    // вывод исходного объекта
    data.show();

    // изменние объекта

    // изменение природного явления
    data.changeView(views[getIntRand(1, views.length)]);

    // увеличение давления
    data.pressureIncrease(Math.trunc(getIntRand(minPress, maxPress) / 10));

    // вывод измененного объекта
    data.show('Измененные данные');
}

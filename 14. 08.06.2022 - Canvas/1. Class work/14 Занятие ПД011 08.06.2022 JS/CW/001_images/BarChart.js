// построение гистограммы при помощи div
// data   - массив данных для визуализации
// width  - ширина поля вывода гистограммы
// height - высота поля вывода гистограммы
// color  - цвет прямоугольников
function createBarChart(data, width, height, color) {

    // создаем контейнер для диаграммы
    let chart = document.createElement("div");
    chart.style.width = width + "px";
    chart.style.height = height + "px";
    chart.style.position = "relative";
    
    // находим максимальное значение в массиве данных
    let max = Math.max(...data);

    // масштаб по вертикалы и ширина
    let scale = height / max;
    let barWidth = Math.floor(width / data.length);

    // поэлементное создание гистограммы
    for (let i = 0; i < data.length; i++) {
        // создаем отдельный элемент диаграммы
        let bar = document.createElement("div");

        // формируем высоту div в зависимости от данных - высотой показываем значение
        bar.style.height = data[i] * scale + "px";
        bar.style.width = barWidth - 4 + "px";   // 4px для отступа

        bar.style.position = "absolute";
        bar.style.margin = "4px";
        bar.style.bottom = "0px";
        bar.style.left = barWidth * i + "px";

        bar.style.backgroundColor = color;

        chart.appendChild(bar);
    } // for i

    return chart;
}

function createBarChart(canvas, data, width, height, color) {

    if (typeof canvas == "string") canvas = document.getElementById(canvas);
    canvas.width = width;
    canvas.height = height;
    let context = canvas.getContext("2d");

    // находим максимальное значение в массиве данных
	let max = Math.max(...data);

    let scale = height / max;
    let barWidth = Math.floor(width / data.length);

    // создаем отдельный элемент диаграммы
    for (let i = 0; i < data.length; i++) {
       
        let barHeight = data[i] * scale,
            x = barWidth * i,
            y = height - barHeight;

        context.fillStyle = color;
        context.fillRect(x, y, barWidth - 2, barHeight);
    }
}
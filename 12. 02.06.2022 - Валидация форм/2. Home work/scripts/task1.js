//  Задача 1. Формулы

//  Задача 1.  Разработайте формы ввода для задания исходных данных и решения следующих задач –
//  вариантов из учебника Павловской Т.А. по C#:
//  Проверяйте значения на допустимость: В первом выражении: b > -2, во втором: x > 3, в третьем
//  m > 0. Данные не передавать на сервер, вести обработку в коде JavaScript этой же страницы HTML.
//  Все формы должны быть размещены на одной странице.

// модуль первого задания
var moduleTask1 = {};

// формы
moduleTask1.forms = [];

// диапазоны чисел
moduleTask1.ranges = {
    var15: { min: -2, max: Number.MAX_VALUE },
    var16: { min: 3, max: Number.MAX_VALUE },
    var17: { min: 0, max: Number.MAX_VALUE },
};

// решение по первой формуле
moduleTask1.formulaFirst = function (num = 1) {
    return {
        z1: Math.sqrt(2 * num + 2 * Math.sqrt(num ** 2 - 4)) / (Math.sqrt(num ** 2 - 4) + num + 2),
        z2: 1 / Math.sqrt(num + 2),
    };
};

// решение по второй формуле
moduleTask1.formulaSecond = function (num = 5) {
    return {
        z1:
            (num ** 2 + 2 * num - 3 + (num + 1) * Math.sqrt(num ** 2 - 9)) /
            (num ** 2 - 2 * num - 3 + (num - 1) * Math.sqrt(num ** 2 - 9)),

        z2: Math.sqrt((num + 3) / (num - 3)),
    };
};

// решение по третьей формуле
moduleTask1.formulaThird = function (num = 1) {
    return {
        z1: Math.sqrt((3 * num + 2) ** 2 - 24 * num) / (3 * Math.sqrt(num) - 2 / Math.sqrt(num)),
        z2: Math.sqrt(num),
    };
};

// обработчик загрузки страницы
moduleTask1.documentLoadEventHandler = function () {
    // форма "Вариант 15"
    moduleTask1.forms.push(
        new FormulaForm(
            'Вариант 15',
            moduleTask1.ranges.var15.min,
            moduleTask1.ranges.var15.max,
            moduleTask1.formulaFirst,
            'containerFirstId'
        )
    );

    // форма "Вариант 16"
    moduleTask1.forms.push(
        new FormulaForm(
            'Вариант 16',
            moduleTask1.ranges.var16.min,
            moduleTask1.ranges.var16.max,
            moduleTask1.formulaFirst,
            'containerSecondId'
        )
    );

    // форма "Вариант 17"
    moduleTask1.forms.push(
        new FormulaForm(
            'Вариант 17',
            moduleTask1.ranges.var17.min,
            moduleTask1.ranges.var17.max,
            moduleTask1.formulaFirst,
            'containerThirdId'
        )
    );
};

// обработчик события загрузки страницы
window.addEventListener('load', moduleTask1.documentLoadEventHandler);

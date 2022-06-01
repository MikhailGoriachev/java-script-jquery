//  Задача 1. Строки

//  Задача 1. Решите задачи на обработку строк при помощи методов регу-лярных выражений, строки
//  задавайте присваиванием:
//  •	Даны строки S и S0. Удалить из строки S последнюю подстроку, сов-падающую с S0. Если
//      совпадающих подстрок нет, то вывести строку S без изменений
//  •	Даны строки S, S1 и S2. Заменить в строке S все вхождения строки S1 на строку S2
//  •	Дана строка S, слова в которой разделяются одним пробелом. Найти количество слов,
//      начинающихся на гласную букву, без учета регистра, вывести найденные слова
//  •	Дана строка, состоящая из слов, разделенных одним пробелом. Сформировать строку,
//      состоящую из этих же слов в порядке, обрат-ном алфавитному. Вывести исходную и
//      преобразованную строки
//  •	Дана строка, состоящая из слов, разделенных одним пробелом. Сформировать строку,
//      состоящую из этих же слов, размещенных в обратном порядке. Вывести исходную и
//      преобразованную строки

// глобальная переменная модуля первого задания
var moduleTask1 = {};

//  •	Даны строки S и S0. Удалить из строки S последнюю подстроку, сов-падающую с S0. Если
//      совпадающих подстрок нет, то вывести строку S без изменений
moduleTask1.point1 = function (str, str0) {
    // удаление подстроки
    return str.replace(new RegExp(`${str0}$`), '');
};

//  •	Даны строки S, S1 и S2. Заменить в строке S все вхождения строки S1 на строку S2
moduleTask1.point2 = function (str = '', str0 = '', str1 = '') {
    return str.replace(new RegExp(str0, 'g'), str1);
};

//  •	Дана строка S, слова в которой разделяются одним пробелом. Найти количество слов,
//      начинающихся на гласную букву, без учета регистра, вывести найденные слова
moduleTask1.point3 = function (str = '') {
    // результирующий объект
    let result = {
        count: 0,
        words: [],
        toString() {
            return `Слова: ${this.words}; Количество: ${this.count}`;
        },
    };

    // результат текущего поиска
    let word;

    // регулярное выражение для поиска
    let exp = /\s[eyuoaуёеыаоэяию][а-я]*/gi;

    // поиск слов
    while ((word = exp.exec(str)) != null) {
        result.count++;
        result.words.push(word);
    }

    return result;
};

//  •	Дана строка, состоящая из слов, разделенных одним пробелом. Сформировать строку,
//      состоящую из этих же слов в порядке, обрат-ном алфавитному. Вывести исходную и
//      преобразованную строки
moduleTask1.point4 = function (str = '') {
    return str
        .split(/ /)
        .sort((a, b) => b.localeCompare(a))
        .join(' ');
};

//  •	Дана строка, состоящая из слов, разделенных одним пробелом. Сформировать строку,
//      состоящую из этих же слов, размещенных в обратном порядке. Вывести исходную и
//      преобразованную строки
moduleTask1.point5 = function (str = '') {
    return str.split(/ /).reverse().join(' ');
};

// обработка по заданию
moduleTask1.run = function () {
    // строки для обработки
    let str = 'Милости прошу к нашему шалашу в Анапе я пирогов покрошу и откушать попрошу';

    // подстроки
    let str1 = '',
        str2 = '';

    //  •	Даны строки S и S0. Удалить из строки S последнюю подстроку, сов-падающую с S0. Если
    //      совпадающих подстрок нет, то вывести строку S без изменений
    str1 = 'прошу';

    moduleTask1.pointRunAndShow(
        `Удалить из строки S последнюю подстроку, совпадающую с S<small>0</small><br>S0 = ${str1}`,
        moduleTask1.point1,
        str,
        str1
    );

    //  •	Даны строки S, S1 и S2. Заменить в строке S все вхождения строки S1 на строку S2
    str1 = 'прошу';
    str2 = '>ВСТАВКА<';

    moduleTask1.pointRunAndShow(
        `Заменить в строке S все вхождения строки S<small>1</small> на строку S<small>2</small>
        <br>S<small>1</small> = ${str1}, S<small>2</small> = ${str2}`,
        moduleTask1.point2,
        str,
        str1,
        str2
    );

    //  •	Дана строка S, слова в которой разделяются одним пробелом. Найти количество слов,
    //      начинающихся на гласную букву, без учета регистра, вывести найденные слова
    moduleTask1.pointRunAndShow(
        `Найти количество слов, начинающихся на гласную букву, без учета регистра, вывести найденные слова`,
        moduleTask1.point3,
        str
    );

    //  •	Дана строка, состоящая из слов, разделенных одним пробелом. Сформировать строку,
    //      состоящую из этих же слов в порядке, обратном алфавитному. Вывести исходную и
    //      преобразованную строки
    moduleTask1.pointRunAndShow(
        `Сформировать строку, состоящую из этих же слов в порядке, обратном алфавитному`,
        moduleTask1.point4,
        str
    );

    //  •	Дана строка, состоящая из слов, разделенных одним пробелом. Сформировать строку,
    //      состоящую из этих же слов, размещенных в обратном порядке. Вывести исходную и
    //      преобразованную строки
    moduleTask1.pointRunAndShow(
        `Сформировать строку, состоящую из этих же слов, размещенных в обратном порядке`,
        moduleTask1.point5,
        str
    );
};

// вывод строки и задания
moduleTask1.showPoint = function (title = 'Исходная строка', str = '', stringResult = '') {
    // $('title').innerHtml = title;
    $('title').innerHTML = title;
    $('sourceString').innerHTML = str;
    $('resultString').innerHTML = stringResult;
};

// запуск и вывод пункта по заданию
moduleTask1.pointRunAndShow = function (title = '', point = () => {}, str = '', str1 = '', str2 = '') {
    // выполнение задания
    let result = point(str, str1, str2);

    // вывод данных
    moduleTask1.showPoint(title, str, result);
};

// установка обработчика события загрузки страницы
window.onload = function () {
    // строки для обработки
    let str = 'Милости прошу к нашему шалашу в Анапе я пирогов покрошу и откушать попрошу';

    // подстроки
    let str1 = '',
        str2 = '';

    //  •	Даны строки S и S0. Удалить из строки S последнюю подстроку, сов-падающую с S0. Если
    //      совпадающих подстрок нет, то вывести строку S без изменений
    str1 = 'прошу';

    // установка обработчика события на кнопку
    $('btnPoint1').onclick = () =>
        moduleTask1.pointRunAndShow(
            `Пункт 1. Удалить из строки S последнюю подстроку, совпадающую с S<small>0</small><br>S0 = ${str1}`,
            moduleTask1.point1,
            str,
            str1
        );

    //  •	Даны строки S, S1 и S2. Заменить в строке S все вхождения строки S1 на строку S2
    str1 = 'прошу';
    str2 = '>ВСТАВКА<';

    // установка обработчика события на кнопку
    $('btnPoint2').onclick = () =>
        moduleTask1.pointRunAndShow(
            `Пункт 2. Заменить в строке S все вхождения строки S<small>1</small> на строку S<small>2</small>
            <br>S<small>1</small> = ${str1}, S<small>2</small> = ${str2}`,
            moduleTask1.point2,
            str,
            str1,
            str2
        );

    //  •	Дана строка S, слова в которой разделяются одним пробелом. Найти количество слов,
    //      начинающихся на гласную букву, без учета регистра, вывести найденные слова

    // установка обработчика события на кнопку
    $('btnPoint3').onclick = () =>
        moduleTask1.pointRunAndShow(
            `Пункт 3. Найти количество слов, начинающихся на гласную букву, без учета регистра, вывести найденные слова`,
            moduleTask1.point3,
            str
        );

    //  •	Дана строка, состоящая из слов, разделенных одним пробелом. Сформировать строку,
    //      состоящую из этих же слов в порядке, обратном алфавитному. Вывести исходную и
    //      преобразованную строки

    // установка обработчика события на кнопку
    $('btnPoint4').onclick = () =>
        moduleTask1.pointRunAndShow(
            `Пункт 4. Сформировать строку, состоящую из этих же слов в порядке, обратном алфавитному`,
            moduleTask1.point4,
            str
        );

    //  •	Дана строка, состоящая из слов, разделенных одним пробелом. Сформировать строку,
    //      состоящую из этих же слов, размещенных в обратном порядке. Вывести исходную и
    //      преобразованную строки

    // установка обработчика события на кнопку
    $('btnPoint5').onclick = () =>
        moduleTask1.pointRunAndShow(
            `Пункт 5. Сформировать строку, состоящую из этих же слов, размещенных в обратном порядке`,
            moduleTask1.point5,
            str
        );

    // установка обработки первой кнопки, по умолчнанию при загрузке страцниы
    $('btnPoint1').onclick();
};

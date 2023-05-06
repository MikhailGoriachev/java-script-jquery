
// генерация случайного вещественного числа
function getRand(from, to) {
    return from + (to - from)*Math.random();
} // getRandom

// генерация случайного целого числа
function getIntRand(from, to) {
    // Math.trunc(x) - возвращает целую часть числа
    // (без округлений, просто отбрасывается дробная часть)
    return Math.trunc(getRand(from, to));
} // getIntRand

// функция-оболочка для быстрого доступа к элементу DOM по идентификатору
function $(id) { return document.getElementById(id); }
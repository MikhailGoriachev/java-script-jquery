// Утилиты

// генерация случайного целого числа
function getIntRand(min = -10, max = 10) {
    return Math.floor(Math.random() * (max - min) + min);
}

// генерация случайного вещественного числа
function getDoubleRand(min = -10, max = 10) {
    return Math.random() * (max - min) + min;
}

// получить массив случайных целых чисел
function getIntArray(length = 10, min = -10, max = 11) {
    // массив
    let array = [];

    // заполнение массива
    for (let i = 0; i < length; i++) {
        array[i] = getIntRand(min, max);
    }

    return array;
}

// получить массив случайных чисел
function getDoubleArray(length = 10, min = -10, max = 11) {
    // массив
    let array = [];

    // заполнение массива
    for (let i = 0; i < length; i++) {
        array[i] = getDoubleRand(min, max);
    }

    return array;
}

// генерация даты
function getDate(dateMin = new Date(), dateMax = new Date()) {
    return new Date(dateMin.getTime() + Math.random() * (dateMax.getTime() - dateMin.getTime()));
}

// получить список городов
function getCityList() {
    return ['Донецк', 'Макеевка', 'Киев', 'Иловайск'];
}

// получить город
function getCity() {
    // массив городов
    let cities = getCityList();

    return cities[getIntRand(0, cities.length)];
}

// получить название услуги
function getServiceName() {
    // массив названий услуг
    let serviceNames = ['Ремонт компьютера', 'Ремонт ноутбука', 'Ремонт монитора', 'Ремонт комплектующих'];

    return serviceNames[getIntRand(0, serviceNames.length)];
}

// получить массив случайных чисел из массива значений
function getRangeArray(length = 10, range = []) {
    // массив
    let array = [];

    // размер массива диапазона
    let len = range.length;

    // заполнение массива
    for (let i = 0; i < length; i++) {
        array[i] = range[getIntRand(0, len)];
    }

    return array;
}

// вывод массива в виде таблицы в строку
function showArrayTable(array = [], title = '', lastRow = '', selectColor = () => {}, accentColor = () => {}) {
    // строка для вывода
    let line = `<table>
                ${title.length == 0 ? '' : `<caption><h3>${title}</h3></caption>`}
                <tbody>`;

    // максимальное количество элементов в строке
    const maxLenght = 10;

    // вывод элементов в строку
    for (let i = 0, k = 0; i < array.length / maxLenght; i++) {
        line += '<tr><td class="cell-header-gray cell-normal">Индекс</td>';

        // строка значений
        let values = '';

        // вывод элементов
        for (; k < array.length; ) {
            line += `<td class='cell-blue text-align-rigth'>${k}</td>`;

            // установка цвета ячейки со значением
            let color = selectColor(k, array[k]) ? 'cell-orange' : accentColor(k, array[k]) ? 'cell-red' : 'cell-green';

            values += `<td class='${color} text-align-rigth cell-normal'>${
                typeof array[k] === 'number'
                    ? array[k] == Math.trunc(array[k])
                        ? array[k]
                        : array[k].toFixed(3)
                    : array[k]
            }</td>`;

            if (++k % maxLenght == 0) break;
        }

        // добавление значений в строку
        line += `</tr><tr><td class="cell-header-gray cell-normal">Значение</td>${values}</tr>`;
    }

    // добавление последней строки
    line += lastRow;

    return (line += '</tbody></table>');
}

// получить фамилию и инициалы
function getFullName() {
    // массив фамилий
    let surnames = ['Иванов', 'Петров', 'Сидоров', 'Семенов', 'Павлов', 'Степанов', 'Алексеев', 'Александров'];

    // массив инициалов
    let initials = 'АБВГДЕЖЗИКЛМН';

    return `${surnames[getIntRand(0, surnames.length)]} ${initials.charAt(
        getIntRand(0, initials.length)
    )}. ${initials.charAt(getIntRand(0, initials.length))}.`;
}

// функция получения элемента по IdElement
function $(id) {
    return document.getElementById(id);
}

// фильтр поля для ввода
function filterInputForNumber(event) {
    if (!/[0-9]/.test(String.fromCharCode(event.keyCode))) event.preventDefault();
}

// генерация фамилии и инициалов по гендеру
// 0 - мужской, 1 - женский
function getFullNameGender(gender = 0) {
    // мужские фамилии и иницалы
    let male = [
        'Старостин В. А.',
        'Зорин А. М.',
        'Парфенов Е. М.',
        'Семенов А. Ф.',
        'Морозов М. М.',
        'Нефедов К. А.',
        'Сергеев А. С.',
        'Трофимов В. М.',
        'Зайцев Б. К.',
        'Климов Е. М.',
        'Потапов М. Д.',
        'Дементьев Д. И.',
        'Пономарев М. Г.',
        'Карасев А. М.',
        'Лапшин П. М.',
        'Киселев Т. Т.',
        'Максимов М. А.',
        'Лосев А. С.',
        'Гришин Д. С.',
        'Козлов А. Т.',
    ];

    // женские фамилии и иницалы
    let female = [
        'Комиссарова С. Р.',
        'Добрынина М. М.',
        'Максимова С. Б.',
        'Беляева А. Д.',
        'Гришина Л. А.',
        'Суворова В. Д.',
        'Зорина Е. Д.',
        'Калинина А. Е.',
        'Данилова А. Н.',
        'Самсонова В. М.',
        'Павлова В. А.',
        'Касьянова О. М.',
        'Козлова М. А.',
        'Гусева В. Ю.',
        'Сорокина А. Т.',
        'Давыдова В. М.',
        'Дмитриева А. И.',
        'Федорова П. Н.',
        'Шилова Е. А.',
        'Новикова В. А.',
    ];

    // генерация
    return gender ? female[getIntRand(0, female.length)] : male[getIntRand(0, male.length)];
}

// получить массив предметов
function getAcademySubjectList() {
    return [
        'математика',
        'информатика',
        'физика',
        'право',
        'литература',
        'география',
        'химия',
        'экономика',
        'биология',
        'история',
    ];
}

// получить предмет
function getAcademySubject() {
    let items = getAcademySubjectList();

    return items[getIntRand(0, items.length)];
}

// получить массив успеваемости
function getAcademyMarkList(length = 5) {
    return Array(length)
        .fill()
        .map((m) => new Mark(getAcademySubject(), getIntRand(1, 6)));
}

// получить массив названий групп
function getGroupList() {
    return ['Н-12', 'П-10', 'Д-24'];
}

// получить название группы
function getGroup() {
    let items = getGroupList();

    return items[getIntRand(0, items.length)];
}

// получить название файла изображения
function getFileNameGender(gender) {
    // название файлов для мужчин
    let manList = [
        'male_001.jpg',
        'male_002.jpg',
        'male_003.jpg',
        'male_004.jpg',
        'male_005.jpg',
        'male_006.jpg',
        'male_007.jpg',
        'male_008.jpg',
        'male_009.jpg',
        'male_010.jpg',
    ];

    // название файлов для женщин
    let womanList = [
        'female_001.jpg',
        'female_002.jpg',
        'female_003.jpg',
        'female_004.jpg',
        'female_005.jpg',
        'female_006.jpg',
        'female_007.jpg',
        'female_008.jpg',
        'female_009.jpg',
        'female_010.jpg',
    ];

    return gender ? womanList[getIntRand(0, womanList.length)] : manList[getIntRand(0, manList.length)];
}

// запись в cookie
function setCookie(key = '', value = '', time = 360) {
    document.cookie = `${key}=${encodeURIComponent(value)}; max-age=${time}`;
}

// чтение coockie в массив объектов { key, value }
function getCookies() {
    // cookie
    return decodeURIComponent(document.cookie)
        .split('; ')
        .map((p) => {
            let arr = p.split('=');

            return {
                key: arr[0],
                value: arr[1],
            };
        });
}

// чтение cookie по ключу
function getCookieForKey(key = '') {
    return getCookies().find((c) => c.key === key);
}

// очистка cookie
function clearCookies() {
    // получить массив cookie
    getCookies().forEach((c) => (document.cookie = `${c.key}=; max-age=0;`));
}

// получить коллекцию названий станций ж/д
function getStationNameList() {
    let data = [
        'Беличи',
        'Беловоды',
        'Лугины',
        'Магедово',
        'Мазуровка',
        'Маково',
        'Переездная',
        'Переспа',
        'Подгорцы',
        'Покровск',
    ];

    return data;
}

// получить название станции
function getStationName() {
    // список станций
    let data = getStationNameList();

    return data[getIntRand(0, data.length)];
}

// получить список изображений поезда
function getTrainFileNameList() {
    let data = [
        'train001.jpg',
        'train002.jpg',
        'train003.jpg',
        'train004.jpg',
        'train005.jpg',
        'train006.jpg',
        'train007.jpg',
        'train008.jpg',
        'train009.jpg',
        'train010.jpg',
    ];

    return data;
}

// получить название файла изображения поезда
function getTrainFileName() {
    let data = getTrainFileNameList();

    return data[getIntRand(0, data.length)];
}

// перевод числа (0 - 144) в вид времени hh:mm
function getValueToTime(value = 0) {
    return `${`${Math.floor(value / 6)}`.padStart(2, '0')}:${value % 6}0`;
}

// перевод времени в число (0 - 144)
function getTimeToValue(date = new Date()) {
    return (date.getHours() * 60 + date.getMinutes()) / 10;
}

// получить массив текстов
function getTextList() {

    return [
        `
        <h3>Текст 1</h3>
        
        <p>
            Meet my family. There are five of us – my parents, my elder brother, my baby sister and me.
            First, meet my mum and dad, Jane and Michael. My mum enjoys reading and my dad enjoys playing
            chess with my brother Ken. My mum is slim and rather tall. She has long red hair and big brown
            eyes. She has a very pleasant smile and a soft voice. My mother is very kind and understanding.
        </p>

        <p>
            We are real friends. She is a housewife. As she has three children, she is always busy around
            the house. She takes care of my baby sister Meg, who is only three months old. My sister is very
            small and funny. She sleeps, eats and sometimes cries. We all help our mother and let her have a
            rest in the evening. Then she usually reads a book or just watches TV. My father is a doctor. He
            is tall and handsome. He has short dark hair and gray eyes. He is a very hardworking man. He is
            rather strict with us, but always fair. My elder brother Ken is thirteen, and he is very clever.
        </p>

        <p>
            He is good at Maths and always helps me with it, because I can hardly understand all these sums
            and problems. Ken has red hair and brown eyes. My name is Jessica. I am eleven. I have long dark
            hair and brown eyes. I am not as clever as my brother, though I try to do my best at school too.
        </p>

        <p>
            I am fond of dancing. Our dancing studio won The Best Dancing Studio 2015 competition last
            month. I am very proud of it. I also like to help my mother with my little sister very much. Our
            family is very united. We love each other and always try to spend more time together.
        </p>
        
        <p>
            Знакомьтесь с моей семьей. Нас пятеро – мои родители, мой старший брат, моя маленькая сестра и я.
            Сначала познакомьтесь с моими мамой и папой, Джейн и Майклом. Моя мама любит читать, а мой папа
            любит играть в шахматы с моим братом Кеном. Моя мама стройная и довольно высокая. У нее длинные
            рыжие волосы и большие карие глаза. У нее очень приятная улыбка и нежный голос. Моя мама очень
            добрая и понимающая. Мы настоящие друзья. Она домохозяйка. Поскольку у нее трое детей, она всегда
            занята по дому. Она заботится о моей грудной сестренке Мег, которой только три месяца.
        </p>

        <p>
            Моя сестренка очень маленькая и забавная. Она спит, ест и иногда плачет. Мы все помогаем нашей маме
            и даем ей отдохнуть вечером. Тогда она обычно читает книгу или просто смотрит телевизор. Мой папа врач.
            Он высокий и красивый. У него короткие темные волосы и серые глаза. Он очень трудолюбивый человек. Он
            довольно строг с нами, но всегда справедлив. Моему старшему брату Кену тринадцать и он очень умный.
        </p>

        <p>
            Он хорошо разбирается в математике и всегда помогает мне с ней, потому что я едва понимаю все эти
            примеры и задачи. У Кена рыжие волосы и карие глаза. Меня зовут Джессика. Мне одиннадцать. У меня
            длинные темные волосы и карие глаза. Я не такая умная, как мой брат, хотя я очень стараюсь в школе
            тоже. Я увлекаюсь танцами. Наша танцевальная студия выиграла конкурс на Лучшую Танцевальную Студию
            2015 в прошлом месяце. Я очень горжусь этим. Я также очень люблю помогать моей маме с моей маленькой
            сестренкой. Наша семья очень дружная. Мы любим друг друга и всегда пытаемся проводить больше времени
            вместе.
        </p>`,

        `<h3>Текст 2</h3>
        
        <p>
            There are different kinds of animals on our planet, and all of them are very important for it. For
            example, everybody knows that the sharks are dangerous for people, but they are useful for cleaning
            seawater. There are two types of animals: domestic (or pets) and wild. People keep pets in their homes.
            And some wild animals are very dangerous. Domestic animals live next to people, whereas wild animals’
        </p>

        <p>“homes” are forests, jungles, oceans and so on.</p>

        <p>
            Giraffes are very beautiful and unusual animals. They are the tallest land animals in the world. Giraffes
            can reach a height of 5,5 m and a weight of 900 kg. They are famous for their long necks. But does anybody
            know, that giraffes have a very long tongue? They even can clean the ears with it! Giraffes are usually
            yellow or light brown with dark stains. Giraffes live in African savannas. They can live from 20 to 30
            years. It is interesting to know, that giraffes sleep only twenty minutes at a time. They sit down on the
            ground and bend their long neck down.
        </p>
        
        <p>
            Giraffes do not hunt. They eat leaves, grass, and fruit. Due to their long neck, they can reach the highest
            leaves on the trees that other animals cannot eat.
        </p>

        <p>You can often meet giraffes in city Zoos. They are very friendly and all the children like them very much.</p>

        <p>
            На планете много разных видов животных, и все они очень важны для нее. Например, все знают, что акулы опасны
            для людей, но они полезны для очищения морской воды. Есть два вида животных – домашние (или питомцы) и дикие.
            Люди держат питомцев в своих домах. А некоторые дикие животные очень опасны. Домашние животные живут рядом с
            людьми, тогда как «дома» диких животных - это леса, джунгли, океаны и так далее.
        </p>
        
        <p>
            Жирафы очень красивые и необычные животные. Они самые высокие сухопутные животные в мире. Жирафы могут
            достигать в высоту 5.5 метров, и веса 900 кг. Они знамениты своими длинными шеями. Но кто-нибудь знает, что у
            жирафов очень длинный язык? Они даже могут почистить им уши! Жирафы обычно жёлтые или светло коричневые с
            тёмными пятнами. Жирафы живут в африканских саваннах. Они могут прожить от 20 до 30 лет. Интересно знать что
            жирафы спят не более 20 минут за раз. Они садятся на землю и нагибают свою длинную шею.
        </p>

        <p>
            Жирафы не охотятся. Они едят листья, траву и фрукты. Благодаря своей длинной шее они могут достать до самых
            верхних листьев на деревьях, которые не могут съесть другие животные.
        </p>

        <p>Вы часто можете встретить жирафов в городских зоопарках. Они очень дружелюбные и их очень любят дети.</p>
        `,

        `<h3>Текст 3</h3>
        
        <p>The yardman comes every week. The yardman’s name is Steven. He drives an old blue truck. The truck is a 
        Volkswagen. It is about 20 years old, but it still looks and runs well.</p>
        
        <p>Садовник приходит каждую неделю. Садовника зовут Стивен. Он ездит на старом синем грузовике. У него грузовик 
        марки Фольксваген. Ему около 20 лет, но он все еще хорошо выглядит и ездит.</p>
        
        <p>There are a lot of things in the back of his truck. He has a lawn mower, a leaf blower, a rake and a shovel. 
        Steven usually begins with blowing leaves and dirt from the back of the building.</p>
        
        <p>В багажнике его грузовика есть много вещей. У него есть газонокосилка, воздуходувка, грабли и лопата. Стивен 
        обычно начинает с того, что сдувает листья и грязь за домом.</p>
        
        <p>Next he rakes the leaves into a bag. Steven blows the dirt out into the street. After that he mows the lawn 
        and trims the hedge. Steve also blows the dirt off each mat that lies in front of people’s apartment doors.</p>
        
        <p>Затем он собирает листья в мешок. Стивен сдувает грязь на дорогу. После этого он косит траву и подстригает 
        живую изгородь. Стив также сдувает грязь с ковриков, лежащих напротив дверей в квартиры.</p>
        
        <p>Then he cleans the yard picking all the leaves, the grass trimmings and the hedge clippings and putting them 
        into a wheelbarrow. He pushes it to the back of the building and empties the contents into the big dumpster. The 
        work takes him about an hour.</p>
        
        <p>Затем он чистит двор, собирая все листья, скошенную траву и обрезки кустов и кладет их в тачку. Он везет ее за 
        дом и опустошает, отправляя содержимое в большой мусорный бак. Вся работа занимает у него около часа.</p>
        
        <p>When he is done, he goes to other buildings and does the same work in their yards as well.</p>
        
        <p>Когда он заканчивает, то отправляется к другим домам и делает ту же работу в их дворах.</p>`,
    ];
}

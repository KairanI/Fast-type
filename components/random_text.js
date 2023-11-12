const text = document.getElementById('line');
const key_animate = document.getElementById('H');
const caretka = document.getElementById('caretka');
const text_WPM_ACC = document.getElementById('tittle');

const punct = document.getElementById('punct');
const numbers = document.getElementById('numbers');
const en = document.getElementById('en');
const ru = document.getElementById('ru');
const activing_lang = document.getElementById('activing_lang');
const activing_long = document.getElementById('activing');
const long_10 = document.getElementById('long_10');
const long_20 = document.getElementById('long_20');
const long_50 = document.getElementById('long_50');
const long_80 = document.getElementById('long_80');

// добавляем классы по умолчанию
activing_long.classList.add('long_10');
long_10.classList.add('active');

activing_lang.classList.add('en');
en.classList.add('active');

let text_num = 0;
let key_num = 0;
let error_num = 0;
let sentence = '';
let caretka_blink = 0;
let timerId = 0;
let long_text = 10;

// переменная для разделения большого текста
let septum_text = '';
// переменные для подсчета секунд и минут в таймере
let second = 0;

// коонтроллер для удаления и добавления мигания каретке
let controller_caretka = true;

// переменная для контроля вызова функции caretka-blink, что бы она вызывалась один раз
let controller_setCaretka = true;

// контроллер для скрытия текста
let controller_text = true;

// контролеры для анимаций сайт бара
let controller_punct = 0;
let controller_numbers = 0; 

// переменная для контроля вызова функции Timer, что бы она вызывалась один раз.
let controller = 0;

let wpm = 0;
let acc = 0;

const num = [
    4, 234, 567, 89, 123, 890, 432, 76, 543, 12, 345, 678, 90, 98, 765, 432, 123, 456, 789, 9, 678, 90, 987, 654, 321, 345, 11, 90, 98, 765, 432, 123, 1, 789, 45, 678, 90, 987, 654, 2, 345, 678, 90, 98, 765, 432, 8, 456, 789, 45, 678, 90, 7, 654, 321, 345, 678, 90, 98, 765, 432, 123, 10, 789, 45, 678, 90, 3, 654, 321, 345, 12, 90, 98, 765, 432, 123, 456, 789, 45, 678, 90, 6, 654, 321, 5, 678, 90, 98, 765, 432, 123, 456, 789, 45, 678, 90, 987, 88, 321
]

const words_ru = [
"и", "в", "не", "на", "я", "с", "что", "как", "по", "он", 
"ты", "это", "мы", "за", "сказать", "но", "она", "так", 
"его", "к", "от", "а", "то", "вы", "же", "все", 
"бы", "тут", "его", "уже", "для", "меня", "или", "если", 
"мне", "есть", "нет", "мы", "со", "из", "до", "вас", "какой", 
"они", "чем", "где", "есть", "сейчас", "потом", "тебя", "нет", 
"да", "хорошо", "почему", "сегодня", "здесь", "просто", "сейчас", 
"когда", "время", "чтобы", "быть", "чего", "ну", "еще", "может", 
"человек", "без", "вот", "теперь", "кто", "ничего", "себя", 
"под", "тоже", "даже", "говорить", "время", "сделать", "перед", 
"какой", "зачем", "потому", "один", "другой", "вдруг", "надо", 
"совсем", "хотеть", "нельзя", "смотреть", "потому", "потом", 
"день", "рука", "глаз", "дом", "вопрос", "работа", "место", 
"ребенок", "голова", "стол", "нога", "дверь", "работать"
]

const words_en = [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", 
    "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", 
    "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", 
    "no", "just", "him", "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", 
    "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first", 
    "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us"
]

const key_keybord = [
    "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash"
]

const keybord_ru = [
    "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ".",
]

const keybord_en = [
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Z", "X", "C", "V", "B", "N", "M",  ",", ".", "/"
]   

const superPunctuations = ['.', '?', '!'];

let punctuations = [...superPunctuations, '!', ':', ':']

// "word" в единственном числе. Это одно слово
// "capitalize" значит сделать с заглавной буквы
function capitalize(word) {
    // получаю первый символ слОва word, делаю заглавным и прибавляю остальные символы слОва word
    return word.charAt(0).toUpperCase() + word.slice(1);
}

let App = (words) => {
    clearInterval(caretka_blink);

    text_num = 0;
    septum_text = '';
    sentence = '';
    
    for (i = 0; i < long_text; i++) {
        const number = Math.floor(Math.random() * words.length);
        const word = words[number];
        // Переменная указывает на то, нужна ли заглавная буква новому слову
        // true, если это первое слово,
        // или если в массиве superPunctuations есть последний символ слОва word
        const shouldCapitalize = i === 0 || superPunctuations
        .includes(sentence.slice(-1));

        if (Math.random() < 0.1 && numbers.classList.contains('active_block')) {
            const random_num = Math.floor(Math.random() * num.length);
            const num2 = num[random_num];

            sentence += ' ' + num2;
        } 
            // Добавляется пробел и новое слово
            // Оно с заглавной буквы только тогда,
            // когда предыдущий символ является разделителем предложений
            sentence += ' ' + (shouldCapitalize ? capitalize(word) : word);

            if (Math.random() < 0.5 && punct.classList.contains('active_block')) {
                const number_punctuation = Math.floor(Math.random() * punctuations.length);
                const punctuation = punctuations[number_punctuation];
        
                sentence += punctuation;
            }
    }

         // Убираем первый символ, который является пробелом,
        // потому что он ставится перед всеми словами,
        // в том числе и перед первым
        sentence = sentence.slice(1);

        // Последний символ может оказаться пунктуацией
        if (punctuations.includes(sentence.slice(-1))) {
        // Убираем последний символ
        sentence = sentence.slice(0, -1);
        }

         // Добавляем точку в конец
        if(punct.classList.contains('active_block')) sentence += '.' ;

        if(long_text > 30) {
            septum_text = sentence.slice(210);
            sentence = sentence.slice(0, 210);
            controller_text = false;
        };

            /*caretka_blink = setInterval(() => {
                if (controller_setCaretka == true) {
                    caretka.classList.add('caretka-blink'); 
                    controller_setCaretka = false;
                } else {
                    caretka.classList.remove('caretka-blink')
                    controller_setCaretka = true;
                }
            }, 550); */

        clearInterval(timerId);
        text_WPM_ACC.classList.remove('tittle-animate');
        caretka.classList.remove('caretka-type');

        acc = 0;
        wpm = 0;
        second = 0
        error_num = 0;
        key_num = 0;
        controller = 0;
        controller_text = true;

        text_WPM_ACC.textContent = '';
        text.textContent = '';
        for (let char of sentence) {
            text.innerHTML += `<letter id="${char + text_num}">${char}</letter>`;
            ++text_num;
        };

        positionCaretka();
}

function Keyboard(code, key) {
    window.addEventListener(
        'keydown', (event) => {
        if (event.code == code && sentence[key_num] == key && sentence.length > key_num) {
            let id_word = document.getElementById(`${key + key_num}`);
            id_word.classList.add('wh');
            ++key_num;

            // включения таймера для WPM
            if(controller == 0) {
                timerId = setInterval(() => {
                    second += 1;
                } ,1000);
                controller++;
            }
            
            // анимация клавиатуры
            let key_animate = document.getElementById(code);
            if (key_animate) {
               key_animate.classList.add('keybord-animate')
            };
            setTimeout(() => key_animate.classList.remove('keybord-animate'), 200);


            if(sentence.length > key_num) positionCaretka();
            clearInterval(caretka_blink);
        }

        else if(event.code == 'Backspace') {
            let id_word = document.getElementById(`${sentence[key_num - 1] + (key_num - 1)}`);
            id_word.classList.remove('wh') || id_word.classList.remove('error');
            if (key_num > 0) key_num -= 1;

            if(sentence.length > key_num) positionCaretka();
        } 

        else if (event.code == code && sentence[key_num] != key && !event.shiftKey && sentence.length > key_num) {
            let id_word = document.getElementById(`${sentence[key_num] + key_num}`);
            id_word.classList.add('error');
            ++key_num;
            ++error_num;

            // анимация клавиатуры при не правильных нажатиях
            let key_animate = document.getElementById(code);
            if (key_animate) {
               key_animate.classList.add('keybord-error')
            };
            setTimeout(() => key_animate.classList.remove('keybord-error'), 200);

            if(sentence.length > key_num) positionCaretka();
            clearInterval(caretka_blink);
        }
        if (sentence.length == key_num && second > 0 && controller_text == true && text_WPM_ACC.textContent == '') WPM();
        if (sentence.length == key_num && second > 0 && controller_text == false) {
            key_num = 0;
            key_word.textContent = '';

            sentence = septum_text;
            text.textContent = septum_text;
            controller_text = true;
        }
    },{once:true});;
}

window.addEventListener(
    "keydown",
    (event) => {
        Keyboard(event.code, event.key);
    },
    true,
);

button.addEventListener('click', () => {
    invocation();
});

punct.addEventListener('click', () => {
    if(controller_punct == 0) {
        punct.classList.add('active_block');
        invocation();
        return controller_punct = 1;

    }

    if(controller_punct == 1) {
        punct.classList.remove('active_block');
        invocation();
        controller_punct = 0;
    }
})

numbers.addEventListener('click', () => {
    if(controller_numbers == 0) {
        numbers.classList.add('active_block');
        invocation();
        return controller_numbers = 1;

    }

    if(controller_numbers == 1) {
        numbers.classList.remove('active_block');
        invocation();
        controller_numbers = 0;
    }
})



ru.addEventListener('click', () => {
    // удаляем классы
    activing_lang.classList.remove('en');
    en.classList.remove('active');

    activing_lang.classList.add('ru');
    ru.classList.add('active');

    for(let i = 0; i < key_keybord.length; i++) {
        let a = document.getElementById(key_keybord[i]);
        a.textContent = keybord_ru[i];
    }

    invocation();
});

en.addEventListener('click', () => {
    // удаляем классы
    activing_lang.classList.remove('ru');
    ru.classList.remove('active');

    // добавляем классы
    activing_lang.classList.add('en');
    en.classList.add('active');

    for(let i = 0; i < key_keybord.length; i++) {
        let a = document.getElementById(key_keybord[i]);
        a.textContent = keybord_en[i];
    }

    invocation();
});

long_10.addEventListener('click', () => {
    // удаляем классы
    activing_long.classList.remove('long_80');
    long_80.classList.remove('active');

    activing_long.classList.remove('long_50');
    long_50.classList.remove('active');

    activing_long.classList.remove('long_20');
    long_20.classList.remove('active');

    // добавляем классы
    activing_long.classList.add('long_10');
    long_10.classList.add('active');

    long_text = 10;
    invocation();
});

long_20.addEventListener('click', () => {
    // удаляем классы
    activing_long.classList.remove('long_80');
    long_80.classList.remove('active');

    activing_long.classList.remove('long_50');
    long_50.classList.remove('active');

    activing_long.classList.remove('long_10');
    long_10.classList.remove('active');

    // добавляем классы
    activing_long.classList.add('long_20');
    long_20.classList.add('active');

    long_text = 20;
    invocation();
});

long_50.addEventListener('click', () => {
    // удаляем классы
    activing_long.classList.remove('long_80');
    long_80.classList.remove('active');

    activing_long.classList.remove('long_20');
    long_20.classList.remove('active');

    activing_long.classList.remove('long_10');
    long_10.classList.remove('active');

    // добавлем классы
    activing_long.classList.add('long_50');
    long_50.classList.add('active');

    long_text = 50;
    invocation();
});

long_80.addEventListener('click', () => {
    // удаляем классы
    activing_long.classList.remove('long_50');
    long_50.classList.remove('active');

    activing_long.classList.remove('long_20');
    long_20.classList.remove('active');

    activing_long.classList.remove('long_10');
    long_10.classList.remove('active');

    // добавлем классы
    activing_long.classList.add('long_80');
    long_80.classList.add('active');

    long_text = 80;
    invocation();
});

function positionCaretka() {
    let letter = document.getElementById(`${sentence[key_num] + key_num}`);
    let coordinats_letter = letter.getBoundingClientRect();
    caretka.style.left = `${coordinats_letter.left}px`;
    caretka.style.top = `${coordinats_letter.top + 34}px`
}

function WPM() {
    acc = Math.floor(100 - (error_num / key_num * 100));

    let minutes = second / 60;
    let wpm_1 = Math.floor(long_text / minutes);

    wpm = Math.floor(wpm_1 - ((error_num / minutes) / 2));
    if (wpm < 0) wpm = 0;
    if (acc < 0) acc = 0;

    setTimeout(() => {
        text_WPM_ACC.textContent = `WPM ${wpm}; ACC ${acc}`;
        text_WPM_ACC.classList.add('tittle-animate');
    }, 2000);
    caretka.classList.add('caretka-type')

    setTimeout(() => {
        caretka.style.cssText = `
            left: 1100px;
            top: 245px;
        `;
    }, 3900);
}


function invocation() {
    if(ru.classList.contains('active')) {
        App(words_ru);
    } else {
        App(words_en);
    }
}


invocation();
const text = document.getElementById('line');
const key_animate = document.getElementById('H');
const caretka = document.getElementById('caretka');

const punct = document.getElementById('punct');
const numbers = document.getElementById('numbers');
const en = document.getElementById('en');
const ru = document.getElementById('ru');
const activing_long = document.getElementById('activing');
const long_10 = document.getElementById('long_10');
const long_20 = document.getElementById('long_20');
const long_50 = document.getElementById('long_50');
const long_80 = document.getElementById('long_80');


const section = document.getElementById('section');
// добавляем классы по умолчанию
long_10.classList.add('active_block');
en.classList.add('active_block');

let text_num = 0;
let key_num = 0;
let error_num = 0;
let sentence = '';
let caretka_Interval = 0;
let timerId = 0;
let long_text = 10;
let space_num = 0;
let num_massiv_space = 0;
let controller_delate_text = 150;
let controller_delate_spaceText = 0;


// let controller_wordCreate = true;

let controller_space_backspace = true;
let controller_space_number_characters = true;
let controller_space = true;

// переменные для подсчета секунд и минут в таймере
let second = 0;

// контроллер для одного вызова функции WPM
let controller_wpm = true;

// коонтроллер для удаления и добавления мигания каретке
let controller_caretka = true;

// переменная для контроля вызова функции caretka-blink, что бы она вызывалась один раз
let controller_setCaretka = true;

// контролеры для анимаций сайт бара
let controller_punct = 0;
let controller_numbers = 0; 

// переменная для контроля вызова функции Timer, что бы она вызывалась один раз.
let controller = 0;

let wpm = 0;
let acc = 0;

const space_letter = [];

const mod_keys = ['Alt', 'Tab', 'Enter', 'Control', 'Shift', 'CapsLock', 'Meta', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight', 'NumLock', 'Home', 'Clear', 'Insert', 'Delete', 'End', 'PageUp', 'PageDown', 'ScrollLock', 'Pause', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Escape', 'LaunchApplication1', 'LaunchMail', 'MediaPlayPause', 'AudioVolumeUp', 'AudioVolumeDown', 'AudioVolumeMute', 'Backspace'];

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
    clearInterval(caretka_Interval);

    text_num = 0;
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

        acc = 0;
        wpm = 0;
        second = 0
        space_num = 0;
        error_num = 0;
        key_num = 0;
        num_massiv_space = 0;
        space_letter.length = 0;
        controller_delate_spaceText = 0;
        controller_delate_text = 150;

        controller = 0;
        controller_wpm = true;
        controller_space = true;
        controller_space_backspace = true;
        controller_wordCreate = true;
        text.textContent = '';

        returnText();
        blinkCaretka();
        positionCaretka();
}

function Keyboard(code, key) {
    window.addEventListener(
        'keydown', (event) => {

        const space_back = document.getElementById(`${space_num} i${key_num}`)
        if(space_back !== null && space_back !== undefined) controller_space_backspace = true;
        if(sentence[key_num] == ' ' && space_back === null) controller_space_number_characters = true;

        if(event.code == 'Backspace' && sentence.length > key_num) {
            const space_word = document.getElementById(`${space_num} i${key_num}`)
            if(space_word !== null && space_word !== undefined && controller_space_backspace == true) {
                space_word.remove();

                space_letter[space_letter.length - 1].pop();

                if(space_letter[space_letter.length - 1].length == 0) {
                    space_letter.pop()
                }
                space_num -= 1;
                controller_space_number_characters = true;
            } else {
                let id_word = document.getElementById(`${sentence[key_num - 1] + (key_num - 1)}`);
                id_word.classList.remove('wh') || id_word.classList.remove('error');
                if (key_num > 0) key_num -= 1;
                controller_space = true;
            }
        }
            
        else if(sentence[key_num] == ' ' && sentence[key_num] != key && mod_keys.includes(event.key) == false) {
            if(controller_space_number_characters == false) return;
            else {
                const space_word = document.getElementById(`${space_num} i${key_num}`);
                ++space_num;
                ++error_num;
    
                if(space_word !== null && space_word !== undefined && controller_space == true) {
                    space_word.insertAdjacentHTML("afterend", `<letter id="${space_num} i${key_num}" class="space_error">${key}</letter>`);
    
                    space_letter[space_letter.length - 1].push(key);
                } else {
                    const id_word = document.getElementById(`${sentence[key_num - 1] + (key_num - 1)}`);
                    id_word.insertAdjacentHTML("afterend", `<letter id="${space_num} i${key_num}" class="space_error">${key}</letter>`);
    
                    space_letter.push([key]);
    
                    controller_space = true;
                }
                let key_animate = document.getElementById(code);
                if (key_animate) {
                    key_animate.classList.add('keybord-error');
                };
                setTimeout(() => {
                    key_animate.classList.remove('keybord-error')}, 200);
            }

            if(space_letter[space_letter.length - 1].length >= 19) controller_space_number_characters = false;
        }

        else if (sentence.length > key_num && mod_keys.includes(event.key) == false) {
            if(sentence[key_num] == key) keyType('wh', 'keybord-animate', code);
            else if(sentence[key_num] != key) keyType('error', 'keybord-error', code);
        }

        if(sentence.length == key_num && controller_wpm == true) WPM();
        if(key_num == (192 - space_num)) delateText();

        if(sentence.length > key_num) positionCaretka();
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
    en.classList.remove('active_block');

    ru.classList.add('active_block');

    ChangingKeys(keybord_ru);
    invocation();
});

en.addEventListener('click', () => {
    // удаляем классы
    ru.classList.remove('active_block');

    // добавляем классы
    en.classList.add('active_block');

    ChangingKeys(keybord_en);
    invocation();
});

long_10.addEventListener('click', () => {
    // удаляем классы
    long_80.classList.remove('active_block');

    long_50.classList.remove('active_block');

    long_20.classList.remove('active_block');

    // добавляем классы

    long_10.classList.add('active_block');

    long_text = 10;
    invocation();
});

long_20.addEventListener('click', () => {
    // удаляем классы
    long_80.classList.remove('active_block');

    long_50.classList.remove('active_block');

    long_10.classList.remove('active_block');

    // добавляем классы
    long_20.classList.add('active_block');

    long_text = 20;
    invocation();
});

long_50.addEventListener('click', () => {
    // удаляем классы
    long_80.classList.remove('active_block');

    long_20.classList.remove('active_block');

    long_10.classList.remove('active_block');

    // добавлем кл
    long_50.classList.add('active_block');

    long_text = 50;
    invocation();
});

long_80.addEventListener('click', () => {
    // удаляем классы
    long_50.classList.remove('active_block');

    long_20.classList.remove('active_block');

    long_10.classList.remove('active_block');

    // добавлем классы
        
    long_80.classList.add('active_block');

    long_text = 80;
    invocation();
});

function keyType(classWord, classKey, event_code) {
    if (timerId < 1)  timerId = setInterval(() => second += 1, 1000);

    let id_word = document.getElementById(`${sentence[key_num] + key_num}`);
    id_word.classList.add(classWord);
    ++key_num;
    if(classWord == 'error') error_num += 1;

    // анимация клавиатуры при не правильных нажатиях
    let key_animate = document.getElementById(event_code);
    if (key_animate) {
       key_animate.classList.add(classKey);
    };
    setTimeout(() => {
        key_animate.classList.remove(classKey)}, 200);

    clearInterval(caretka_Interval);
    controller_space = false;
    controller_space_backspace = false;
}

function blinkCaretka() {
    caretka_Interval = setInterval(() => {
        if (controller_setCaretka == true) {
            caretka.classList.add('caretka-blink'); 
            controller_setCaretka = false;
        } else {
            caretka.classList.remove('caretka-blink')
            controller_setCaretka = true;
        }
    }, 550);
}

function ChangingKeys(language) {
    for(let i = 0; i < key_keybord.length; i++) {
        const change_key = document.getElementById(key_keybord[i]);
        change_key.textContent = language[i];
    }
}

function positionCaretka() {
    let letter = document.getElementById(`${sentence[key_num] + key_num}`);
    let coordinats_letter = letter.getBoundingClientRect();
    caretka.style.left = `${coordinats_letter.left}px`;
    caretka.style.top = `${coordinats_letter.top + 34}px`
}

function WPM() {
    controller_wpm = false;
    clearInterval(timerId);

    acc = Math.floor(100 - (error_num / key_num * 100));

    let minutes = second / 60;
    let wpm_1 = Math.floor(long_text / minutes);

    wpm = Math.floor(wpm_1 - ((error_num / minutes) / 2));
    if (wpm < 0 || isNaN(wpm)) wpm = 0;
    if (acc < 0) acc = 0;

    console.log(`WPM: ${wpm}; ACC: ${acc}`);
}

function returnText() {
    for (let char of sentence) {
            text.innerHTML += `<letter id="${char + text_num}">${char}</letter>`;
            ++text_num;
    };
}

function delateText() {
    for(let i = 40; controller_delate_text > 0; i++) {
        const id_word = document.getElementById(`${sentence[key_num - i] + (key_num - i)}`);
        const space_word = document.getElementsByClassName('space_error');
        for (let elem of space_word) {
            elem.remove();
        }

        if(id_word !== null && id_word !== undefined) id_word.remove();
        controller_delate_text -= 1;
    }
}


function invocation() {
    if(ru.classList.contains('active_block')) {
        App(words_ru);
    } else {
        App(words_en);
    }
}


invocation();
const word = "pokkers";  // Change this to any 7-letter word you want
const validWords = ["afblijf", "afwacht", "afwrijf", "afzocht", "aquavit", "aquifer", "accubak", "affiche", "affixen", "afhecht","aflicht", "afschaf", "babybox", "babypop", "boxcalf", "babybus", "bijwijf", "babybad", "babybed", "babybos","babyvet", "bezwijk", "bezwijm", "babyaap", "cycloop", "cynisch", "chiquer", "cowboys", "cyclaam", "callboy","chatbox", "cheques", "citybag", "cliques", "complex", "cyborgs", "cycline", "cynicus", "calques", "calypso","duoquiz", "dactyli", "display", "damclub", "dijkweg", "djilbab", "doortyp", "duchtig", "duwwerk", "daghulp","deejays", "dialyse", "dichtst", "dijkvak", "dijkval", "dikwerf", "exquise", "equinox", "excerpt", "exclave","exvrouw", "epifyse", "equipes", "exprofs", "ecstasy", "embryos", "employe", "epoques", "excuses", "exempel","exprovo", "extract", "grizzly", "gympjes", "gelobby", "gymzaal", "gehypet", "gifwijk", "glycine", "gympies","gewicht", "gezicht", "gezucht", "gifpijl", "glypten", "gameboy", "gateway", "gechipt", "hickory", "hobbyde","hockeyt", "halcyon", "hijzelf", "hobbyen", "hyacint", "hybride", "holpijp", "hotjazz", "hachjes", "hakbijl","halfweg", "halfzus", "hemzelf", "hopbouw", "ikzucht", "ijsclub", "idylles", "ijsbijl", "incheck", "infobox","inzicht", "idyllen", "ijsshow", "ijsvrij", "ijswijn", "ijswolk", "ijzigst", "inexact", "intypte", "inwacht","jacquet", "jacuzzi", "jockeys", "jijzelf", "jukebox", "jurylid", "jichtig", "joyeuze", "jachtig", "jackpot","jerseys", "jijvorm", "jouzelf", "juichte", "juwelig", "jachtte", "kaffiya", "kumquat", "keycard", "klysmas","kolchoz", "kutwijf", "kwabbig", "kwikwis", "ketchup", "koelbox", "krypton", "kwalijk", "kwebbel", "kwikbak","kijkhut", "kiwiijs", "ladyboy", "lyrisch", "lymfvat", "lynxoog", "liftboy", "lyceums", "lychees", "lynchte","lyricus", "lobbyde", "lynchen", "liquida", "liquide", "lobbyen", "luxehut", "lachbek", "mimicry", "maxwell","mystici", "muzisch", "mystica", "mailbox", "maximum", "mijzelf", "marques", "mimisch", "mixtape", "mixtuur","mystiek", "machtig", "magisch", "manwijf", "nazicht", "nablijf", "nazocht", "nichtje", "nobodys", "nachtje","nebbisj", "nicheje", "naricht", "naschok", "nawijst", "nippels", "nuchter", "nuffige", "nabauwt", "nadacht","opzicht", "offdays", "opblijf", "opwacht", "opwrijf", "opzocht", "overtyp", "omzwikt", "oplicht", "oplucht","opschep", "opschik", "opzweep", "opzwelt", "omschep", "opkocht", "playboy", "popquiz", "privacy", "psyches","playoff", "papyrus", "perplex", "pijpzak", "plaques", "prequel", "pyjamas", "payroll", "perspex", "pickups","pleeboy", "postbox", "quatsch", "quiches", "quizzen", "quivive", "quidams", "quorums", "quotums", "quakers","quilten", "quoteje", "quartes", "quasars", "queeste", "quoteer", "quanten", "queueen", "recycle", "royalty","rectrix", "rugbyde", "rugbyer", "requiem", "rugbyen", "ruwbouw", "rapcrew", "richtig", "rijmpje", "reality","rechtop", "remixes", "remixte", "restyle", "sixpack", "salicyl", "schicht", "shimmys", "shimmyt", "slowfox","schacht", "schrijf", "simplex", "skylabs", "spambox", "spyware", "squasht", "subtype", "syfilis", "syllabi","typisch", "toxisch", "tilbury", "toxicum", "tubifex", "tyfeuze", "tachyon", "thyrsus", "triplex", "typetje","taxibus", "taxiwet", "tequila", "thymine", "tomboys", "topclub", "utility", "uberich", "uitwijk", "uitzijg","uitlach", "uitspuw", "uitwijs", "uitwipt", "uitzift", "uitbijt", "uitbouw", "uithouw", "uitjouw", "uitkijk","uitkwam", "uitvouw", "vakjury", "viswijf", "valpijp", "verwijf", "verzijp", "verzwik", "vijfbak", "visclub","volleys", "volleyt", "valbijl", "varsity", "veejays", "verwijl", "verzwak", "vijfjes", "whiskys", "whiskey","wherrys", "wijzelf", "waxcoat", "wichtig", "wichtje", "wijzigt", "wegwijs", "wegwuif", "welwijs", "wichelt","wijfjes", "wijkbus", "wijzing", "xylitol", "yuppies", "yahtzee", "yoghurt", "ypsilon", "yttrium", "yogales","yankees", "zijzelf", "zwemjuf", "zakpijp", "zoekbox", "zuchtig", "zuchtje", "zwemlip", "zwijmel", "zeewijf","zijbalk", "zijklep", "zijvlak"]


const maxAttempts = 6;
let currentAttempt = 0;
let currentGuess = "";

const gameBoard = document.getElementById('game-board');
const message = document.getElementById('message');
const keys = document.querySelectorAll('.key');
const enterKey = document.getElementById('enter');
const deleteKey = document.getElementById('delete');
const winModal = document.getElementById('winModal');
const span = document.getElementsByClassName('close')[0];
const correctWordElement = document.getElementById('correctWord');

// Event listeners for virtual keyboard keys
keys.forEach(key => {
    key.addEventListener('click', (event) => handleKeyPress(event.target.textContent));
});
enterKey.addEventListener('click', handleSubmitGuess);
deleteKey.addEventListener('click', handleDeleteLetter);

// Event listener for physical keyboard keys
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleSubmitGuess();
    } else if (event.key === 'Backspace') {
        handleDeleteLetter();
        event.preventDefault(); // Prevent the default action to avoid any unwanted behavior
    } else if (event.key.match(/^[a-z]$/i)) {
        handleKeyPress(event.key.toLowerCase());
    }
});

function handleKeyPress(letter) {
    if (currentGuess.length < 7 && /^[a-z]$/i.test(letter)) {  // Updated length to 7
        currentGuess += letter.toLowerCase();  // Normalize input to lowercase
        updateCurrentRow();
    }
}

function handleDeleteLetter() {
    if (currentGuess.length > 0) {
        currentGuess = currentGuess.slice(0, -1);
        updateCurrentRow();
    }
}

function updateCurrentRow() {
    const row = gameBoard.children[currentAttempt];
    const letters = row.children;
    for (let i = 0; i < 7; i++) {  // Updated length to 7
        letters[i].textContent = currentGuess[i] || "";
    }
}

function handleSubmitGuess() {
    currentGuess = currentGuess.trim().toLowerCase();  // Normalize and trim input
    if (currentGuess.length !== 7) {  // Updated length to 7
        alert('Please enter a 7 letter word');
        return;
    }

    if (!validWords.includes(currentGuess)) {
        message.textContent = 'Woord bestaat niet';
        return;
    }

    const row = gameBoard.children[currentAttempt];
    const correctWordLetters = word.split('');
    const guessLetters = currentGuess.split('');

    let correctGuess = true;
    const letterStatus = {};

    // First pass: check for correct letters
    for (let i = 0; i < 7; i++) {  // Updated length to 7
        const letterDiv = row.children[i];
        const letter = currentGuess[i];

        if (letter === word[i]) {
            letterDiv.classList.add('correct');
            correctWordLetters[i] = null;  // Mark this letter as used
            guessLetters[i] = null;
            letterStatus[letter] = 'correct';
        } else {
            correctGuess = false;
        }
    }

    // Second pass: check for present letters
    for (let i = 0; i < 7; i++) {  // Updated length to 7
        const letterDiv = row.children[i];
        const letter = currentGuess[i];
        const keyButton = Array.from(keys).find(key => key.textContent.toLowerCase() === letter);

        if (guessLetters[i] !== null && correctWordLetters.includes(letter)) {
            letterDiv.classList.add('present');
            correctWordLetters[correctWordLetters.indexOf(letter)] = null;  // Mark this letter as used
            letterStatus[letter] = 'present';
        } else if (guessLetters[i] !== null) {
            letterDiv.classList.add('absent');
            if (!letterStatus[letter]) {
                letterStatus[letter] = 'absent';
            }
        }
    }

    // Update keyboard letter status
    for (const [letter, status] of Object.entries(letterStatus)) {
        const keyButton = Array.from(keys).find(key => key.textContent.toLowerCase() === letter);
        if (keyButton) {
            keyButton.classList.remove('correct', 'present', 'absent');
            keyButton.classList.add(status);
        }
    }

    currentAttempt++;
    currentGuess = "";

    if (correctGuess) {
        correctWordElement.textContent = word;
        winModal.style.display = "block";
    } else if (currentAttempt >= maxAttempts) {
        message.textContent = `Game over! Het woord was ${word}.`;
    }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    winModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === winModal) {
        winModal.style.display = "none";
    }
}

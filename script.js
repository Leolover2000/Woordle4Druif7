const word = "pokkers";  // Change this to any 7-letter word you want
const validWords = ["aapbaar", "aangebracht", "aanpakbaar", "aanraakbaar", "aanvaardbaar", "aanwijsbaar"]; // Add more valid 7-letter words
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

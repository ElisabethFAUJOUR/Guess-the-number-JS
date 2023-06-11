const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
const resetButton = document.createElement('button');

let randomNumber;
let guessCount = 1;

/**
 * Generate a random number
 */
function generateRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Init game
 */
function initGame() {
  randomNumber = generateRandomNumber(1, 100);
  guessCount = 1;
  guesses.textContent = '';
  lastResult.textContent = '';
  lowOrHi.textContent = '';
  guessField.disabled = false;
  guessSubmit.disabled = false;
  resetButton.parentNode && resetButton.parentNode.removeChild(resetButton);
  guessField.value = '';
  guessField.focus();
}

/**
 * Check the input value 
 */
function checkGuess() {
  const userGuess = parseInt(guessField.value);
  
  if(userGuess === 'Nan') { 
    guesses.textContent += userGuess + ' ';
  }

  if (isNaN(userGuess)) {
    return;
  } else if (userGuess === randomNumber) {
    showResult(`Bravo, vous avez trouvé le nombre : ${randomNumber} !`);
    lowOrHi.classList.remove('low', 'high');
    lowOrHi.textContent = '';
    setGameOver();
  } else if (guessCount === 10) {
    showResult('!!! PERDU !!!');
    setGameOver();
  } else {
    if (userGuess < randomNumber) {
      lowOrHi.textContent = 'Trop PETIT';
      lowOrHi.classList.add('low');
      lowOrHi.classList.remove('high');
    } else {
      lowOrHi.textContent = 'Trop GRAND';
      lowOrHi.classList.add('high');
      lowOrHi.classList.remove('low');
    }
  }
  guessCount++;
  guessField.value = '';
  guessField.focus();
}

function handleSubmitClick() {
  const guessSubmit = document.querySelector('.guessSubmit');
  guessSubmit.addEventListener('click', checkGuess);
}

/**
 * Show the result
 */
function showResult(message) {
  lastResult.textContent = message;
}

/**
 * End game and start a new game
 */
function setGameOver() {
  const resultParas = document.querySelector('.resultParas');
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton.textContent = 'Rejouer ?';
  resetButton.classList.add('resetButton');
  resultParas.appendChild(resetButton);
  resetButton.addEventListener('click', initGame);
}

initGame();
handleSubmitClick();
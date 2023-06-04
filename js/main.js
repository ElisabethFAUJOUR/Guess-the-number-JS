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
  guesses.textContent += userGuess + ' ';

  if (userGuess === randomNumber) {
    showResult('Bravo, vous avez trouvé le nombre !', 'green');
    setGameOver();
  } else if (guessCount === 10) {
    showResult('!!! PERDU !!!', 'red');
    setGameOver();
  } else {
    showResult('Faux !', 'red');
    lowOrHi.textContent = userGuess < randomNumber ? 'Le nombre saisi est trop petit !' : 'Le nombre saisi est trop grand !';
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
function showResult(message, color) {
  lastResult.textContent = message;
  lastResult.style.backgroundColor = color;
}

/**
 * End game and start a new game
 */
function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton.textContent = 'Commencer une nouvelle partie';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', initGame);
}

initGame();
handleSubmitClick();
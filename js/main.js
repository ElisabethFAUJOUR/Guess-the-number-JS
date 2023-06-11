const app = {

  guesses: document.querySelector('.guesses'),
  lastResult: document.querySelector('.lastResult'),
  lowOrHi: document.querySelector('.lowOrHi'),
  guessSubmit: document.querySelector('.guessSubmit'),
  guessField: document.querySelector('.guessField'),
  resetButton: document.createElement('button'),

  randomNumber: null,
  guessCount: 1,

  // ----- init -----

  init() {
    app.initGame();
    app.listenToSubmitClick();
  },

  // ----- functions -----

  /**
   * Generate a random number
   * @param {number} min 
   * @param {number} max 
   * @returns {number} - random number 
   */
  generateRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  /**
   * Init game
   */
  initGame() {
    app.randomNumber = app.generateRandomNumber(1, 100);
    app.guessCount = 1;
    app.guesses.textContent = '';
    app.lastResult.textContent = '';
    app.lowOrHi.textContent = '';
    app.guessField.disabled = false;
    app.guessSubmit.disabled = false;
    app.resetButton.parentNode && app.resetButton.parentNode.removeChild(app.resetButton);
    app.guessField.value = '';
    app.guessField.focus();
  },

  /**
   * Check the input value 
   * @returns 
   */
  checkGuess() {
    const userGuess = parseInt(app.guessField.value);

    if (userGuess === 'Nan') {
      app.guesses.textContent += userGuess + ' ';
    }

    if (isNaN(userGuess)) {
      return;
    } else if (userGuess === app.randomNumber) {
      app.showResult(`Bravo, vous avez trouvé le nombre : ${app.randomNumber} en ${app.guessCount} coups !`);
      app.lowOrHi.classList.remove('low', 'high');
      app.lowOrHi.textContent = '';
      app.setGameOver();
    } else if (app.guessCount === 10) {
      app.showResult('!!! PERDU !!!');
      app.setGameOver();
    } else {
      if (userGuess < app.randomNumber) {
        app.lowOrHi.textContent = 'Trop PETIT';
        app.lowOrHi.classList.add('low');
        app.lowOrHi.classList.remove('high');
      } else {
        app.lowOrHi.textContent = 'Trop GRAND';
        app.lowOrHi.classList.add('high');
        app.lowOrHi.classList.remove('low');
      }
    }
    app.guessCount++;
    app.guessField.value = '';
    app.guessField.focus();
  },

  /**
   * Show the result
   * @param {string} message 
   */
  showResult(message) {
    app.lastResult.textContent = message;
  },

  /**
   * End game and start a new game
   */
  setGameOver() {
    const resultParas = document.querySelector('.resultParas');
    app.guessField.disabled = true;
    app.guessSubmit.disabled = true;
    app.resetButton.textContent = 'Rejouer ?';
    app.resetButton.classList.add('resetButton');
    resultParas.appendChild(app.esetButton);
    app.resetButton.addEventListener('click', app.initGame);
  },

  // ----- listener events -----

  listenToSubmitClick() {
    const guessSubmit = document.querySelector('.guessSubmit');
    guessSubmit.addEventListener('click', app.checkGuess);
  }

};

window.addEventListener('DOMContentLoaded', app.init);
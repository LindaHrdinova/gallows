const wordAreaElm = document.querySelector('.wordArea');
const lettersButtonsElm = document.querySelectorAll('.letter');
const imgElm = document.querySelector('.gallows__img');
const gameOverElm = document.querySelector('.gameOver');
const resetButtonElm = document.getElementById('gameOver__reset');

console.log('Hello world!');

const words = [
  ['k', 'a', 'b', 'e', 'l'],
  ['k', 'u', 'k', 'l', 'a'],
  ['k', 'l', 'a', 'u', 'n'],
  ['m', 'r', 'k', 'e', 'v'],
  ['p', 'r', 'v', 'e', 'k'],
  ['s', 't', 'r', 'o', 'm'],
  ['v', 'l', 'n', 'k', 'a'],
  ['p', 'e', 's'],
  ['v', 'l', 'k'],
  ['k', 'o', 's'],
  ['m', 'y', 's'],
];

let mistakes = 0;

const randomedNumber = () => Math.floor(Math.random() * words.length);

let guessedWord = words[randomedNumber()];
console.log(guessedWord);

const showWord = (guessedWord) => {
  let textToShow = '';
  guessedWord.map(() => (textToShow += '_'));
  console.log(textToShow);
  return textToShow;
};

wordAreaElm.textContent = showWord(guessedWord);

const resetGame = () => {
  console.log('resetgame');
  mistakes = 0;
  imgElm.src = `/gallows_img/gallows_${mistakes}.png`;
  gameOverElm.toggleAttribute('hidden');
  lettersButtonsElm.forEach((letter) => (letter.disabled = false));
  let guessedWord = words[randomedNumber()];
  console.log(guessedWord);
  showWord(guessedWord);
};

const gameFunction = (letter) => {
  letter.addEventListener('click', (e) => {
    console.log(e.target.textContent);
    letter.disabled = true;

    if (mistakes < 6) {
      mistakes += 1;
      imgElm.src = `/gallows_img/gallows_${mistakes}.png`;
    }

    if (mistakes >= 6) {
      lettersButtonsElm.forEach((letter) => (letter.disabled = true));
      gameOverElm.toggleAttribute('hidden');
    }
  });
};

lettersButtonsElm.forEach((letter) => gameFunction(letter));
resetButtonElm.addEventListener('click', () => resetGame());

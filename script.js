const wordAreaElm = document.querySelector('.wordArea');
const lettersButtonsElm = document.querySelectorAll('.letter');
const imgElm = document.querySelector('.gallows__img');
const gameOverElm = document.querySelector('.gameOver');
const resetButtonElm = document.getElementById('gameOver__reset');
const gameOverTextElm = document.querySelector('.gameOver__text');

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
let wordLength = guessedWord.length;
let hiddenWord = guessedWord.map(() => '_');

console.log('hidden word', hiddenWord);
const showWord = (hiddenWord) => {
  let textToShow = '';
  hiddenWord.map(() => (textToShow += '_'));
  return textToShow;
};

wordAreaElm.textContent = showWord(guessedWord);

const resetGame = () => {
  console.log('resetgame');
  mistakes = 0;
  imgElm.src = `gallows_img/gallows_${mistakes}.png`;
  gameOverElm.toggleAttribute('hidden');
  lettersButtonsElm.forEach((letter) => (letter.disabled = false));
  guessedWord = words[randomedNumber()];
  console.log(guessedWord);
  wordAreaElm.textContent = showWord(guessedWord);
  wordLength = guessedWord.length;
  hiddenWord = guessedWord.map(() => '_');
};

const gameFunction = (letter) => {
  letter.addEventListener('click', (e) => {
    console.log(e.target.textContent);
    letter.disabled = true;

    mistakes += checkWord(
      guessedWord,
      e.target.textContent.toLowerCase(),
      hiddenWord,
    );

    console.log();
    if (mistakes < 6) {
      imgElm.src = `gallows_img/gallows_${mistakes}.png`;
    }

    if (mistakes >= 6) {
      lettersButtonsElm.forEach((letter) => (letter.disabled = true));
      gameOverTextElm.textContent = 'Bohužel jsi prohrál.';
      gameOverElm.toggleAttribute('hidden');
    }

    if (wordLength === 0) {
      lettersButtonsElm.forEach((letter) => (letter.disabled = true));
      gameOverTextElm.textContent = 'Gratuluju, odhalil jsi tajenku!';
      gameOverElm.toggleAttribute('hidden');
    }
  });
};

const checkWord = (text, letter, hidden) => {
  let letterFind = 0;
  wordAreaElm.textContent = '';
  for (let i = 0; i < text.length; i++) {
    if (letter === text[i]) {
      letterFind += 1;
      wordLength -= 1;
      hidden[i] = letter;
      console.log(hidden);
    }
  }

  for (let i = 0; i < text.length; i++) wordAreaElm.textContent += hidden[i];
  if (letterFind === 0) {
    return 1;
  } else {
    return 0;
  }
};

lettersButtonsElm.forEach((letter) => gameFunction(letter));
resetButtonElm.addEventListener('click', () => resetGame());

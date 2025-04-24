'use strict';

import Game from '../modules/Game.class';

const game = new Game();

game.start();

const fieldElement = document.querySelector('.game-field tbody');
const scoreElement = document.querySelector('.game-score');
const statusElement = document.querySelector('.message-container .message');
const buttonStart = document.querySelector('.button.start');

function render() {
  fieldElement.innerHTML = '';

  const state = game.getState();

  for (let row = 0; row < state.length; row++) {
    const tr = document.createElement('tr');

    tr.classList.add('field-row');

    for (let col = 0; col < state[row].length; col++) {
      const value = state[row][col];
      const cell = document.createElement('td');

      cell.classList.add('field-cell');

      if (value !== 0) {
        cell.textContent = value;
        cell.classList.add(`field-cell--${value}`);
      }

      tr.appendChild(cell);
    }

    fieldElement.appendChild(tr);
  }

  scoreElement.textContent = game.getScore();

  const stats = game.getStatus();

  if (stats === 'win') {
    statusElement.textContent = 'Winner! Congrats! You did it!';
    statusElement.classList.remove('hidden');
  } else if (stats === 'idle') {
    statusElement.textContent = 'Press "Start" to begin game. Good luck!';
    statusElement.classList.remove('hidden');
  } else {
    statusElement.classList.add('hidden');
  }

  if (stats === 'lose') {
    statusElement.textContent = 'You lose! Restart the game?';
    statusElement.classList.remove('hidden');
  }

  buttonStart.textContent = 'Restart';
  buttonStart.classList.remove('start');
  buttonStart.classList.add('restart');
}

document.addEventListener('keydown', (ev) => {
  if (game.getStatus() !== 'playing') {
    return;
  }

  if (ev.key === 'ArrowUp') {
    game.moveUp();
  } else if (ev.key === 'ArrowDown') {
    game.moveDown();
  } else if (ev.key === 'ArrowRight') {
    game.moveRight();
  } else if (ev.key === 'ArrowLeft') {
    game.moveLeft();
  }

  if (game.isGameOver()) {
    game.status = 'lose';
  }

  render();
});

buttonStart.addEventListener('click', () => {
  game.restart();
  render();
});

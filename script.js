'use strict';

// *Selecting Elements*
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); //Mthd-1 to select a id
const score1El = document.getElementById('score--1'); //Mthd-2 to select a id
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// We need to declare these score,currentScore,activePlayer,playing Globally

let score, currentScore, activePlayer, playing;

// *Initial Conditions*
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};
init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active'); //TOGGLE Agr active-player class hogi tph hta dega agr nhi hogi toh lga dega.
  player1El.classList.toggle('player--active');
};

// *Rolling a button*

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; // Trick to acces src of the image in the HTML
    // 3. Check if the number is not 1 add to Current score
    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore;
    } else {
      // Switch the player
      switchPlayer();
    }
  }
});

// *Hold Button*

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1.Add the current score to active player's Totalscore
    score[activePlayer] = score[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // 2. If the Totalscore is 100 or greater Finish the game
    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    }

    // Else switch to other player
    else {
      switchPlayer();
    }
  }
});

// *Restarting the Game

btnNew.addEventListener('click', init);

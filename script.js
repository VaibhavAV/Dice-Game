"use strict";
// selecting elements
const score0E1 = document.querySelector("#score--0");
const score1E1 = document.getElementById("score--1");
const current0E1 = document.getElementById("current--0");
const current1E1 = document.getElementById("current--1");

const player0E1 = document.querySelector(".player--0");
const player1E1 = document.querySelector(".player--1");

const diceE1 = document.querySelector(".dice");

const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");

// starting condition
let currnetScore, activePlayer, scores, playing;

const init = function () {
  currnetScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  score0E1.textContent = 0;
  score1E1.textContent = 0;

  current0E1.textContent = 0;
  current1E1.textContent = 0;

  diceE1.classList.add("hidden");
  player0E1.classList.remove("player--winner");
  player1E1.classList.remove("player--winner");

  player0E1.classList.add("player--active");
  player1E1.classList.remove("player--active");
};
init();

//Rolling Functionality

btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. Generate Random Number
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2.Display Dice

    diceE1.classList.remove("hidden");
    diceE1.src = `dice-${dice}.png`;

    //3.check for roll1: if true, switch to next player
    if (dice !== 1) {
      currnetScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currnetScore;
      // current0E1.textContent = currnetScore; we can do this dynamic
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currnetScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0E1.classList.toggle("player--active");
      player1E1.classList.toggle("player--active");
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // add current score to active player scores

    scores[activePlayer] += currnetScore;
    //scores[1] = scores[1]+ currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.check if players score is >=100
    // finish the game
    if (scores[activePlayer] > 100) {
      playing = false;
      diceE1.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //.switch to the next player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currnetScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0E1.classList.toggle("player--active");
      player1E1.classList.toggle("player--active");
    }
  }
});

btnNew.addEventListener("click", init);

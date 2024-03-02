'use strict';
let dice = document.querySelector(".dice");
let score1 = document.getElementById("score1");
let score2 = document.getElementById("score2");
let btnRollDice = document.querySelector('.roll');
let btnNew = document.querySelector(".reset");
let btnHold = document.querySelector(".hold");
let player1 = document.querySelector('.player1');
let player2 = document.querySelector('.player2');

// Starting Conditions
score1.textContent = 0;
score2.textContent = 0;
dice.classList.add("hidden");

// Rolling the dice
let randomNumber;
let addScore = 0;
let activePlayer = 1;
let totalScores = [0, 0];

const switchPlayer = function () {
    document.getElementById(`current--score${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 1 ? 2 : 1;
    addScore = 0; // The addscore should be set to 0 when the player is switched.
    // if (player1.classList.contains("player-active")) {
    //     player1.classList.remove("player-active");
    //     player2.classList.add("player-active");
    // }
    // else {
    //     player2.classList.remove("player-active");
    //     player1.classList.add("player-active");
    // }
    // We can do this with the toggle() method.
    player1.classList.toggle("player-active");
    player2.classList.toggle("player-active");
};


// Roll dice button
const rollDice = function () {
    // Generating a random number
    randomNumber = Math.trunc(Math.random() * 6) + 1;
    // Displaying the dice
    dice.classList.remove("hidden");
    dice.src = `dice-${randomNumber}.png`;
    if (randomNumber !== 1) {
        addScore += randomNumber;
        document.getElementById(`current--score${activePlayer}`).textContent = addScore;
    } else { // if the number is 1
        // Switching the active player
        switchPlayer();
    }
};
btnRollDice.addEventListener('click', rollDice);


// Hold button
const holdScore = function () {
    totalScores[activePlayer - 1] += addScore;
    document.getElementById(`score${activePlayer}`).textContent = totalScores[activePlayer - 1];
    if (totalScores[activePlayer - 1] < 100) { // if the total score is less than 100
        switchPlayer();
    }
    else { // if the total score is 100 or more
        // Finish the game
        document.querySelector(`.player${activePlayer}`).classList.add("player-winner");
        document.querySelector(`.player${activePlayer}`).classList.remove("player-active")

        // Removing the event listener after the game is finished.
        btnRollDice.removeEventListener('click', rollDice);
        btnHold.removeEventListener('click', holdScore);
        dice.classList.add("hidden");
    }
};
btnHold.addEventListener('click', holdScore);


btnNew.addEventListener('click', function () {
    score1.textContent = 0;
    score2.textContent = 0;
    dice.classList.add("hidden");
    document.getElementById(`current--score1`).textContent = 0;
    document.getElementById(`current--score2`).textContent = 0;
    document.querySelector(`.player${activePlayer}`).classList.remove("player-winner");
    player1.classList.add("player-active");
    player2.classList.remove("player-active");
    totalScores = [0, 0];
    activePlayer = 1;
    addScore = 0;
    btnRollDice.addEventListener('click', rollDice);
    btnHold.addEventListener('click', holdScore);
});

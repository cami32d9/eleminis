"use strict";

document.addEventListener("DOMContentLoaded", start);

const drawPile = document.querySelector("#drawpile");
const drawnCard = document.querySelector("#drawn");
const cardColors = ["water", "fire", "air", "plant", "rock"];
const handCards = document.querySelectorAll(".handcard");

let handCardsNumber = 0;
let randomCard = "";

let cardsLeft = 20;

function getRandom() {
    randomCard = cardColors[Math.floor(Math.random()*cardColors.length)];
}

function start() {
    console.log("Hi");
    drawPile.classList.add("cardback");
    drawPile.addEventListener("click", newCard);

    handCards.forEach(card => {
        handCardsNumber++;
        card.classList.add(`handcard${handCardsNumber}`);
    });
}

function newCard(player) {

    if (player === "opponent") {
        console.log("YOU LOSE");
    }

    if (randomCard === "") {

        cardsLeft--;
        console.log(cardsLeft);

    getRandom();

    cardColors.forEach(color => {
        drawnCard.classList.remove(`${color}`);
    });

    drawnCard.classList.add(`${randomCard}`);

    handCards.forEach(card => {
      card.addEventListener("click", addCardToHand);
    });
    }
}

function addCardToHand() {
    if (randomCard !== "") {
    cardColors.forEach(color => {
        drawnCard.classList.remove(`${color}`);
        this.classList.remove(`${color}`);
    });

    this.classList.add(`${randomCard}`);

    randomCard = "";

    opponentDraw();
    }
}

function opponentDraw() {
    setTimeout(function () {
        newCard("opponent")
    }, 1000);
}

"use strict";

document.addEventListener("DOMContentLoaded", start);

const drawPile = document.querySelector("#drawpile");
const drawnCard = document.querySelector("#drawn");
const cardElements = ["water", "fire", "air", "plant", "rock"];
const handCards = document.querySelectorAll(".handcard");

let handCardsNumber = 0;
let randomCard = "";

let cardsLeft = 5;

function getRandom() {
    randomCard = cardElements[Math.floor(Math.random()*cardElements.length)];
}

function start() {
    console.log("Hi");
    drawPile.classList.add("cardback");
    drawPile.textContent = cardsLeft;
    drawPile.addEventListener("click", newCard);

    handCards.forEach(card => {
        handCardsNumber++;
        card.classList.add(`handcard${handCardsNumber}`);
    });
}

function newCard(player) {
    // if (player === "opponent") {
    //     console.log("YOU LOSE");
    // }

    if (randomCard === "" && cardsLeft > 0) {

        cardsLeft--;
        drawPile.textContent = cardsLeft;
        console.log(cardsLeft);

    getRandom();

    cardElements.forEach(color => {
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
    cardElements.forEach(color => {
        drawnCard.classList.remove(`${color}`);
        this.classList.remove(`${color}`);
    });

    this.classList.add(`${randomCard}`);

    randomCard = "";

    // opponentDraw();
    }
}

function opponentDraw() {
    setTimeout(function () {
        newCard("opponent")
    }, 1000);
}

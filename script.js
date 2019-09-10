"use strict";

document.addEventListener("DOMContentLoaded", start);

const drawPile = document.querySelector("#drawpile");
const drawnCard = document.querySelector("#drawn");
const cardColors = ["blue", "red", "yellow", "green", "brown"];
const cards = document.querySelectorAll(".handcard");

let randomCard = "";

function getRandom() {
    randomCard = cardColors[Math.floor(Math.random()*cardColors.length)];
}

function start() {
    console.log("Hi");
    drawPile.classList.add("cardback");
    drawPile.addEventListener("click", newCard);
}

function newCard() {
    if (randomCard === "") {

    getRandom();

    cardColors.forEach(color => {
        drawnCard.classList.remove(`${color}card`);
    });

    drawnCard.classList.add(`${randomCard}card`);

    cards.forEach(card => {
      card.addEventListener("click", addCardToHand);
    });
    }
}

function addCardToHand() {
    cardColors.forEach(color => {
        drawnCard.classList.remove(`${color}card`);
        this.classList.remove(`${color}card`);
    });

    this.classList.add(`${randomCard}card`);


    randomCard = "";
}

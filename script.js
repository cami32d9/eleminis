"use strict";

document.addEventListener("DOMContentLoaded", getJson);


// ----- VARIABLES -----

const cardElements = ["water", "fire", "air", "plant", "rock"];

const drawPile = document.querySelector("#drawpile");
const drawnCard = document.querySelector("#drawn");
const handCards = document.querySelectorAll(".handcard");

let cardsLeft = 5;
let randomCard = "";


// ----- HELPING FUNCTIONS -----

async function getJson() {
    /* Loads the JSON */
    let pagesUrl = "eleminiCards.json";
    let jsonData = await fetch(pagesUrl);
    let elements = await jsonData.json();
    console.log(elements);

    start();
}

function getRandom() {
    randomCard = cardElements[Math.floor(Math.random() * cardElements.length)];
}


// ----- START GAME -----

function start() {
    drawPile.textContent = cardsLeft;
    drawPile.addEventListener("click", newCard);
}


// ----- RUNNING GAME -----

function newCard() {
    // Only if drawnCard is 'empty' and there are cards left
    if (randomCard === "" && cardsLeft > 0) {

        // Retract card from drawPile
        cardsLeft--;
        drawPile.textContent = cardsLeft;

        // Get drawn card
        getRandom();
        drawnCard.classList.add(`${randomCard}`);

        // Make drawn card placable on hand
        handCards.forEach(card => {
            card.addEventListener("click", addCardToHand);
        });

        if (cardsLeft === 0) {
            drawPile.style.visibility = "hidden";
        }
    }
}

function addCardToHand() {
    // Only if there is a drawnCard
    if (randomCard !== "") {

        // Remove current card from drawnCard and the clicked card on hand
        cardElements.forEach(element => {
            drawnCard.classList.remove(`${element}`);
            this.classList.remove(`${element}`);
        });

        // Adds the card to the clicked destination
        this.classList.add(`${randomCard}`);

        // Resets randomCard
        randomCard = "";

        if (cardsLeft === 0) {
            drawnCard.style.visibility = "hidden";
        }
    }
}

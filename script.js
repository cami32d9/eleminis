"use strict";

document.addEventListener("DOMContentLoaded", getJson);


// ----- VARIABLES -----

const cardElements = ["water", "fire", "air", "plant", "rock"];

const drawPile = document.querySelector("#drawpile");
const drawnCard = document.querySelector("#drawn");
const handCards = document.querySelectorAll(".handcard");

let cardsLeft = 0;
let randomElement = "";
let randomCard = "";
let elements = [];


// ----- HELPING FUNCTIONS -----

function getRandom() {
    randomElement = elements[Math.floor(Math.random() * elements.length)];
}


// ----- START GAME -----

async function getJson() {
    /* Loads the JSON */
    let pagesUrl = "eleminis.json";
    let jsonData = await fetch(pagesUrl);
    elements = await jsonData.json();

    start();
}

function start() {

    elements.forEach(element => {
        cardsLeft = cardsLeft + element.cardsLeft;
    });

    drawPile.textContent = cardsLeft;
    drawPile.addEventListener("click", newCard);
}


// ----- RUNNING GAME -----

function newCard() {
    // Only if drawnCard is 'empty' and there are cards left

    // console.log(randomElement.cardsLeft);

    if (randomCard === "" && cardsLeft > 0) {

        // Get drawn card
        getRandom();
        if (randomElement.cardsLeft > 0) {
            randomCard = randomElement.element;
            drawnCard.classList.add(`${randomCard}`);

            // Retract card from drawPile
            cardsLeft--;
            drawPile.textContent = cardsLeft;


            randomElement.cardsLeft--;
            console.log(randomElement.cardsLeft);

            // Make drawn card placable on hand
            handCards.forEach(card => {
                card.addEventListener("click", addCardToHand);
            });

            if (cardsLeft === 0) {
                drawPile.style.visibility = "hidden";
            }
        }
        else {
            newCard();
        }
    }
}

function addCardToHand() {
    // Only if there is a drawnCard
    if (randomCard !== "") {

        if (randomCard)

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

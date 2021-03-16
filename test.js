'use strict'

const CARDS = [{ name: '2C', score: 2 }, { name: '3C', score: 3 }, { name: '4C', score: 4 }, { name: '5C', score: 5 }, { name: '6C', score: 6 }, { name: '7C', score: 7 }];
var playerHand = [];
var dealerHand = [];

function randomCard(gamerCards) {
    let cardIndex = Math.floor(CARDS.length * Math.random());

    let card = CARDS[cardIndex];
    let cardExists = gamerCards.some(t => t.name === card.name);

    while (cardExists) {
        cardIndex = Math.floor(CARDS.length * Math.random());
        card = CARDS[cardIndex];
        cardExists = gamerCards.some(t => t.name === card.name);
    }

    return card;
}

function dealPlayersCards() {
    playerHand = [randomCard(playerHand), randomCard(playerHand)];
    dealerHand = [randomCard(dealerHand), randomCard(dealerHand)];
}


dealPlayersCards();
console.log(playerHand);
console.log(dealerHand);
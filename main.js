'use strict'
// { name: '10D', score: 10 },{ name: 'AC', score: 11 }

var cards = [{ name: '2C', score: 2 }, { name: '3C', score: 3 }, { name: '4C', score: 4 }, { name: '5C', score: 5 }, { name: '6C', score: 6 }, { name: '7C', score: 7 }, { name: '8C', score: 8 }, { name: '9C', score: 9 }, { name: '10C', score: 10 }, { name: 'JC', score: 10 }, { name: 'QC', score: 10 }, { name: 'KC', score: 10 }, { name: 'AC', score: 11 },
{ name: '2D', score: 2 }, { name: '3D', score: 3 }, { name: '4D', score: 4 }, { name: '5D', score: 5 }, { name: '6D', score: 6 }, { name: '7D', score: 7 }, { name: '8D', score: 8 }, { name: '9D', score: 9 }, { name: '10D', score: 10 }, { name: 'JD', score: 10 }, { name: 'QD', score: 10 }, { name: 'KD', score: 10 }, { name: 'AD', score: 11 },
{ name: '2H', score: 2 }, { name: '3H', score: 3 }, { name: '4H', score: 4 }, { name: '5H', score: 5 }, { name: '6H', score: 6 }, { name: '7H', score: 7 }, { name: '8H', score: 8 }, { name: '9H', score: 9 }, { name: '10H', score: 10 }, { name: 'JH', score: 10 }, { name: 'QH', score: 10 }, { name: 'KH', score: 10 }, { name: 'AH', score: 11 },
{ name: '2S', score: 2 }, { name: '3S', score: 3 }, { name: '4S', score: 4 }, { name: '5S', score: 5 }, { name: '6S', score: 6 }, { name: '7S', score: 7 }, { name: '8S', score: 8 }, { name: '9S', score: 9 }, { name: '10S', score: 10 }, { name: 'JS', score: 10 }, { name: 'QS', score: 10 }, { name: 'KS', score: 10 }, { name: 'AS', score: 11 }]
var playerHand = [];
var dealerHand = [];
var statusMessage = '';


function doubleBet() {
    var bet = document.querySelector('#total-bet');
    bet.value = bet.value * 2;
    playerHand.push(randomCard(playerHand));
    document.querySelector('#player-side').innerHTML = '';
    printPlayerCards(playerHand);

    if (getTotalScore(playerHand) > 21) {
        statusMessage = `You Lose The Game :( Your Lose Is ${bet.value} $!`;
        gameStatus();
    } else {
        if (getTotalScore(playerHand) > getTotalScore(dealerHand)) {
            statusMessage = `Congratulation! You Win! Your Win Is ${bet.value}$!`;
            gameStatus();
        } else if (getTotalScore(playerHand) < getTotalScore(dealerHand)) {
            statusMessage = `You Lose The Game :( Your Lose Is ${bet.value}$!`;
            gameStatus();
        } else {
            statusMessage = `Draw! You Get Back Your Bet: ${bet.value}$!`;
            gameStatus();
        }
    }
}

function stand() {
    var bet = document.querySelector('#total-bet');

    dealerHand.push(randomCard(dealerHand));
    document.querySelector('#dealer-side').innerHTML = '';
    printDealerCards(dealerHand);

    if (getTotalScore(dealerHand) > 21) {
        statusMessage = `Congratulation! You Win! Your Win Is ${bet.value * 1.5}$!`;
        gameStatus();
    }

    if (getTotalScore(dealerHand) >= 17 && getTotalScore(dealerHand) < 21) {

        if (getTotalScore(dealerHand) > getTotalScore(playerHand)) {
            statusMessage = `You Lose The Game :( Your Lose Is ${bet.value}$!`;
            gameStatus();
        }
        else if (getTotalScore(dealerHand) < getTotalScore(playerHand)) {
            statusMessage = `Congratulation! You Win! Your Win Is ${bet.value * 1.5}$!`;
            gameStatus();
        }
        else { statusMessage = `Draw! You Get Back Your Bet: ${bet.value}$!` }

        gameStatus();
    }

}

function hit() {
    var bet = document.querySelector('#total-bet');
    playerHand.push(randomCard(playerHand));
    document.querySelector('#player-side').innerHTML = '';
    printPlayerCards(playerHand);

    if (getTotalScore(playerHand) > 21) {
        statusMessage = `You Lose The Game :( Your Lose Is ${bet.value} $!`;
        gameStatus();
    }
}

function surrender() {
    var bet = document.querySelector('#total-bet');

    statusMessage = `You Gave Up! You Lose ${bet.value / 2}$`;
    gameStatus();
}

function newGame() {

    document.querySelector('#result-window').classList.add('hidden');
    document.querySelector('#total-bet').value = '';

    document.querySelector('.dealerhand-cards').innerHTML = '';
    document.querySelector('.playerhand-cards').innerHTML = '';

    var dealBtn = document.querySelector('#deal-btn');
    dealBtn.classList.remove('hidden');

    dealPlayersCards();
    statusMessage = '';
}

function getTotalScore(hand) {
    var totalScore = 0
    for (var i = 0; i < hand.length; i++) {
        totalScore += hand[i].score;
    }
    return totalScore;
}

function randomCard(gamerCards) {
    let cardIndex = Math.floor(cards.length * Math.random());

    let card = cards[cardIndex];
    let cardExists = gamerCards.some(t => t.name === card.name);

    while (cardExists) {
        cardIndex = Math.floor(cards.length * Math.random());
        card = cards[cardIndex];
        cardExists = gamerCards.some(t => t.name === card.name);
    }

    return card;
}

function dealPlayersCards() {
    playerHand = [randomCard(playerHand), randomCard(playerHand)];
    dealerHand = [randomCard(dealerHand), randomCard(dealerHand)];
}

function printDealerCards(dealer) {
    dealer.forEach(card => {
        var dealerHandCardEl = document.createElement('img');
        dealerHandCardEl.src = `./imgs/cards/${card.name}.png`;

        document.querySelector('#dealer-side').appendChild(dealerHandCardEl);
    })
}


function printPlayerCards(player) {
    player.forEach(card => {
        var playerHandCardEl = document.createElement('img');
        playerHandCardEl.src = `./imgs/cards/${card.name}.png`;

        document.querySelector('#player-side').appendChild(playerHandCardEl);
    })
}

function gameStatus() {

    document.querySelector('#result-window').classList.remove('hidden');

    document.querySelector('#dealer-side').innerHTML = '';
    document.querySelector('#player-side').innerHTML = '';

    var dealBtn = document.querySelector('#deal-btn');
    dealBtn.classList.add('hidden');

    var hitBtn = document.querySelector('#hit-btn');
    hitBtn.classList.add('hidden');

    var standBtn = document.querySelector('#stand-btn');
    standBtn.classList.add('hidden');

    var doubleBtn = document.querySelector('#double-btn');
    doubleBtn.classList.add('hidden');

    var surrenderBtn = document.querySelector('#surrender-btn');
    surrenderBtn.classList.add('hidden');

    document.querySelector('#status-message').innerHTML = statusMessage;

    document.querySelector('#dealer-text').innerHTML = `Dealer Cards Score: ${getTotalScore(dealerHand)}`;

    dealerHand.forEach(card => {
        var dealerHandCardEl = document.createElement('img');
        dealerHandCardEl.src = `./imgs/cards/${card.name}.png`;
        dealerHandCardEl.classList.add('status-cards-imgs');

        document.querySelector('.dealerhand-cards').appendChild(dealerHandCardEl);
    });

    document.querySelector('#player-text').innerHTML = `Your Cards Score: ${getTotalScore(playerHand)}`;

    playerHand.forEach(card => {
        var playerHandCardEl = document.createElement('img');
        playerHandCardEl.src = `./imgs/cards/${card.name}.png`;
        playerHandCardEl.classList.add('status-cards-imgs');

        document.querySelector('.playerhand-cards').appendChild(playerHandCardEl);
    })
}

function playerGetBlackJack() {
    var bet = document.querySelector('#total-bet');

    if (getTotalScore(playerHand) == 21 && getTotalScore(dealerHand) !== 21) {
        statusMessage = `Congratulation! You Win! Your Win Is ${bet.value * 1.5}$!`;
        gameStatus();
    }
    else if (getTotalScore(playerHand) == 21 && getTotalScore(dealerHand) == 21) {
        statusMessage = `Draw! You Get Back Your Bet: ${bet.value}$!`;
        gameStatus();
    }
}

function dealCards() {
    var bet = document.querySelector('#total-bet');

    console.log(typeof bet.value);

    if (bet.value == 0 || bet.value == '') {
        return alert('Please Make Your Bet :)')
    }

    dealPlayersCards();
    printDealerCards(dealerHand);
    printPlayerCards(playerHand);
    playerGetBlackJack();

    if (getTotalScore(playerHand) > 21) {
        statusMessage = `You Lose The Game :( Your lose is ${document.querySelector('#total-bet').value} $!`;
        gameStatus();
    }

    if ((dealerHand[0].name !== 'AC' || dealerHand[0].name !== 'AH' || dealerHand[0].name !== 'AD' || dealerHand[0].name !== 'AS') && getTotalScore(playerHand) !== 21) {
        var dealBtn = document.querySelector('#deal-btn');
        dealBtn.classList.add('hidden');

        var hitBtn = document.querySelector('#hit-btn');
        hitBtn.classList.remove('hidden');

        var standBtn = document.querySelector('#stand-btn');
        standBtn.classList.remove('hidden');

        var doubleBtn = document.querySelector('#double-btn');
        doubleBtn.classList.remove('hidden');

        var surrenderBtn = document.querySelector('#surrender-btn');
        surrenderBtn.classList.remove('hidden');
    }

    console.log(getTotalScore(dealerHand));
    console.log(getTotalScore(playerHand));
}

function backgroundColorChange() {
    var resultWindowEl = document.getElementById("result-window");
    resultWindowEl.style.beckground = "red";
}

// '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD',
// '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
// '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS'];

// ერორები: 


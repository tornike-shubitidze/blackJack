'use strict'
// { name: '10D', score: 10 },{ name: 'AC', score: 11 }

var cards = [{ name: '2C', score: 2 }, { name: '3C', score: 3 }, { name: '4C', score: 4 }, { name: '5C', score: 5 }, { name: '6C', score: 6 }, { name: '7C', score: 7 }, { name: '8C', score: 8 }, { name: '9C', score: 9 }, { name: '10C', score: 10 }, { name: 'JC', score: 10 }, { name: 'QC', score: 10 }, { name: 'KC', score: 10 }, { name: 'AC', score: 11 },
{ name: '2D', score: 2 }, { name: '3D', score: 3 }, { name: '4D', score: 4 }, { name: '5D', score: 5 }, { name: '6D', score: 6 }, { name: '7D', score: 7 }, { name: '8D', score: 8 }, { name: '9D', score: 9 }, { name: '10D', score: 10 }, { name: 'JD', score: 10 }, { name: 'QD', score: 10 }, { name: 'KD', score: 10 }, { name: 'AD', score: 11 },
{ name: '2H', score: 2 }, { name: '3H', score: 3 }, { name: '4H', score: 4 }, { name: '5H', score: 5 }, { name: '6H', score: 6 }, { name: '7H', score: 7 }, { name: '8H', score: 8 }, { name: '9H', score: 9 }, { name: '10H', score: 10 }, { name: 'JH', score: 10 }, { name: 'QH', score: 10 }, { name: 'KH', score: 10 }, { name: 'AH', score: 11 },
{ name: '2S', score: 2 }, { name: '3S', score: 3 }, { name: '4S', score: 4 }, { name: '5S', score: 5 }, { name: '6S', score: 6 }, { name: '7S', score: 7 }, { name: '8S', score: 8 }, { name: '9S', score: 9 }, { name: '10S', score: 10 }, { name: 'JS', score: 10 }, { name: 'QS', score: 10 }, { name: 'KS', score: 10 }, { name: 'AS', score: 11 }]
var playerHand = [];
var dealerHand = [];
var isClicked = false


function doubleBet() {
    var bet = document.querySelector('#total-bet');
    bet.value = bet.value * 2;
    playerHand.push(randomCardName(cards));
    document.querySelector('#player-side').innerHTML = '';
    printPlayerCards(playerHand);
    //    აქ 21 ქულაზე მეტი ყავს თუ არა აქვს მნიშვნელობა?..ანუ 21 ქულის შეზღუდვა არის კიდევ?

    if (getTotalScore(playerHand) > getTotalScore(dealerHand)) {
        alert(`Congratulation! You Win! Your Win Is ${bet.value}$!`);
        newGame();
    } else if (getTotalScore(playerHand) < getTotalScore(dealerHand)) {
        alert(`You Lose The Game :( Your lose is ${bet.value}$!`);
        newGame();
    } else {
        alert(`Draw! You Get Back Your Bet: ${bet.value}$!`);
        newGame();
    }
    console.log(getTotalScore(dealerHand));
    console.log(getTotalScore(playerHand));
}

function stand() {
    dealerHand.push(randomCardName(cards));
    document.querySelector('#dealer-side').innerHTML = '';
    printDealerCards(dealerHand);
}

function hitCards() {
    playerHand.push(randomCardName(cards));
    dealerHand.push(randomCardName(cards));

    document.querySelector('#dealer-side').innerHTML = '';
    document.querySelector('#player-side').innerHTML = '';

    printDealerCards(dealerHand);
    printPlayerCards(playerHand);

    if (getTotalScore(playerHand) > 21) {
        alert(`You Lose The Game :( Your lose is ${document.querySelector('#total-bet').value} $!`);
        newGame();
    }
}

function surrender() {
    var bet = document.querySelector('#total-bet');

    alert(`You gave up! You Lose ${bet.value / 2}$`)
    newGame()
}

function newGame() {
    document.querySelector('#dealer-side').innerHTML = '';
    document.querySelector('#player-side').innerHTML = '';

    document.querySelector('#total-bet').value = '';

    var dealBtn = document.querySelector('#deal-btn');
    dealBtn.classList.remove('hidden');

    var hitBtn = document.querySelector('#hit-btn');
    hitBtn.classList.add('hidden');

    var standBtn = document.querySelector('#stand-btn');
    standBtn.classList.add('hidden');

    var doubleBtn = document.querySelector('#double-btn');
    doubleBtn.classList.add('hidden');

    var surrenderBtn = document.querySelector('#surrender-btn');
    surrenderBtn.classList.add('hidden');

    dealPlayersCards()
}

function getTotalScore(hand) {
    var totalScore = 0
    for (var i = 0; i < hand.length; i++) {
        totalScore += hand[i].score;
    }
    return totalScore;
}

function randomCardName(deck) {
    var randomIndex = Math.floor(deck.length * Math.random());
    return deck[randomIndex];
}

function dealPlayersCards() {
    playerHand = [randomCardName(cards), randomCardName(cards)];
    dealerHand = [randomCardName(cards), randomCardName(cards)];
}

function printDealerCards(dealer) {
    dealer.forEach(card => {
        var dealerHandCardEl = document.createElement('img');
        dealerHandCardEl.src = `/imgs/cards/${card.name}.png`;

        document.querySelector('#dealer-side').appendChild(dealerHandCardEl);
    })
}

function printPlayerCards(player) {
    player.forEach(card => {
        var playerHandCardEl = document.createElement('img');
        playerHandCardEl.src = `/imgs/cards/${card.name}.png`;

        document.querySelector('#player-side').appendChild(playerHandCardEl);
    })
}

function playerGetBlackJack() {
    var bet = document.querySelector('#total-bet');

    if (getTotalScore(playerHand) === 21 && getTotalScore(dealerHand) !== 21) {
        alert(`Congratulation! You Win! Your Win Is ${bet.value * 1.5}$!`);
        newGame();
    } else if (getTotalScore(playerHand) === 21 && getTotalScore(dealerHand) === 21) {
        alert(`Draw! Your Get Back Your Bet: ${bet.value}$!`);
        newGame();
    }
}

function dealCards() {
    if (document.querySelector('#total-bet').value == 0) {
        return alert('Please Make Your Bet :)')
    }

    dealPlayersCards();
    printDealerCards(dealerHand);
    printPlayerCards(playerHand);
    playerGetBlackJack();

    if ((dealerHand[0].name !== 'AC' || dealerHand[0].name !== 'AH' || dealerHand[0].name !== 'AD' || dealerHand[0].name !== 'AS') && getTotalScore(dealerHand) !== 21) {
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

    if (getTotalScore(playerHand) > 21) {
        alert(`You Lose The Game :( Your lose is ${document.querySelector('#total-bet').value} $!`);
        newGame();
    }

    console.log(getTotalScore(dealerHand));
    console.log(getTotalScore(playerHand));
}



// '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD',
// '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
// '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS'];


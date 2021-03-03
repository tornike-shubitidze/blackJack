'use strict'


var cards = [{ name: '2C', score: 2 }, { name: '3C', score: 3 }, { name: '4C', score: 4 }, { name: '5C', score: 5 }, { name: '6C', score: 6 }, { name: '7C', score: 7 }, { name: '8C', score: 8 }, { name: '9C', score: 9 }, { name: '10C', score: 10 }, { name: 'JC', score: 10 }, { name: 'QC', score: 10 }, { name: 'KC', score: 10 }, { name: 'AC', score: 11 },
{ name: '2D', score: 2 }, { name: '3D', score: 3 }, { name: '4D', score: 4 }, { name: '5D', score: 5 }, { name: '6D', score: 6 }, { name: '7D', score: 7 }, { name: '8D', score: 8 }, { name: '9D', score: 9 }, { name: '10D', score: 10 }, { name: 'JD', score: 10 }, { name: 'QD', score: 10 }, { name: 'KD', score: 10 }, { name: 'AD', score: 11 },
{ name: '2H', score: 2 }, { name: '3H', score: 3 }, { name: '4H', score: 4 }, { name: '5H', score: 5 }, { name: '6H', score: 6 }, { name: '7H', score: 7 }, { name: '8H', score: 8 }, { name: '9H', score: 9 }, { name: '10H', score: 10 }, { name: 'JH', score: 10 }, { name: 'QH', score: 10 }, { name: 'KH', score: 10 }, { name: 'AH', score: 11 },
{ name: '2S', score: 2 }, { name: '3S', score: 3 }, { name: '4S', score: 4 }, { name: '5S', score: 5 }, { name: '6S', score: 6 }, { name: '7S', score: 7 }, { name: '8S', score: 8 }, { name: '9S', score: 9 }, { name: '10S', score: 10 }, { name: 'JS', score: 10 }, { name: 'QS', score: 10 }, { name: 'KS', score: 10 }, { name: 'AS', score: 11 }]
var playerHand = [];
var dealerHand = [];
var isClicked = false
var bet = document.querySelector('#total-bet');
var hitBtn = document.querySelector('#hit-btn');
var standBtn = document.querySelector('#stand-btn');
var doubleBtn = document.querySelector('#double-btn');



doubleBtn.addEventListener('click', function () {
    bet.value = bet.value * 2
});


standBtn.addEventListener('click', function () {

    dealerHand.push(randomCardName(cards));

    document.querySelector('#dealer-side').innerHTML = '';
    document.querySelector('#player-side').innerHTML = '';

    printDealerCards(dealerHand);

    printPlayerCards(playerHand);

});


hitBtn.addEventListener('click', function () {

    playerHand.push(randomCardName(cards));
    dealerHand.push(randomCardName(cards));

    document.querySelector('#dealer-side').innerHTML = '';
    document.querySelector('#player-side').innerHTML = '';

    printDealerCards(dealerHand);

    printPlayerCards(playerHand);
});


function getTotalScore(hand) {
    var totalScore = 0
    for (var i = 0; i < hand.length; i++) {
        totalScore += hand[i].score;
    }
    return totalScore
}


function randomCardName(deck) {
    var randomIndex = Math.floor(deck.length * Math.random());
    return deck[randomIndex];
};


function dealCards() {
    playerHand = [randomCardName(cards), randomCardName(cards)];
    dealerHand = [randomCardName(cards), randomCardName(cards)];
};


function printDealerCards(dealer) {
    dealer.forEach(card => {
        var dealerHandCardEl = document.createElement('img');
        dealerHandCardEl.src = `/imgs/cards/${card.name}.png`;

        document.querySelector('#dealer-side').appendChild(dealerHandCardEl);
    })
};


function printPlayerCards(player) {
    player.forEach(card => {
        var playerHandCardEl = document.createElement('img');
        playerHandCardEl.src = `/imgs/cards/${card.name}.png`;

        document.querySelector('#player-side').appendChild(playerHandCardEl);
    })
};

function gamePlay() {
    if (getTotalScore(playerHand) == 21 && !getTotalScore(dealerHand) == 21) {
        return alert(`Congratilation! You Win! Your Win Is ${bet * 1.5}$!`)
    } else if (getTotalScore(dealerHand) == 21 && !getTotalScore(playerHand) == 21) {
        return alert(`Sory! You Lose The Game. Your Lose is ${bet}$!`)
    } else if (getTotalScore(playerHand) == 21 && getTotalScore(dealerHand) == 21) {
        return alert(`Draw! Your Win Is Your Bet: ${bet}$!`)
    }
}


function startGame() {

    var dealBtn = document.querySelector('#deal-cards');
    dealBtn.addEventListener('click', function () {

        if (bet.value == 0) {
            return alert('Please Make Your Bet :)')
        }

        dealCards();

        printDealerCards(dealerHand);
        printPlayerCards(playerHand);

        if (dealerHand[0].name !== 'AC' || dealerHand[0].name !== 'AH' || dealerHand[0].name !== 'AD' || dealerHand[0].name !== 'AS') {
            dealBtn.classList.add('hidden');
            hitBtn.classList.remove('hidden');
            standBtn.classList.remove('hidden');
            doubleBtn.classList.remove('hidden');
        }

        console.log(getTotalScore(dealerHand));
        gamePlay()


    });
}


startGame();




// '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD',
// '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
// '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS'];


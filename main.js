'use strict'
// { name: '10D', score: 10 },{ name: 'AC', score: 11 }

// const CARDS = [{ name: '2C', score: 2 }, { name: '3C', score: 3 }, { name: '4C', score: 4 }, { name: '5C', score: 5 }, { name: '6C', score: 6 }, { name: '7C', score: 7 }];


const CARDS = [{ name: '2C', score: 2 }, { name: '3C', score: 3 }, { name: '4C', score: 4 }, { name: '5C', score: 5 }, { name: '6C', score: 6 }, { name: '7C', score: 7 }, { name: '8C', score: 8 }, { name: '9C', score: 9 }, { name: '10C', score: 10 }, { name: 'JC', score: 10 }, { name: 'QC', score: 10 }, { name: 'KC', score: 10 }, { name: 'AC', score: 11 },
{ name: '2D', score: 2 }, { name: '3D', score: 3 }, { name: '4D', score: 4 }, { name: '5D', score: 5 }, { name: '6D', score: 6 }, { name: '7D', score: 7 }, { name: '8D', score: 8 }, { name: '9D', score: 9 }, { name: '10D', score: 10 }, { name: 'JD', score: 10 }, { name: 'QD', score: 10 }, { name: 'KD', score: 10 }, { name: 'AD', score: 11 },
{ name: '2H', score: 2 }, { name: '3H', score: 3 }, { name: '4H', score: 4 }, { name: '5H', score: 5 }, { name: '6H', score: 6 }, { name: '7H', score: 7 }, { name: '8H', score: 8 }, { name: '9H', score: 9 }, { name: '10H', score: 10 }, { name: 'JH', score: 10 }, { name: 'QH', score: 10 }, { name: 'KH', score: 10 }, { name: 'AH', score: 11 },
{ name: '2S', score: 2 }, { name: '3S', score: 3 }, { name: '4S', score: 4 }, { name: '5S', score: 5 }, { name: '6S', score: 6 }, { name: '7S', score: 7 }, { name: '8S', score: 8 }, { name: '9S', score: 9 }, { name: '10S', score: 10 }, { name: 'JS', score: 10 }, { name: 'QS', score: 10 }, { name: 'KS', score: 10 }, { name: 'AS', score: 11 }]
var playerHand = [];
var dealerHand = [];
var statusMessage = '';
var totalWin = document.querySelector('#total-win');
const STATUS = {
    WIN: 1,
    LOSE: 2,
    DRAW: 3,
    SURRENDER: 4,
    STANDWIN: 5,
    STANDLOSE: 6
}

function printStatus(statusCode) {
    if (!statusCode) {
        throw new Error("Status Code Not Passed!"); // todo
    }

    let bet;
    var totalBet = document.querySelector('#total-bet');

    switch (statusCode) {
        case STATUS.WIN: // win
            bet = parseFloat(totalBet.value) * 1.5;
            statusMessage = `Congratulation! You Win🥳 Your Win Is ${bet}💰!`;
            totalWin.value = parseFloat(totalWin.value) + bet;
            break;
        case STATUS.LOSE: // lose
            bet = parseFloat(totalBet.value);
            statusMessage = `You Lose The Game😬 Your Lose Is ${bet}💰!`;
            totalWin.value = parseFloat(totalWin.value) - bet;
            break;
        case STATUS.DRAW: //draw
            bet = parseFloat(totalBet.value)
            statusMessage = `Draw🤝 You Get Back Your Bet: ${bet}💰!`;
            break;
        case STATUS.SURRENDER: //surrender
            bet = parseFloat(totalBet.value) / 2;
            statusMessage = `You Gave Up😕 You Lose ${bet}💰`;
            totalWin.value = parseFloat(totalWin.value) - bet;
            break;
        case STATUS.STANDWIN:
            bet = parseFloat(totalBet.value) * 2;
            statusMessage = `Congratulation🥳 You Win! Your Win Is ${bet}💰!`;
            totalWin.value = parseFloat(totalWin.value) + bet;
            break;
        case STATUS.STANDLOSE:
            bet = parseFloat(totalBet.value) * 2;
            statusMessage = `You Lose The Game😬 Your Lose Is ${bet}💰!`;
            totalWin.value = parseFloat(totalWin.value) - bet;
            break;
        default:
            statusMessage = 'Incorrect Status Code! Please Check "printStatus Function"!'   // todo
            break;
    }
}

function doubleBet() {
    let bet = document.querySelector('#total-bet');
    bet.value = parseFloat(bet.value) * 2;

    playerHand.push(randomCard(playerHand));

    document.querySelector('#player-side').innerHTML = '';

    printPlayerCards(playerHand);

    let playerTotalScore = getTotalScore(playerHand);

    if (playerTotalScore > 21) {
        printStatus(STATUS.LOSE);
    } else {
        let dealerTotalScore = getTotalScore(dealerHand);

        if (playerTotalScore > dealerTotalScore) {
            printStatus(STATUS.WIN);
        } else if (playerTotalScore < dealerTotalScore) {
            printStatus(STATUS.LOSE);
        } else {
            printStatus(STATUS.DRAW);
        }
    }
    getResultWindowImg()
    gameStatus();
}

function stand() {
    dealerHand.push(randomCard(dealerHand));
    document.querySelector('#dealer-side').innerHTML = '';
    printDealerCards(dealerHand);

    let dealerTotalScore = getTotalScore(dealerHand);

    if (dealerTotalScore > 21) {
        printStatus(STATUS.WIN);
        getResultWindowImg()
        gameStatus();
    }

    if (dealerTotalScore >= 17 && dealerTotalScore < 21) {

        let playerTotalScore = getTotalScore(playerHand);

        if (dealerTotalScore > playerTotalScore) {
            printStatus(STATUS.STANDLOSE);
        }
        else if (dealerTotalScore < playerTotalScore) {
            printStatus(STATUS.STANDWIN);
        }
        else {
            printStatus(STATUS.DRAW);
        }
        getResultWindowImg()
        gameStatus();
    }
}

function hit() {
    playerHand.push(randomCard(playerHand));
    document.querySelector('#player-side').innerHTML = '';
    printPlayerCards(playerHand);

    let playerTotalScore = getTotalScore(playerHand);

    if (playerTotalScore > 21) {
        printStatus(STATUS.LOSE);
        getResultWindowImg()
        gameStatus();
    }
}

function surrender() {
    printStatus(STATUS.SURRENDER);
    getResultWindowImg()
    gameStatus();
}

function newGame() {

    document.querySelector('#result-window').classList.add('hidden');
    document.querySelector('#total-bet').value = 0;

    document.querySelector('.dealerhand-cards').innerHTML = '';
    document.querySelector('.playerhand-cards').innerHTML = '';

    let dealBtn = document.querySelector('#deal-btn');
    dealBtn.classList.remove('hidden');

    dealPlayersCards();
    statusMessage = '';
}

function gameStatus() {

    document.querySelector('#result-window').classList.remove('hidden');

    document.querySelector('#dealer-side').innerHTML = '';
    document.querySelector('#player-side').innerHTML = '';

    let dealBtn = document.querySelector('#deal-btn');
    dealBtn.classList.add('hidden');

    let hitBtn = document.querySelector('#hit-btn');
    hitBtn.classList.add('hidden');

    let standBtn = document.querySelector('#stand-btn');
    standBtn.classList.add('hidden');

    let doubleBtn = document.querySelector('#double-btn');
    doubleBtn.classList.add('hidden');

    let surrenderBtn = document.querySelector('#surrender-btn');
    surrenderBtn.classList.add('hidden');

    document.querySelector('#status-message').innerHTML = statusMessage;

    document.querySelector('#dealer-text').innerHTML = `Dealer Cards Score: ${getTotalScore(dealerHand)}`;

    dealerHand.forEach(card => {
        let dealerHandCardEl = document.createElement('img');
        dealerHandCardEl.src = `./imgs/cards/${card.name}.png`;
        dealerHandCardEl.classList.add('status-cards-imgs');

        document.querySelector('.dealerhand-cards').appendChild(dealerHandCardEl);
    });

    document.querySelector('#player-text').innerHTML = `Your Cards Score: ${getTotalScore(playerHand)}`;

    playerHand.forEach(card => {
        let playerHandCardEl = document.createElement('img');
        playerHandCardEl.src = `./imgs/cards/${card.name}.png`;
        playerHandCardEl.classList.add('status-cards-imgs');

        document.querySelector('.playerhand-cards').appendChild(playerHandCardEl);
    })
}

function playerGetBlackJack() {

    let playerTotalScore = getTotalScore(playerHand);
    let dealerTotalScore = getTotalScore(dealerHand);

    if (playerTotalScore == 21 && dealerTotalScore !== 21) {
        printStatus(STATUS.WIN);
        getResultWindowImg()
        gameStatus();
    }
    else if (playerTotalScore == 21 && dealerTotalScore == 21) {
        printStatus(STATUS.DRAW);
        getResultWindowImg()
        gameStatus();
    }
    // gameStatus(); <-- აქ რომ გამომაქვს მერე პოპაფ ფანჯარაში სტატუსმესიჯს აღარ მიწერს
}

function getTotalScore(cardsArray) {
    let totalScore = 0
    for (let i = 0; i < cardsArray.length; i++) {
        totalScore += cardsArray[i].score;
    }
    return totalScore;
}

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

function printDealerCards(dealer) {
    let dealerHandFirstCardEl = document.createElement('img');
    dealerHandFirstCardEl.src = `./imgs/cards/${dealer[0].name}.png`;
    document.querySelector('#dealer-side').appendChild(dealerHandFirstCardEl);

    for (let i = 1; i < dealer.length; ++i) {
        var dealerHandCardEl = document.createElement('img');
        dealerHandCardEl.src = `./imgs/cards/red_back.png`;

        document.querySelector('#dealer-side').appendChild(dealerHandCardEl);
    }

}

function printPlayerCards(player) {
    player.forEach(card => {
        let playerHandCardEl = document.createElement('img');
        playerHandCardEl.src = `./imgs/cards/${card.name}.png`;

        document.querySelector('#player-side').appendChild(playerHandCardEl);
    })
}


function dealCards() {
    var bet = document.querySelector('#total-bet');

    if (bet.value == 0 || bet.value == '' || isNaN(parseFloat(bet.value))) {
        return alert('Please Make Your Bet :)')
    }

    dealPlayersCards();
    printDealerCards(dealerHand);
    printPlayerCards(playerHand);
    playerGetBlackJack();

    if (getTotalScore(playerHand) > 21) {
        printStatus(STATUS.LOSE);
        getResultWindowImg()
        gameStatus();
    }

    if ((dealerHand[0].name !== 'AC' || dealerHand[0].name !== 'AH' || dealerHand[0].name !== 'AD' || dealerHand[0].name !== 'AS') && getTotalScore(playerHand) !== 21) {
        let dealBtn = document.querySelector('#deal-btn');
        dealBtn.classList.add('hidden');

        let hitBtn = document.querySelector('#hit-btn');
        hitBtn.classList.remove('hidden');

        let standBtn = document.querySelector('#stand-btn');
        standBtn.classList.remove('hidden');

        let doubleBtn = document.querySelector('#double-btn');
        doubleBtn.classList.remove('hidden');

        let surrenderBtn = document.querySelector('#surrender-btn');
        surrenderBtn.classList.remove('hidden');
    }
}

function getResultWindowImg() {
    let resultWindowEl = document.getElementById("result-window");

    if (statusMessage.includes('Win')) {

        resultWindowEl.className = 'win';

    } else if (statusMessage.includes('Lose The Game')) {

        resultWindowEl.className = 'lose';

    } else if (statusMessage.includes('Draw')) {

        resultWindowEl.className = 'draw';

    } else if (statusMessage.includes('Gave Up')) {

        resultWindowEl.className = 'gave-up';

    } else { resultWindowEl.style.background = '#f3f3f3' }
}

// '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD',
// '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
// '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS'];

// ერორები: 


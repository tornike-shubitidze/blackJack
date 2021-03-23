'use strict'
// { name: '10D', score: 10 },{ name: 'AC', score: 11 }

const USERS_KEY = 'users';
const CARDS = [{ name: '2C', score: 2 }, { name: '3C', score: 3 }, { name: '4C', score: 4 }, { name: '5C', score: 5 }, { name: '6C', score: 6 }, { name: '7C', score: 7 }, { name: '8C', score: 8 }, { name: '9C', score: 9 }, { name: '10C', score: 10 }, { name: 'JC', score: 10 }, { name: 'QC', score: 10 }, { name: 'KC', score: 10 }, { name: 'AC', score: 11 },
{ name: '2D', score: 2 }, { name: '3D', score: 3 }, { name: '4D', score: 4 }, { name: '5D', score: 5 }, { name: '6D', score: 6 }, { name: '7D', score: 7 }, { name: '8D', score: 8 }, { name: '9D', score: 9 }, { name: '10D', score: 10 }, { name: 'JD', score: 10 }, { name: 'QD', score: 10 }, { name: 'KD', score: 10 }, { name: 'AD', score: 11 },
{ name: '2H', score: 2 }, { name: '3H', score: 3 }, { name: '4H', score: 4 }, { name: '5H', score: 5 }, { name: '6H', score: 6 }, { name: '7H', score: 7 }, { name: '8H', score: 8 }, { name: '9H', score: 9 }, { name: '10H', score: 10 }, { name: 'JH', score: 10 }, { name: 'QH', score: 10 }, { name: 'KH', score: 10 }, { name: 'AH', score: 11 },
{ name: '2S', score: 2 }, { name: '3S', score: 3 }, { name: '4S', score: 4 }, { name: '5S', score: 5 }, { name: '6S', score: 6 }, { name: '7S', score: 7 }, { name: '8S', score: 8 }, { name: '9S', score: 9 }, { name: '10S', score: 10 }, { name: 'JS', score: 10 }, { name: 'QS', score: 10 }, { name: 'KS', score: 10 }, { name: 'AS', score: 11 }]
var playerHand = [];
var dealerHand = [];
// var users = [];
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

    printImageByGameStatus(statusCode);
}

function doubleBet() {
    let bet = document.querySelector('#total-bet');
    bet.value = parseFloat(bet.value) * 2;

    playerHand.push(getRandomCard(playerHand));

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
    gameStatus();
}

function stand() {
    dealerHand.push(getRandomCard(dealerHand));
    document.querySelector('#dealer-side').innerHTML = '';
    printDealerCards(dealerHand);

    let dealerTotalScore = getTotalScore(dealerHand);

    if (dealerTotalScore > 21) {
        printStatus(STATUS.WIN);
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
        gameStatus();
    }
}

function hit() {
    playerHand.push(getRandomCard(playerHand));
    document.querySelector('#player-side').innerHTML = '';
    printPlayerCards(playerHand);

    let playerTotalScore = getTotalScore(playerHand);

    if (playerTotalScore > 21) {
        printStatus(STATUS.LOSE);
        gameStatus();
    }
}

function surrender() {
    printStatus(STATUS.SURRENDER);
    gameStatus();
}

function newGame() {
    playerHand = [];
    dealerHand = [];

    document.querySelector('#result-window').classList.add('hidden');
    document.querySelector('#total-bet').value = 0;

    document.querySelector('.dealerhand-cards').innerHTML = '';
    document.querySelector('.playerhand-cards').innerHTML = '';

    let dealBtn = document.querySelector('#deal-btn');
    dealBtn.classList.remove('hidden');

    statusMessage = '';
}

function gameStatus() {

    document.querySelector('#dealer-side').innerHTML = '';
    document.querySelector('#player-side').innerHTML = '';

    document.querySelector('#result-window').classList.remove('hidden');

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
        gameStatus();
    }
    else if (playerTotalScore == 21 && dealerTotalScore == 21) {
        printStatus(STATUS.DRAW);
        gameStatus();
    }
}

function getTotalScore(cardsArray) {
    let totalScore = 0
    for (let i = 0; i < cardsArray.length; i++) {
        totalScore += cardsArray[i].score;
    }
    return totalScore;
}

function getRandomCard() {
    let cardIndex = Math.floor(CARDS.length * Math.random());

    let card = CARDS[cardIndex];
    let cardExists = playerHand.some(t => t.name === card.name) || dealerHand.some(t => t.name === card.name);

    while (cardExists) {
        cardIndex = Math.floor(CARDS.length * Math.random());
        card = CARDS[cardIndex];
        cardExists = playerHand.some(t => t.name === card.name) || dealerHand.some(t => t.name === card.name);
    }

    return card;
}

function dealPlayersCards() {

    playerHand.push(getRandomCard());
    playerHand.push(getRandomCard());

    dealerHand.push(getRandomCard());
    dealerHand.push(getRandomCard());
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
        return alert('Please Make Your Bet 🙂')
    }

    dealPlayersCards();
    printDealerCards(dealerHand);
    printPlayerCards(playerHand);
    playerGetBlackJack();

    if (getTotalScore(playerHand) > 21) {
        printStatus(STATUS.LOSE);
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

function printImageByGameStatus(statusCode) {
    let resultWindowEl = document.querySelector("#result-window");

    switch (statusCode) {
        case STATUS.WIN:   // win
            resultWindowEl.className = 'win animate';
            break;
        case STATUS.STANDWIN:   // win
            resultWindowEl.className = 'win animate';
            break;
        case STATUS.LOSE: // lose
            resultWindowEl.className = 'lose animate';
            break;
        case STATUS.STANDLOSE:   // lose
            resultWindowEl.className = 'lose animate';
            break;
        case STATUS.DRAW: //draw
            resultWindowEl.className = 'draw animate';
            break;
        case STATUS.SURRENDER: //surrender
            resultWindowEl.className = 'gave-up animate';
            break;
        default:
            resultWindowEl.style.backgroundColor = '#f3f3f3';
            break;
    }
}

// Login & registration form


function showRegistrationForm() {
    let loginFormEl = document.querySelector('#login-form');
    let regFormEl = document.querySelector('#registration-form');

    loginFormEl.classList.add('hidden');
    regFormEl.classList.remove('hidden');
}

function showLoginForm() {
    let loginFormEl = document.querySelector('#login-form');
    let regFormEl = document.querySelector('#registration-form');

    loginFormEl.classList.remove('hidden');
    regFormEl.classList.add('hidden');
}

function userRegistration() {

    let regEmailEl = document.querySelector('#email');
    let regUserEl = document.querySelector('#reg-username');
    let regPswEl = document.querySelector('#psw');
    let regRptPswEl = document.querySelector('#psw-repeat');
    let regBirthDateEl = document.querySelector('#birthday');
    let regMaleEl = document.querySelector('#male');
    let regFemaleEl = document.querySelector('#female');

    let usersData = JSON.parse(localStorage.getItem(USERS_KEY));

    if (usersData === null) {
        usersData = []
    }

    let psw_expression = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/;  // (?=.*?[#?!@$%^&*-]) <-- ეს უნდა ჩაემატოს თუ სიმბოლოებიანი პაროლი გვინდა
    let letters = /^[A-Za-z]+$/;
    let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;


    let checkUserName = usersData.some(x => x.username == regUserEl.value);
    let checkUserEmail = usersData.some(x => x.email == regEmailEl.value);

    if (regUserEl.value == '') {
        alert('Please enter Username');
    }
    else if (checkUserName) {
        alert('This Username Already Exists');
    }
    else if (!letters.test(regUserEl.value)) {
        alert('Username field required only alphabet characters');
    }
    else if (regEmailEl.value == '') {
        alert('Please enter your email ');
    }
    else if (checkUserEmail) {
        alert('This Email Already Used');
    }
    else if (!filter.test(regEmailEl.value)) {
        alert('Invalid email');
    } else if (regPswEl.value == '' || regPswEl.value.length < 6 || regPswEl.value.length > 12) {
        alert('Password Not Entered Or Password Length Is Less Than 6 Or Greater 12');
    }
    else if (regRptPswEl.value == '') {
        alert('Enter Confirm Password');
    }
    else if (!psw_expression.test(regRptPswEl.value)) {
        alert('Upper case, Lower case and Numeric letter are required in Password filed');
    }
    else if (regPswEl.value != regRptPswEl.value) {
        alert('Password not Matched');
    }
    else if (regBirthDateEl.value == '') {
        alert('Please Enter Your Birth Date');
    }
    else if (!regMaleEl.checked && !regFemaleEl.checked) {
        alert('Please Check Your Gender');
    }
    else {
        usersData.push({
            email: regEmailEl.value,
            username: regUserEl.value,
            password: regPswEl.value,
            birthday: regBirthDateEl.value,
            gender: regMaleEl.checked ? regMaleEl.value : regFemaleEl.value
        })

        localStorage.setItem(USERS_KEY, JSON.stringify(usersData));
        showLoginForm();
        clearRegistration();
    }
}

function clearRegistration() {
    let regEmailEl = document.querySelector('#email');
    let regUserEl = document.querySelector('#reg-username');
    let regPswEl = document.querySelector('#psw');
    let regRptPswEl = document.querySelector('#psw-repeat');
    let regBirthDateEl = document.querySelector('#birthday');

    regEmailEl.value = '';
    regUserEl.value = '';
    regPswEl.value = '';
    regRptPswEl.value = '';
    regBirthDateEl.value = '';
}

function login() {

    let usersData = JSON.parse(localStorage.getItem(USERS_KEY));

    let loginUsername = document.querySelector('#login-username');
    let loginPassword = document.querySelector('#login-psw');
    let checkUser = usersData.some(x => x.username == loginUsername.value);

    if (!checkUser) {
        return alert('Incorrect Username')
    } else {
        let userIndex = usersData.findIndex(user => user.username === loginUsername.value);

        if (usersData[userIndex].password === loginPassword.value) {

            let modalEl = document.querySelector('.modal');
            modalEl.style.display = 'none';
        } else {
            return alert('Incorrect Password')
        };
    }
}

function showModal() {
    let modalEl = document.querySelector('.modal');
    modalEl.style.display = 'block';
}


window.onload = showModal();




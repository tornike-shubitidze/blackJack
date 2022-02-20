'use strict'

const USERS_KEY = 'users';
const CARDS = [{ name: '2C', score: 2 }, { name: '3C', score: 3 }, { name: '4C', score: 4 }, { name: '5C', score: 5 }, { name: '6C', score: 6 }, { name: '7C', score: 7 }, { name: '8C', score: 8 }, { name: '9C', score: 9 }, { name: '10C', score: 10 }, { name: 'JC', score: 10 }, { name: 'QC', score: 10 }, { name: 'KC', score: 10 }, { name: 'AC', score: 11 },
{ name: '2D', score: 2 }, { name: '3D', score: 3 }, { name: '4D', score: 4 }, { name: '5D', score: 5 }, { name: '6D', score: 6 }, { name: '7D', score: 7 }, { name: '8D', score: 8 }, { name: '9D', score: 9 }, { name: '10D', score: 10 }, { name: 'JD', score: 10 }, { name: 'QD', score: 10 }, { name: 'KD', score: 10 }, { name: 'AD', score: 11 },
{ name: '2H', score: 2 }, { name: '3H', score: 3 }, { name: '4H', score: 4 }, { name: '5H', score: 5 }, { name: '6H', score: 6 }, { name: '7H', score: 7 }, { name: '8H', score: 8 }, { name: '9H', score: 9 }, { name: '10H', score: 10 }, { name: 'JH', score: 10 }, { name: 'QH', score: 10 }, { name: 'KH', score: 10 }, { name: 'AH', score: 11 },
{ name: '2S', score: 2 }, { name: '3S', score: 3 }, { name: '4S', score: 4 }, { name: '5S', score: 5 }, { name: '6S', score: 6 }, { name: '7S', score: 7 }, { name: '8S', score: 8 }, { name: '9S', score: 9 }, { name: '10S', score: 10 }, { name: 'JS', score: 10 }, { name: 'QS', score: 10 }, { name: 'KS', score: 10 }, { name: 'AS', score: 11 }]
var playerHand = [];
var dealerHand = [];
var statusMessage = '';
var totalWin = document.querySelector('#total-win');
var lastWin = document.querySelector('#last-win');
var balance = document.querySelector('#total-balance');
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
        throw new Error("Status Code Not Passed!");
    }

    var totalBet = document.querySelector('#total-bet');

    switch (statusCode) {
        case STATUS.WIN: // win
            lastWin.value = parseFloat(totalBet.value) * 1.5;
            statusMessage = `Congratulation! You Win🥳 Your Win Is ${lastWin.value}💰!`;
            totalWin.value = parseFloat(totalWin.value) + parseFloat(totalBet.value) * 1.5;
            balance.value = parseFloat(balance.value) + parseFloat(totalBet.value) * 1.5;
            break;
        case STATUS.LOSE: // lose
            lastWin.value = parseFloat(-totalBet.value);
            statusMessage = `You Lose The Game😬 Your Lose Is ${-lastWin.value}💰!`;
            totalWin.value = parseFloat(totalWin.value) - (-lastWin.value);
            balance.value = parseFloat(balance.value) - parseFloat(totalBet.value);
            break;
        case STATUS.DRAW: //draw
            statusMessage = `Draw🤝 You Get Back Your Bet: ${parseFloat(totalBet.value)}💰!`;
            break;
        case STATUS.SURRENDER: //surrender
            lastWin.value = parseFloat(-totalBet.value) / 2;
            statusMessage = `You Gave Up😕 You Lose ${-lastWin.value}💰`;
            totalWin.value = parseFloat(totalWin.value) - parseFloat(totalBet.value) / 2;
            balance.value = parseFloat(balance.value) - parseFloat(totalBet.value) / 2;
            break;
        case STATUS.STANDWIN: //STAND (win)
            lastWin.value = parseFloat(totalBet.value) * 2;
            statusMessage = `Congratulation🥳 You Win! Your Win Is ${lastWin.value}💰!`;
            totalWin.value = parseFloat(totalWin.value) + parseFloat(totalBet.value) * 2;
            balance.value = parseFloat(balance.value) + parseFloat(totalBet.value) * 2;
            break;
        case STATUS.STANDLOSE: //STAND (lose)
            lastWin.value = parseFloat(-totalBet.value) * 2;
            statusMessage = `You Lose The Game😬 Your Lose Is ${-lastWin.value}💰!`;
            totalWin.value = parseFloat(totalWin.value) - (-lastWin.value);
            balance.value = parseFloat(balance.value) - parseFloat(totalBet.value) * 2;
            break;
        default:
            statusMessage = 'Incorrect Status Code! Please Check "printStatus Function"!'
            break;
    }

    printImageByGameStatus(statusCode);
}

function doubleBet() {
    let bet = document.querySelector('#total-bet');
    if (parseFloat(bet.value) * 2 > parseFloat(balance.value)) {
        return alert("You Cann't Double Your Bet! You don't have enought Balance😕")
    }
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
    let bet = document.querySelector('#total-bet');
    if (parseFloat(bet.value) * 2 > parseFloat(balance.value)) {
        return alert("You Cann't Use 'STAND' Button! Your Possible Lose is Greater than Your Balance😕")
    }


    if (getTotalScore(dealerHand) < 17) {

        dealerHand.push(getRandomCard(dealerHand));
        document.querySelector('#dealer-side').innerHTML = '';
        printDealerCards(dealerHand);

        let dealerTotalScoreAfterStand = getTotalScore(dealerHand);

        if (dealerTotalScoreAfterStand > 21) {
            printStatus(STATUS.WIN);
            gameStatus();
        }

        let playerTotalScore = getTotalScore(playerHand);

        if (dealerTotalScoreAfterStand > playerTotalScore) {
            printStatus(STATUS.STANDLOSE);
        }
        else if (dealerTotalScoreAfterStand < playerTotalScore) {
            printStatus(STATUS.STANDWIN);
        }
        else {
            printStatus(STATUS.DRAW);
        }
        gameStatus();
    } else return alert('Dealer Not Allow You To Use STAND😕')

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
    if (balance.value == 0) {
        if (confirm("Your Balace Is 0😕 Please Press 'OK' to Reload Page and Start New Game")) {
            return window.location.reload();
        } else return
    }

    playerHand = [];
    dealerHand = [];

    document.querySelector('.result-window').classList.add('hidden');
    document.querySelector('#total-bet').value = 0;

    document.querySelector('.dealerhand-cards').innerHTML = '';
    document.querySelector('.playerhand-cards').innerHTML = '';

    let dealBtn = document.querySelector('.deal-btn');
    dealBtn.classList.remove('hidden');

    statusMessage = '';
}

function gameStatus() {

    document.querySelector('#dealer-side').innerHTML = '';
    document.querySelector('#player-side').innerHTML = '';

    document.querySelector('.result-window').classList.remove('hidden');

    let dealBtn = document.querySelector('.deal-btn');
    dealBtn.classList.add('hidden');

    let hitBtn = document.querySelector('.hit-btn');
    hitBtn.classList.add('hidden');

    let standBtn = document.querySelector('.stand-btn');
    standBtn.classList.add('hidden');

    let doubleBtn = document.querySelector('.double-btn');
    doubleBtn.classList.add('hidden');

    let surrenderBtn = document.querySelector('.surrender-btn');
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
    let totalScore = 0;
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

    if (parseFloat(bet.value) > parseFloat(balance.value)) {
        return alert("You Don't Have Enought Balance😕 Please Change Your Bet🙂")
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
        let dealBtn = document.querySelector('.deal-btn');
        dealBtn.classList.add('hidden');

        let hitBtn = document.querySelector('.hit-btn');
        hitBtn.classList.remove('hidden');

        let standBtn = document.querySelector('.stand-btn');
        standBtn.classList.remove('hidden');

        let doubleBtn = document.querySelector('.double-btn');
        doubleBtn.classList.remove('hidden');

        let surrenderBtn = document.querySelector('.surrender-btn');
        surrenderBtn.classList.remove('hidden');
    }
}

function printImageByGameStatus(statusCode) {
    let resultWindowEl = document.querySelector('.result-window');

    switch (statusCode) {
        case STATUS.WIN:   // win
            resultWindowEl.className = 'result-window hidden animate win';
            break;
        case STATUS.STANDWIN:   // win
            resultWindowEl.className = 'result-window hidden animate win';
            break;
        case STATUS.LOSE: // lose
            resultWindowEl.className = 'result-window hidden animate lose';
            break;
        case STATUS.STANDLOSE:   // lose
            resultWindowEl.className = 'result-window hidden animate lose';
            break;
        case STATUS.DRAW: //draw
            resultWindowEl.className = 'result-window hidden animate draw'
            break;
        case STATUS.SURRENDER: //surrender
            resultWindowEl.className = 'result-window hidden animate gave-up'
            break;
        default:
            resultWindowEl.style.backgroundColor = '#f3f3f3';
            break;
    }
}

// Login & registration form


// function showRegistrationForm() {
//     let loginFormEl = document.querySelector('#login-form');
//     let regFormEl = document.querySelector('#registration-form');

//     loginFormEl.classList.add('hidden');
//     regFormEl.classList.remove('hidden');
// }

// function showLoginForm() {
//     let loginFormEl = document.querySelector('#login-form');
//     let regFormEl = document.querySelector('#registration-form');

//     loginFormEl.classList.remove('hidden');
//     regFormEl.classList.add('hidden');
// }

// function userRegistration() {

//     let email = document.querySelector('#email');
//     let username = document.querySelector('#reg-username');
//     let password = document.querySelector('#psw');
//     let passwordRpt = document.querySelector('#psw-repeat');
//     let birthday = document.querySelector('#birthday');
//     let male = document.querySelector('#male');
//     let female = document.querySelector('#female');

//     let usernameMsg = document.querySelector('.user-error-message');
//     let emailMsg = document.querySelector('.email-error-message');
//     let passwordMsg = document.querySelector('.psw-error-message');
//     let passwordRptMsg = document.querySelector('.psw-repeat-error-message');
//     let birthdayMsg = document.querySelector('.birthday-error-message');
//     let genderMsg = document.querySelector('.gender-error-message');



//     let usersData = JSON.parse(localStorage.getItem(USERS_KEY));

//     if (usersData === null) {
//         usersData = []
//     }

//     let psw_expression = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/;  // (?=.*?[#?!@$%^&*-]) <-- ეს უნდა ჩაემატოს თუ სიმბოლოებიანი პაროლი გვინდა
//     let letters = /^[A-Za-z]+$/;
//     let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

//     let checkUsername;
//     let checkUserEmail;

//     if (usersData.length == 0) {
//         checkUsername = false;
//         checkUserEmail = false;
//     } else {
//         checkUsername = usersData.some(x => x.username == username.value);
//         checkUserEmail = usersData.some(x => x.email == email.value);
//     }



//     if (email.value == '' && username.value == '' && password.value == '' && passwordRpt.value == '' && birthday.value == '' && !male.checked && !female.checked) {
//         emailMsg.classList.remove('hidden')
//         emailMsg.innerHTML = 'Please Enter Your Email';

//         usernameMsg.classList.remove('hidden');
//         usernameMsg.innerHTML = 'Please Enter Your Username';

//         passwordMsg.classList.remove('hidden');
//         passwordMsg.innerHTML = 'Please Enter Your Password';

//         passwordRptMsg.classList.remove('hidden');
//         passwordRptMsg.innerHTML = 'Please Confirm Your Password';

//         birthdayMsg.classList.remove('hidden');
//         birthdayMsg.innerHTML = 'Please Enter Your Birth Date';

//         genderMsg.classList.remove('hidden');
//         genderMsg.innerHTML = 'Please Check Your Gender';

//     }
//     else if (email.value == '') {
//         emailMsg.classList.remove('hidden')
//         emailMsg.innerHTML = 'Please Enter Your Email';
//     }
//     else if (checkUserEmail) {
//         emailMsg.classList.remove('hidden')
//         emailMsg.innerHTML = 'This Email Already Used';
//     }
//     else if (!filter.test(email.value)) {
//         emailMsg.classList.remove('hidden');
//         emailMsg.innerHTML = 'Invalid Email';
//     }
//     else if (username.value == '') {
//         usernameMsg.classList.remove('hidden');
//         usernameMsg.innerHTML = 'Please Enter Your Username';

//     }
//     else if (checkUsername) {
//         usernameMsg.classList.remove('hidden');
//         usernameMsg.innerHTML = 'This Username Already Exists';

//     }
//     else if (!letters.test(username.value)) {
//         usernameMsg.classList.remove('hidden');
//         usernameMsg.innerHTML = 'Username Field Required Only Alphabet Characters';

//     }
//     else if (password.value == '' || password.value.length < 6 || password.value.length > 12) {
//         passwordMsg.classList.remove('hidden');
//         passwordMsg.innerHTML = 'Password Not Entered Or Password Length Is Less Than 6 Or Greater 12';

//     }
//     else if (passwordRpt.value == '') {
//         passwordRptMsg.classList.remove('hidden');
//         passwordRptMsg.innerHTML = 'Enter Confirm Password';

//     }
//     else if (!psw_expression.test(passwordRpt.value)) {
//         passwordRptMsg.classList.remove('hidden');
//         passwordRptMsg.innerHTML = 'Upper Case, Lower Case And Numeric Letter Are Required In Password Filed';

//     }
//     else if (password.value != passwordRpt.value) {
//         passwordRptMsg.classList.remove('hidden');
//         passwordRptMsg.innerHTML = 'Confirm Password Not Matched';

//     }
//     else if (birthday.value == '') {
//         birthdayMsg.classList.remove('hidden');
//         birthdayMsg.innerHTML = 'Please Enter Your Birth Date';

//     }
//     else if (!male.checked && !female.checked) {
//         genderMsg.classList.remove('hidden');
//         genderMsg.innerHTML = 'Please Check Your Gender';

//     }
//     else {
//         usersData.push({
//             email: email.value,
//             username: username.value,
//             password: password.value,
//             birthday: birthday.value,
//             gender: male.checked ? male.value : female.value
//         })

//         localStorage.setItem(USERS_KEY, JSON.stringify(usersData));
//         showLoginForm();
//         clearRegistration();

//         usernameMsg.classList.add('hidden');
//         emailMsg.classList.add('hidden');
//         passwordMsg.classList.add('hidden');
//         passwordRptMsg.classList.add('hidden');
//         birthdayMsg.classList.add('hidden');
//         genderMsg.classList.add('hidden');

//     }
// }

// function clearRegistration() {
//     document.querySelector('#email').value = '';
//     document.querySelector('#reg-username').value = '';
//     document.querySelector('#psw').value = '';
//     document.querySelector('#psw-repeat').value = '';
//     document.querySelector('#birthday').value = '';
// }


// function enterKeyDown(e) {
//     console.log("ragacaa", e.key);
//     if (e.keyCode === 13) {
//     }
// }


// function checkUsername() {
//     let usersData = JSON.parse(localStorage.getItem(USERS_KEY));
//     let username = document.querySelector('#login-username');

//     let userErrorMsg = document.querySelector('.username-error-message');

//     let existUser = usersData.find(x => x.username === username.value);

//     if (username.value == '') {

//         username.style.border = '1px solid red';
//         userErrorMsg.innerHTML = 'Please Enter Your Username'

//         return
//     }
//     else if (existUser == undefined) {

//         username.style.border = '1px solid red';
//         userErrorMsg.innerHTML = 'Incorrect Username'

//         return;
//     }
//     else if (existUser) {
//         username.style.border = '1px solid  #44e444';
//         userErrorMsg.innerHTML = '';
//     }

// }


// function checkPassword() {
//     let usersData = JSON.parse(localStorage.getItem(USERS_KEY));
//     let username = document.querySelector('#login-username');
//     let password = document.querySelector('#login-psw');

//     let passErrorMsg = document.querySelector('.password-error-message');
//     let userErrorMsg = document.querySelector('.username-error-message');

//     let existUser = usersData.find(x => x.username === username.value);


//     if (username.value == '' && password.value == '') {

//         username.style.border = '1px solid red';
//         userErrorMsg.innerHTML = 'Please Enter Your Username'

//         password.style.border = '1px solid red';
//         passErrorMsg.innerHTML = 'Please Enter Your Password'

//         return
//     }
//     else if (username.value == '') {

//         username.style.border = '1px solid red';
//         userErrorMsg.innerHTML = 'Please Enter Your Username';

//         return
//     }
//     else if (password.value == '') {

//         password.style.border = '1px solid red';
//         passErrorMsg.innerHTML = 'Please Enter Your Password'

//         return
//     }
//     else if (existUser.password !== password.value) {

//         password.style.border = '1px solid red';
//         passErrorMsg.innerHTML = 'Incorrect Password'

//         return;
//     }
//     else if (existUser.password == password.value) {

//         password.style.border = '1px solid #44e444';
//         passErrorMsg.innerHTML = '';

//         document.querySelector('#login-btn').disabled = false
//     }


// }


// function login() {

//     let usersData = JSON.parse(localStorage.getItem(USERS_KEY));

//     let username = document.querySelector('#login-username');
//     let password = document.querySelector('#login-psw');

//     let userErrorMsg = document.querySelector('.username-error-message');
//     let passErrorMsg = document.querySelector('.password-error-message');

//     let existUser = usersData.find(x => x.username === username.value);


//     if (username.value == '' && password.value == '') {

//         username.style.border = '1px solid red';
//         userErrorMsg.innerHTML = 'Please Enter Your Username'

//         password.style.border = '1px solid red';
//         passErrorMsg.innerHTML = 'Please Enter Your Password'

//         return
//     }
//     else if (username.value == '') {

//         username.style.border = '1px solid red';
//         userErrorMsg.innerHTML = 'Please Enter Your Username'

//         return
//     }
//     else if (existUser == undefined) {

//         username.style.border = '1px solid red';
//         userErrorMsg.innerHTML = 'Incorrect Username'

//         return;
//     }
//     else if (existUser) {
//         username.style.border = '1px solid #44e444';
//         userErrorMsg.innerHTML = '';

//     }


//     if (existUser.password == password.value) {

//         password.style.border = '1px solid #44e444';
//         passErrorMsg.innerHTML = ''

//         return;
//     }
//     else if (existUser.password !== password.value) {

//         password.style.border = '1px solid red';
//         passErrorMsg.innerHTML = 'Incorrect Password'

//         return;
//     }
//     else if (password.value == '') {

//         password.style.border = '1px solid red';
//         passErrorMsg.innerHTML = 'Please Enter Your Password'

//         return
//     }

//     // username.style.border = '1px solid #ccc';
//     // password.style.border = '1px solid #ccc';

//     // hideModal()
// }

// function hideModal() {
//     let modalEl = document.querySelector('.modal');
//     modalEl.style.display = 'none';
// }


// function showModal() {
//     let modalEl = document.querySelector('.modal');
//     modalEl.style.display = 'block';
// }


// window.onload = showModal();






'use strict';

//************************************************************/
//******************* EDITABLE VARIABLES *********************/
//************************************************************/

//? How many rounds needed to win?
const roundsToWin = 5;

//? ms interval for setTimeout reset call a single round
const roundInterval = 2500;
//? when resetting after winner reaches ${roundsToWin}
const winnerInterval = 4500;

//? Text prompt at page load and after round reset
const gameTextDefault = `Let's Play!`;
//? found to right of computer score; limited space so keep short
const ruleTextDefault = `${roundsToWin} to win!`;

//*********************** DO NOT EDIT ************************/
let playerRounds = 0;
let computerRounds = 0;
let tieRounds = 0; //I thought I might track tie games at one point. Hah!

//************************************************************/
//****************** Retrieve DOM elements *******************/
//************************************************************/
const gameText = document.getElementById('gameText');
const ruleText = document.getElementById('ruleText');
const winnerText = document.getElementById('winnerText');

//? the actual numeric scores
//* each round, score to be updated and colors manipulated
const computerScore = document.getElementById('computerScore');
const playerScore = document.getElementById('playerScore');

//? the flex DIV item containing both score and icon
//* colors manipulated
const computerScoreArea = document.getElementById('cScore');
const playerScoreArea = document.getElementById('pScore');

//? the icon to the left of the score
//* colors manipulated
const computerScoreIcon = document.getElementById('cScoreIcon');
const playerScoreIcon = document.getElementById('pScoreIcon');

//************************************************************/
//************ PLAYER buttons, states, and events ************/
//************************************************************/
const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');

//******************* Player button states *******************/
function playerRockButtonOn() {
	playerRock.classList.add('active');
}

function playerRockButtonOff() {
	playerRock.classList.remove('active');
}

function playerPaperButtonOn() {
	playerPaper.classList.add('active');
}

function playerPaperButtonOff() {
	playerPaper.classList.remove('active');
}

function playerScissorsButtonOn() {
	playerScissors.classList.add('active');
}

function playerScissorsButtonOff() {
	playerScissors.classList.remove('active');
}

//************************************************************/
//*********** click, mouseover, & mouseout events ************/
//************************************************************/

//*********************** ROCK events ************************/
function rockClickOn() {
	playerRock.addEventListener('click', playerPicksRock);
}
function rockClickOff() {
	playerRock.removeEventListener('click', playerPicksRock);
}
function rockMouseOverOn() {
	playerRock.addEventListener('mouseover', playerRockButtonOn);
}
function rockMouseOverOff() {
	playerRock.removeEventListener('mouseover', playerRockButtonOn);
}
function rockMouseOutOn() {
	playerRock.addEventListener('mouseout', playerRockButtonOff);
}
function rockMouseOutOff() {
	playerRock.removeEventListener('mouseout', playerRockButtonOff);
}

//*********************** PAPER events ***********************/
function paperClickOn() {
	playerPaper.addEventListener('click', playerPicksPaper);
}
function paperClickOff() {
	playerPaper.removeEventListener('click', playerPicksPaper);
}
function paperMouseOverOn() {
	playerPaper.addEventListener('mouseover', playerPaperButtonOn);
}
function paperMouseOverOff() {
	playerPaper.removeEventListener('mouseover', playerPaperButtonOn);
}
function paperMouseOutOn() {
	playerPaper.addEventListener('mouseout', playerPaperButtonOff);
}
function paperMouseOutOff() {
	playerPaper.removeEventListener('mouseout', playerPaperButtonOff);
}

//********************* SCISSORS events **********************/
function scissorsMouseOverOn() {
	playerScissors.addEventListener('mouseover', playerScissorsButtonOn);
}
function scissorsMouseOverOff() {
	playerScissors.removeEventListener('mouseover', playerScissorsButtonOn);
}
function scissorsMouseOutOn() {
	playerScissors.addEventListener('mouseout', playerScissorsButtonOff);
}
function scissorsMouseOutOff() {
	playerScissors.removeEventListener('mouseout', playerScissorsButtonOff);
}
function scissorsClickOn() {
	playerScissors.addEventListener('click', playerPicksScissors);
}
function scissorsClickOff() {
	playerScissors.removeEventListener('click', playerPicksScissors);
}

//************************************************************/
//************ COMPUTER buttons and button states ************/
//************************************************************/
const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');

function computerRockButtonOn() {
	computerRock.classList.add('turnedOn');
}

function computerRockButtonOff() {
	computerRock.classList.remove('turnedOn');
}

function computerPaperButtonOn() {
	computerPaper.classList.add('turnedOn');
}

function computerPaperButtonOff() {
	computerPaper.classList.remove('turnedOn');
}

function computerScissorsButtonOn() {
	computerScissors.classList.add('turnedOn');
}

function computerScissorsButtonOff() {
	computerScissors.classList.remove('turnedOn');
}

//**** swapping score colors according to who wins round *****/
function playerScoreAreaHighlightOn() {
	playerScoreIcon.classList.add('win');
	playerScoreArea.classList.add('win');
	playerScore.classList.add('win');
}

function playerScoreAreaHighlightOff() {
	playerScoreIcon.classList.remove('win');
	playerScoreArea.classList.remove('win');
	playerScore.classList.remove('win');
}

function computerScoreAreaHighlightOn() {
	computerScoreIcon.classList.add('win');
	computerScoreArea.classList.add('win');
	computerScore.classList.add('win');
}

function computerScoreAreaHighlightOff() {
	computerScoreIcon.classList.remove('win');
	computerScoreArea.classList.remove('win');
	computerScore.classList.remove('win');
}

//** Game text style adjustments depending on who won round **/
function computerWinsRoundStyleOn() {
	gameText.classList.add('computer');
}
function computerWinsRoundStyleOff() {
	gameText.classList.remove('computer');
}
function playerWinsRoundStyleOn() {
	gameText.classList.add('player');
}
function playerWinsRoundStyleOff() {
	gameText.classList.remove('player');
}

//****** Once a choice has been made, call this function *****/
//****** beause we don't want users clicking more buttons ****/
function disableMouseActions() {
	rockClickOff();
	paperClickOff();
	scissorsClickOff();
	rockMouseOverOff();
	rockMouseOutOff();
	paperMouseOverOff();
	paperMouseOutOff();
	scissorsMouseOverOff();
	scissorsMouseOutOff();
}

//********** Called onLoad and after reseting round **********/
function enableMouseActions() {
	rockClickOn();
	paperClickOn();
	scissorsClickOn();
	rockMouseOverOn();
	rockMouseOutOn();
	paperMouseOverOn();
	paperMouseOutOn();
	scissorsMouseOverOn();
	scissorsMouseOutOn();
}

//! **** DO NOT DELETE ***************************************/
enableMouseActions();

//! **********************************************************/
//! ****************** GAME PLAY BEGINS **********************/
//! **********************************************************/

// ***********************************************************/
// ********* Player chooses and all buttons disabled ******** /
// ********* clicked button remains 'ON' ******************** /
// ***********************************************************/
function playerPicksRock() {
	disableMouseActions();
	playerRockButtonOn();
	afterPlayerPicks('Rock');
}

function playerPicksPaper() {
	disableMouseActions();
	playerPaperButtonOn();
	afterPlayerPicks('Paper');
}

function playerPicksScissors() {
	disableMouseActions();
	playerScissorsButtonOn();
	afterPlayerPicks('Scissors');
}

//************************************************************/
//***************** How the computer 'picks' *****************/
//************************************************************/
function computerGetsToPick() {
	//* hardcoding '* 3' (rather than '* max')
	//* since it's 3 max (rock-paper-scissors)
	//* 'num' will return 0, 1 or 2
	let num = Math.floor(Math.random() * 3);
	if (num === 0) {
		computerRockButtonOn();
		return 'Rock';
	} else if (num === 1) {
		computerPaperButtonOn();
		return 'Paper';
	} else {
		computerScissorsButtonOn();
		return 'Scissors';
	}
}

//************************************************************/
//************** Keep score and declare winner ***************/
//************************************************************/
function keepScore(roundResult) {
	switch (roundResult) {
		case 'Player':
			playerScoreAreaHighlightOn();
			playerRounds++;
			break;
		case 'Computer':
			computerScoreAreaHighlightOn();
			computerRounds++;
			break;
		case 'Tie':
			tieRounds++;
			break;
	}

	// update score values
	playerScore.textContent = playerRounds;
	computerScore.textContent = computerRounds;

	if (playerRounds == roundsToWin) {
		winnerText.style.display = 'flex';
		winnerText.textContent = 'YAY! YOU ARE THE WINNER!';
		setTimeout(resetAll, winnerInterval);
	} else if (computerRounds == roundsToWin) {
		winnerText.style.display = 'flex';
		winnerText.textContent = 'Boo! The computer is the winner.';
		setTimeout(resetAll, winnerInterval);
	} else {
		setTimeout(resetRound, roundInterval);
	}
}

//************************************************************/
//************* Take picks & determine a winner **************/
//************************************************************/
function whoWonRound(computer, player) {
	let computerPick = computer;
	let playerPick = player;
	let winText = ' You win!';
	let lossText = ' Computer wins.';
	if (playerPick === computerPick) {
		gameText.textContent = "It's a tie. Play another round!";
		return keepScore('Tie');
	} else if (playerPick === 'Rock' && computerPick === 'Scissors') {
		playerWinsRoundStyleOn();
		gameText.textContent = `Rock beats Scissors!${winText}`;
		return keepScore('Player');
	} else if (playerPick === 'Scissors' && computerPick === 'Paper') {
		playerWinsRoundStyleOn();
		gameText.textContent = `Scissors beats Paper!${winText}`;
		return keepScore('Player');
	} else if (playerPick === 'Paper' && computerPick === 'Rock') {
		playerWinsRoundStyleOn();
		gameText.textContent = `Paper beats Rock!${winText}`;
		return keepScore('Player');
	} else if (playerPick === 'Rock' && computerPick === 'Paper') {
		computerWinsRoundStyleOn();
		gameText.textContent = `Paper beats Rock!${lossText}`;
		return keepScore('Computer');
	} else if (playerPick === 'Paper' && computerPick === 'Scissors') {
		computerWinsRoundStyleOn();
		gameText.textContent = `Scissors beats Paper.${lossText}`;
		return keepScore('Computer');
	} else if (playerPick === 'Scissors' && computerPick === 'Rock') {
		computerWinsRoundStyleOn();
		gameText.textContent = `Rock beats Scissors.${lossText}`;
		return keepScore('Computer');
	}
}

//************************************************************/
//******** Triggered only after player has made choice *******/
//************************************************************/
function afterPlayerPicks(pick) {
	let playerPick = pick;
	//* the idea is to let the user pick, *//
	//* which triggers the round, *********//
	//* then the computer 'picks' second  *//
	let computerPick = computerGetsToPick();
	return whoWonRound(computerPick, playerPick);
}

function resetRound() {
	playerWinsRoundStyleOff();
	computerWinsRoundStyleOff();
	playerScoreAreaHighlightOff();
	computerScoreAreaHighlightOff();
	playerRockButtonOff();
	playerPaperButtonOff();
	playerScissorsButtonOff();
	computerRockButtonOff();
	computerPaperButtonOff();
	computerScissorsButtonOff();
	enableMouseActions();
	gameText.textContent = gameTextDefault;
}

//************************************************************/
//***** Called by user in Modal or after winner declared *****/
//************************************************************/
function resetAll() {
	resetRound();
	playerRounds = 0;
	computerRounds = 0;
	tieRounds = 0;
	playerScore.textContent = playerRounds;
	computerScore.textContent = computerRounds;
	winnerText.style.display = 'none';
	winnerText.textContent = '';
}

//******* on (re)load, set rules text area to default ********/
ruleText.textContent = ruleTextDefault;

//************************************************************/
//**************** Begin code for RESET modal ****************/
//************************************************************/
const resetButton = document.getElementById('resetButton');
const modalResetContainer = document.getElementById('modalResetContainer');
const resetYes = document.getElementById('resetYes');
const resetNo = document.getElementById('resetNo');

resetButton.addEventListener('click', () => {
	modalResetContainer.classList.add('show');
});

resetNo.addEventListener('click', () => {
	modalResetContainer.classList.remove('show');
});

resetYes.addEventListener('click', () => {
	modalResetContainer.classList.remove('show');
	resetAll();
});

//************************************************************/
//************** Begin code for COLOR-MODE swap **************/
//************************************************************/
if (window.CSS && CSS.supports('color', 'var(--primary)')) {
	let toggleColorMode = function swapColorMode(e) {
		//* Switch to Light Mode
		if (e.currentTarget.classList.contains('light--hidden')) {
			// transition is called to make swap more elegant
			transition();
			// Sets the custom HTML tag attribute
			document.documentElement.setAttribute('color-mode', 'light');
			// Sets the user's preference in local storage
			localStorage.setItem('color-mode', 'light');
			return;
		}
		//* Switch to Dark Mode
		transition();
		document.documentElement.setAttribute('color-mode', 'dark');
		localStorage.setItem('color-mode', 'dark');
	};

	// Get the two .color-mode__btn buttons in the DOM
	let toggleColorButtons = document.querySelectorAll('.color-mode__btn');

	// Set up event listeners for each
	toggleColorButtons.forEach(function (btn) {
		btn.addEventListener('click', toggleColorMode);
	});
} else {
	// If the feature isn't supported, then hide the toggle buttons
	let btnContainer = document.querySelector('.color-mode__header');
	btnContainer.style.display = 'none';
}

function transition() {
	document.documentElement.classList.add('transition');
	window.setTimeout(() => {
		document.documentElement.classList.remove('transition');
	}, 600);
}

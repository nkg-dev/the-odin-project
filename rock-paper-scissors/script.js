'use strict';

const gamesToWin = 2;
// ms intervals for setTimeout call
// when resetting after a single game
const gameInterval = 2500;
// when resetting after winner reaches ${gamesToWin}
const winnerInterval = 4000;

const gameTextDefault = `Let's Play!`;
const ruleTextDefault = `Play to ${gamesToWin}!`;

const gameText = document.getElementById('gameText');
const ruleText = document.getElementById('ruleText');
const winnerText = document.getElementById('winnerText');

//! c denotes Computer, p is for Player
const cScore = document.getElementById('computerScore');
const pScore = document.getElementById('playerScore');

const cRockDiv = document.getElementById('computer-rock');
const cPaperDiv = document.getElementById('computer-paper');
const cScissorsDiv = document.getElementById('computer-scissors');

const cDivColorOff = 'var(--color-player-three)';
const cDivColorOn = 'var(--color-player-four)';

const pRockDiv = document.getElementById('player-rock');
const pPaperDiv = document.getElementById('player-paper');
const pScissorsDiv = document.getElementById('player-scissors');

const pDivBorderColorOff = 'var(--color-player-four)';
const pDivBorderColorOn = 'var(--color-player-two)';
const pDivColorOff = 'var(--color-player-three)';
const pDivColorOn = 'var(--color-player-two)';
const pDivShadowOff = 'var(--shadow-off)';
const pDivShadowOn = 'var(--shadow-on)';

// const mediaQueryList = window.matchMedia('(orientation: portrait)');
// gameText.textContent = 'Device is in Portrait mode? ' + mediaQueryList.matches;

// const vWidth = window.visualViewport.width;
// console.log(vWidth);

//* Variables used to track score till someone wins
let playerWins = 0,
	computerWins = 0,
	tieGames = 0;

const cRockDivOn = function () {
	cRockDiv.style.backgroundColor = cDivColorOn;
	cRockDiv.style.borderColor = cDivColorOn;
};

const cRockDivOff = function () {
	cRockDiv.style.backgroundColor = cDivColorOff;
	cRockDiv.style.borderColor = cDivColorOff;
};

const cPaperDivOn = function () {
	cPaperDiv.style.backgroundColor = cDivColorOn;
	cPaperDiv.style.borderColor = cDivColorOn;
};

const cPaperDivOff = function () {
	cPaperDiv.style.backgroundColor = cDivColorOff;
	cPaperDiv.style.borderColor = cDivColorOff;
};

const cScissorsDivOn = function () {
	cScissorsDiv.style.backgroundColor = cDivColorOn;
	cScissorsDiv.style.borderColor = cDivColorOn;
};

const cScissorsDivOff = function () {
	cScissorsDiv.style.backgroundColor = cDivColorOff;
	cScissorsDiv.style.borderColor = cDivColorOff;
};

const cChoice = function () {
	//* hardcoding '* 3' (rather than '* max')
	//* since it's 3 max (rock-paper-scissors)
	//* 'num' should return 0, 1 or 2
	let num = Math.floor(Math.random() * 3);
	if (num === 0) {
		cRockDivOn();
		return 'Rock';
	} else if (num === 1) {
		cPaperDivOn();
		return 'Paper';
	} else {
		cScissorsDivOn();
		return 'Scissors';
	}
};

// when player button is ON, shadow is OFF
const pRockDivOn = function () {
	pRockDiv.style.backgroundColor = pDivColorOn;
	pRockDiv.style.borderColor = pDivBorderColorOn;
	pRockDiv.style.boxShadow = pDivShadowOff;
};

const pRockDivOff = function () {
	pRockDiv.style.backgroundColor = pDivColorOff;
	pRockDiv.style.borderColor = pDivBorderColorOff;
	pRockDiv.style.boxShadow = pDivShadowOn;
};

const pPaperDivOn = function () {
	pPaperDiv.style.backgroundColor = pDivColorOn;
	pPaperDiv.style.borderColor = pDivBorderColorOn;
	pPaperDiv.style.boxShadow = pDivShadowOff;
};

const pPaperDivOff = function () {
	pPaperDiv.style.backgroundColor = pDivColorOff;
	pPaperDiv.style.borderColor = pDivBorderColorOff;
	pPaperDiv.style.boxShadow = pDivShadowOn;
};

const pScissorsDivOn = function () {
	pScissorsDiv.style.backgroundColor = pDivColorOn;
	pScissorsDiv.style.borderColor = pDivBorderColorOn;
	pScissorsDiv.style.boxShadow = pDivShadowOff;
};

const pScissorsDivOff = function () {
	pScissorsDiv.style.backgroundColor = pDivColorOff;
	pScissorsDiv.style.borderColor = pDivBorderColorOff;
	pScissorsDiv.style.boxShadow = pDivShadowOn;
};

function userPlays(i) {
	let input = i;
	if (input === 'Rock') {
		pScissorsDivOff();
		pPaperDivOff();
		pRockDivOn();
		return letsPlay(input);
	} else if (input === 'Paper') {
		pScissorsDivOff();
		pRockDivOff();
		pPaperDivOn();
		return letsPlay(input);
	} else if (input === 'Scissors') {
		pRockDivOff();
		pPaperDivOff();
		pScissorsDivOn();
		return letsPlay(input);
	} else {
		resetGame();
	}
}

function trackScore(result) {
	switch (result) {
		case 'Player':
			playerWins++;
			break;
		case 'Computer':
			computerWins++;
			break;
		case 'Tie':
			tieGames++;
			break;
	}

	pScore.textContent = playerWins;
	cScore.textContent = computerWins;

	if (playerWins == gamesToWin) {
		winnerText.style.display = 'flex';
		winnerText.textContent = "Yay! You're the winner! 😎";
		setTimeout(resetAll, winnerInterval);
	} else if (computerWins == gamesToWin) {
		winnerText.style.display = 'flex';
		winnerText.textContent = 'Boo! The computer is the winner. 😕';
		setTimeout(resetAll, winnerInterval);
	} else {
		setTimeout(resetGame, gameInterval);
	}
}

//* take the computer's choice and user's choice
//* to determine a winnner;
//* pass game number to track score
function gamePlay(computer, player) {
	let computerPlay = computer;
	let playerChoice = player;
	let winText = ' You win! 😀';
	let lossText = ' You lose. 😕';
	if (playerChoice === computerPlay) {
		gameText.textContent = "It's a tie. 😐 Play again!";
		return trackScore('Tie');
	} else if (playerChoice === 'Rock' && computerPlay === 'Scissors') {
		gameText.textContent = `Rock beats Scissors!${winText}`;
		return trackScore('Player');
	} else if (playerChoice === 'Scissors' && computerPlay === 'Paper') {
		gameText.textContent = `Scissors beats Paper!${winText}`;
		return trackScore('Player');
	} else if (playerChoice === 'Paper' && computerPlay === 'Rock') {
		gameText.textContent = `Paper beats Rock!${winText}`;
		return trackScore('Player');
	} else if (playerChoice === 'Rock' && computerPlay === 'Paper') {
		gameText.textContent = `Paper beats Rock!${lossText}`;
		return trackScore('Computer');
	} else if (playerChoice === 'Paper' && computerPlay === 'Scissors') {
		gameText.textContent = `Scissors beats Paper.${lossText}`;
		return trackScore('Computer');
	} else if (playerChoice === 'Scissors' && computerPlay === 'Rock') {
		gameText.textContent = `Rock beats Scissors.${lossText}`;
		return trackScore('Computer');
	}
}

function letsPlay(player) {
	let playerChoice = player;
	let computerPick;
	// if (playerChoice !== undefined) {
	computerPick = cChoice();
	// computerPick = setTimeout(computerPlays, interval * 8);
	// }
	return gamePlay(computerPick, playerChoice);
}

function resetGame() {
	pRockDivOff();
	pPaperDivOff();
	pScissorsDivOff();
	cRockDivOff();
	cPaperDivOff();
	cScissorsDivOff();
	gameText.textContent = gameTextDefault;
}

function resetAll() {
	resetGame();
	playerWins = 0;
	computerWins = 0;
	tieGames = 0;
	pScore.textContent = playerWins;
	cScore.textContent = computerWins;
	winnerText.style.display = 'none';
	winnerText.textContent = '';
}

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

ruleText.textContent = ruleTextDefault;

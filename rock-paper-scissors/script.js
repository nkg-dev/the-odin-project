'use strict';

const interval = 500;

const gameText = document.getElementById('gameText');

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

const pDivColorOff = 'var(--color-player-three)';
const pDivColorOn = 'var(--color-player-two)';
const pDivBorderColorOff = 'var(--color-player-four)';
const pDivBorderColorOn = 'var(--color-player-two)';
const pDivShadowOff = 'var(--shadow-off)';
const pDivShadowOn = 'var(--shadow-on)';

// const mediaQueryList = window.matchMedia('(orientation: portrait)');
// gameText.textContent = 'Device is in Portrait mode? ' + mediaQueryList.matches;

// const vWidth = window.visualViewport.width;
// console.log(vWidth);

//* Variables used to track score across 5 games
let playerWins = 0,
	computerWins = 0,
	tieGames = 0;

const cRockDivOn = function () {
	cRockDiv.style.borderColor = cDivColorOn;
	cRockDiv.style.backgroundColor = cDivColorOn;
};

const cRockDivOff = function () {
	cRockDiv.style.borderColor = cDivColorOff;
	cRockDiv.style.backgroundColor = cDivColorOff;
};

const cPaperDivOn = function () {
	cPaperDiv.style.borderColor = cDivColorOn;
	cPaperDiv.style.backgroundColor = cDivColorOn;
};

const cPaperDivOff = function () {
	cPaperDiv.style.borderColor = cDivColorOff;
	cPaperDiv.style.backgroundColor = cDivColorOff;
};

const cScissorsDivOn = function () {
	cScissorsDiv.style.borderColor = cDivColorOn;
	cScissorsDiv.style.backgroundColor = cDivColorOn;
};

const cScissorsDivOff = function () {
	cScissorsDiv.style.borderColor = cDivColorOff;
	cScissorsDiv.style.backgroundColor = cDivColorOff;
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

// function computerPlays() {
// 	setTimeout(cRockDivOn, interval * 1);
// 	setTimeout(cRockDivOff, interval * 2);
// 	setTimeout(cPaperDivOn, interval * 3);
// 	setTimeout(cPaperDivOff, interval * 4);
// 	setTimeout(cScissorsDivOn, interval * 5);
// 	setTimeout(cScissorsDivOff, interval * 6);
// 	setTimeout(cChoice, interval * 7);
// }

const pRockDivOn = function () {
	pRockDiv.style.borderColor = pDivBorderColorOn;
	pRockDiv.style.boxShadow = pDivShadowOff;
	pRockDiv.style.backgroundColor = pDivColorOn;
};

const pRockDivOff = function () {
	pRockDiv.style.borderColor = pDivBorderColorOff;
	pRockDiv.style.boxShadow = pDivShadowOn;
	pRockDiv.style.backgroundColor = pDivColorOff;
};

const pPaperDivOn = function () {
	pPaperDiv.style.borderColor = pDivBorderColorOn;
	pPaperDiv.style.boxShadow = pDivShadowOff;
	pPaperDiv.style.backgroundColor = pDivColorOn;
};

const pPaperDivOff = function () {
	pPaperDiv.style.borderColor = pDivBorderColorOff;
	pPaperDiv.style.boxShadow = pDivShadowOn;
	pPaperDiv.style.backgroundColor = pDivColorOff;
};

const pScissorsDivOn = function () {
	pScissorsDiv.style.borderColor = pDivBorderColorOn;
	pScissorsDiv.style.boxShadow = pDivShadowOff;
	pScissorsDiv.style.backgroundColor = pDivColorOn;
};

const pScissorsDivOff = function () {
	pScissorsDiv.style.borderColor = pDivBorderColorOff;
	pScissorsDiv.style.boxShadow = pDivShadowOn;
	pScissorsDiv.style.backgroundColor = pDivColorOff;
};

function userPlays(i) {
	let input = i;
	if (input === 'Rock') {
		pScissorsDivOff();
		pPaperDivOff();
		pRockDivOn();
		gameText.textContent = input;
		return letsPlay(input);
	} else if (input === 'Paper') {
		pScissorsDivOff();
		pRockDivOff();
		pPaperDivOn();
		gameText.textContent = input;
		return letsPlay(input);
	} else if (input === 'Scissors') {
		pRockDivOff();
		pPaperDivOff();
		pScissorsDivOn();
		gameText.textContent = input;
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
	if (playerWins == 5) {
		window.alert("Congratulations! You're the winner! :)");
		resetAll();
	} else if (computerWins == 5) {
		window.alert('Sorry. The computer is the winner. :(');
		resetAll();
	} else {
		setTimeout(resetGame, interval * 10);
	}
}

//* take the computer's choice and user's choice
//* to determine a winnner;
//* pass game number to track score
function gamePlay(computer, player) {
	let computerPlay = computer;
	let playerChoice = player;
	if (playerChoice === computerPlay) {
		gameText.textContent = "It's a tie. :|";
		return trackScore('Tie');
	} else if (playerChoice === 'Rock' && computerPlay === 'Scissors') {
		gameText.textContent = 'Rock beats Scissors! You win!';
		return trackScore('Player');
	} else if (playerChoice === 'Scissors' && computerPlay === 'Paper') {
		gameText.textContent = 'Scissors beats Paper! You win!';
		return trackScore('Player');
	} else if (playerChoice === 'Paper' && computerPlay === 'Rock') {
		gameText.textContent = 'Paper beats Rock! You win!';
		return trackScore('Player');
	} else if (playerChoice === 'Rock' && computerPlay === 'Paper') {
		gameText.textContent = 'Paper beats Rock. You lose. :(';
		return trackScore('Computer');
	} else if (playerChoice === 'Paper' && computerPlay === 'Scissors') {
		gameText.textContent = 'Scissors beats Paper. You lose. :(';
		return trackScore('Computer');
	} else if (playerChoice === 'Scissors' && computerPlay === 'Rock') {
		gameText.textContent = 'Rock beats Scissors. You lose. :(';
		return trackScore('Computer');
	}
}

function letsPlay(player) {
	let playerChoice = player;
	let computerPick;
	if (playerChoice !== undefined) {
		computerPick = cChoice();
		// computerPick = setTimeout(computerPlays, interval * 8);
	}
	return gamePlay(computerPick, playerChoice);
}

function resetGame() {
	pRockDivOff();
	pPaperDivOff();
	pScissorsDivOff();
	cRockDivOff();
	cPaperDivOff();
	cScissorsDivOff();
	gameText.textContent = 'First to 5 is the winner!';
}

function resetAll() {
	pRockDivOff();
	pPaperDivOff();
	pScissorsDivOff();
	cRockDivOff();
	cPaperDivOff();
	cScissorsDivOff();
	gameText.textContent = 'Please pick Rock, Paper, or Scissors.';
	pScore.textContent = 0;
	cScore.textContent = 0;
}

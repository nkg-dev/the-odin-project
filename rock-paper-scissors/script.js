'use strict';

//* Variables used to track score across 5 games
let userWins = 0,
	computerWins = 0,
	drawGames = 0;

function computerPlays() {
	//* hardcoding '* 3' (rather than '* max')
	//* since it's 3 max (rock-paper-scissors)
	//* 'num' should return 0, 1 or 2
	let num = Math.floor(Math.random() * 3);
	if (num === 0) {
		return 'Rock';
	} else if (num === 1) {
		return 'Paper';
	} else {
		return 'Scissors';
	}
}

function userPlays(i) {
	let input = i;
	//* If 'i' is not undefined [meaning invalid entry], special prompt
	if (input !== undefined) {
		input = window.prompt(
			'INVALID ENTRY!\n\nPlease enter Rock, Paper, Scissors'
		);
	} else {
		//* Otherwise, prompt user to input text
		input = window.prompt('Chose one: Rock, Paper, Scissors');
	}
	//* check to make sure user has input text
	if (input === null) {
		input = window.prompt(
			'OOPS!\n\nYou forgot enter one: Rock, Paper, Scissors'
		);
	}
	//* Let's format the user's text entry
	input = input.trim();
	let inputLower = input.toLowerCase();
	let titleCase = [...inputLower];
	titleCase.splice(0, 1, inputLower[0].toUpperCase());
	let inputScrubbed = '';
	inputScrubbed = titleCase.join('');
	//* check if the scrubbed input is valid
	if (
		inputScrubbed === 'Rock' ||
		inputScrubbed === 'Paper' ||
		inputScrubbed === 'Scissors'
	) {
		return inputScrubbed;
	} else {
		//* if entry not valid, call function again
		return userPlays(inputScrubbed);
	}
}

function trackScore(result, gameCount) {
	let gameNum = gameCount - 1;
	if (gameNum <= 5) {
		switch (result) {
			case 'User':
				userWins++;
				break;
			case 'Comp':
				computerWins++;
				break;
			case 'Draw':
				drawGames++;
				break;
		}
		console.log(
			`User: ${userWins}\nComputer: ${computerWins}\nDraw: ${drawGames}`
		);
		gameNum++;
	}
}

//* take the computer's choice and user's choice
//* to determine a winnner;
//* pass game number to track score
function gamePlay(computer, user, count) {
	let computerPlay = computer;
	let userPlay = user;
	let gameNum = count;
	while (gameNum <= 5) {
		console.log('Computer played ' + computerPlay);
		console.log('You played ' + userPlay);
		gameNum++;
		if (userPlay === computerPlay) {
			console.log("It's a draw :|");
			return trackScore('Draw', gameNum);
		} else if (userPlay == 'Rock' && computerPlay == 'Scissors') {
			console.log('Rock beats Scissors! You win!');
			return trackScore('User', gameNum);
		} else if (userPlay == 'Scissors' && computerPlay == 'Paper') {
			console.log('Scissors beats Paper! You win!');
			return trackScore('User', gameNum);
		} else if (userPlay == 'Paper' && computerPlay == 'Rock') {
			console.log('Paper beats Rock! You win!');
			return trackScore('User', gameNum);
		} else if (userPlay == 'Rock' && computerPlay == 'Paper') {
			console.log('Paper beats Rock. You lose. :(');
			return trackScore('Comp', gameNum);
		} else if (userPlay == 'Paper' && computerPlay == 'Scissors') {
			console.log('Scissors beats Paper. You lose. :(');
			return trackScore('Comp', gameNum);
		} else if (userPlay == 'Scissors' && computerPlay == 'Rock') {
			console.log('Rock beats Scissors. You lose. :(');
			return trackScore('Comp', gameNum);
		}
	}
}

function letsPlay() {
	let gameNum = 1;
	while (gameNum <= 5) {
		console.log('*** Game #' + gameNum + ' ***');
		gamePlay(computerPlays(), userPlays(), gameNum);
		gameNum++;
	}
}

letsPlay();

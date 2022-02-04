'use strict';

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
	//* trim the whitespace
	input = input.trim();
	//* convert input to all lowercase
	let inputLower = input.toLowerCase();
	//* create variable to store the lowercase text
	let textFix = [...inputLower];
	//* Replace first letter with uppercase, leaving rest of string unaffected
	textFix.splice(0, 1, inputLower[0].toUpperCase());
	//* variable textScrubbed to store Titlecase inputText value
	let textScrubbed = '';
	//* join array into string, use empty string as separator string
	textScrubbed = textFix.join('');
	//* check if entry is valid (Rock, Paper, Scissors) or not
	if (
		textScrubbed === 'Rock' ||
		textScrubbed === 'Paper' ||
		textScrubbed === 'Scissors'
	) {
		return textScrubbed;
	} else {
		//* if entry isn't valid, call function again
		return userPlays(textScrubbed);
	}
}

function gamePlay(computer, user, count) {
	let cPlay = computer;
	let uPlay = user;
	let i = count;
	while (i <= 5) {
		console.log('Computer played ' + cPlay);
		console.log('You played ' + uPlay);
		i++;
		if (uPlay === cPlay) {
			console.log("It's a draw :|");
			return keepScore('Draw', i);
		} else if (uPlay == 'Rock' && cPlay == 'Scissors') {
			console.log('Rock beats Scissors! You win!');
			return keepScore('User', i);
		} else if (uPlay == 'Scissors' && cPlay == 'Paper') {
			console.log('Scissors beats Paper! You win!');
			return keepScore('User', i);
		} else if (uPlay == 'Paper' && cPlay == 'Rock') {
			console.log('Paper beats Rock! You win!');
			return keepScore('User', i);
		} else if (uPlay == 'Rock' && cPlay == 'Paper') {
			console.log('Paper beats Rock. You lose. :(');
			return keepScore('Comp', i);
		} else if (uPlay == 'Paper' && cPlay == 'Scissors') {
			console.log('Scissors beats Paper. You lose. :(');
			return keepScore('Comp', i);
		} else if (uPlay == 'Scissors' && cPlay == 'Rock') {
			console.log('Rock beats Scissors. You lose. :(');
			return keepScore('Comp', i);
		}
	}
}

//* variables to track score
let u = 0,
	c = 0,
	d = 0;

function keepScore(result, gameCount) {
	let i = gameCount - 1;
	let outcomes = {};
	if (i <= 5) {
		switch (result) {
			case 'User':
				u++;
				break;
			case 'Comp':
				c++;
				break;
			case 'Draw':
				d++;
				break;
		}
		console.log(`User: ${u}\nComputer: ${c}\nDraw: ${d}`);
		i++;
	}
}

function letsPlay() {
	let i = 1;
	while (i <= 5) {
		console.log('*** Game #' + i + ' ***');
		gamePlay(computerPlays(), userPlays(), i);
		i++;
	}
}

letsPlay();

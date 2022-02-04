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

let c = computerPlays();

function userPlays(i) {
	let input = i;
	//* If 'i' is not null, then give invalid entry prompt
	if (input !== undefined) {
		input = window.prompt(
			'INVALID ENTRY!\n\nPlease enter Rock, Paper, Scissors'
		);
	} else {
		//* Prompt user to input text
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

let u = userPlays();

function gamePlay(computer, user) {
	let cPlay = computer;
	let uPlay = user;
	console.log('Computer played ' + cPlay);
	console.log('You played ' + uPlay);
	if (uPlay === cPlay) {
		console.log("It's a draw :|");
		console.log('Draw');
	} else if (uPlay == 'Rock' && cPlay == 'Scissors') {
		console.log('Rock beats Scissors! You win!');
		console.log('User');
	} else if (uPlay == 'Scissors' && cPlay == 'Paper') {
		console.log('Scissors beats Paper! You win!');
		console.log('User');
	} else if (uPlay == 'Paper' && cPlay == 'Rock') {
		console.log('Paper beats Rock! You win!');
		console.log('User');
	} else if (uPlay == 'Rock' && cPlay == 'Paper') {
		console.log('Paper beats Rock. You lose. :(');
		console.log('Comp');
	} else if (uPlay == 'Paper' && cPlay == 'Scissors') {
		console.log('Scissors beats Paper. You lose. :(');
		console.log('Comp');
	} else if (uPlay == 'Scissors' && cPlay == 'Rock') {
		console.log('Rock beats Scissors. You lose. :(');
		console.log('Comp');
	}
}

gamePlay(c, u);

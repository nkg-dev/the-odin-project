'use strict';
function computerPlay() {
	// hardcoding '* 3' (rather than '* max')
	// since it's 3 max (rock-paper-scissors)
	let num = Math.floor(Math.random() * 3);
	if (num === 0) {
		return 'Rock';
	} else if (num === 1) {
		return 'Paper';
	} else {
		return 'Scissors';
	}
}

console.log(computerPlay());

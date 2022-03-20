'use strict';

// keyvalues Return == Enter
// BUT Clear button (on keyboards with numberpad) is Clear NOT Delete or Backspace

function toggleActive(e) {
	console.log(e);
	//* remove Active class if present
	if (e.target.classList.contains('active')) {
		console.log(`REMOVE active class`);
		// transition is called to make swap more elegant
		e.target.classList.remove('active');
		return;
	}
	//* Make Active
	console.log(`ADD active class`);
	e.target.classList.add('active');
}

function addActive(btn) {
	btn.classList.add('active');
	// btn.classList.add('active');
	// this.addEventListener('transitionend', addActive(btn));
}

function keyPress(e) {
	// match the button the key pressed
	console.log(`e.key value is ${e.key}`);
	const btn = document.querySelector(`button[data-key='${e.key}']`);
	// if no button matches, exit function
	if (!btn) return;
	// toggleActive(btn);
	btn.classList.add('active');
	// routeKeyPress(e.key);
}

// function routeKeyPress(key)

function mouseClick(e) {
	// match the button the key pressed
	const btn = document.querySelector(`button[data-key='${e.key}']`);
	// if no button matches, exit function
	if (!btn) return;
	// addActive(btn);
	btn.classList.add('active');
}

// get all the buttons which will be mapped to keyboard entry
const btns = document.querySelectorAll('button[data-key]');

// btns.forEach((key) =>
// 	key.addEventListener('click', () => {
// 		key.classList.add('active');
// 	})
// );

btns.forEach((key) =>
	key.addEventListener('transitionend', () => {
		key.classList.remove('active');
	})
);
// btns.forEach((key) => key.addEventListener('transitionend', toggleActive(key)));
// btns.forEach((key) => key.addEventListener('click', toggleActive(key)));
// btns.forEach((key) => key.addEventListener('pointerup', toggleActive(key)));

document.addEventListener('keydown', keyPress);
document.addEventListener('pointerdown', toggleActive);
document.addEventListener('pointerdown', (e) => {
	console.log(e.target.value);
	console.log(e.target.name);
});
document.addEventListener('pointerup', toggleActive);
// window.addEventListener('click', (e) => {
// 	e.classList.add('active');
// });

//************************************************************/
//************** Begin code for data-theme swap **************/
//************************************************************/
let toggleColorMode = function swapColorMode(e) {
	//* Switch to Light Mode
	if (e.currentTarget.classList.contains('light--hidden')) {
		// transition is called to make swap more elegant
		transition();
		// Sets the custom HTML tag attribute
		document.documentElement.setAttribute('data-theme', 'light');
		// Sets the user's preference in local storage
		localStorage.setItem('data-theme', 'light');
		return;
	}
	//* Switch to Dark Mode
	transition();
	document.documentElement.setAttribute('data-theme', 'dark');
	localStorage.setItem('data-theme', 'dark');
};

// Get the two .data-theme__btn buttons in the DOM
let toggleColorButtons = document.querySelectorAll('.data-theme__btn');

// Set up event listeners for each
toggleColorButtons.forEach(function (btn) {
	btn.addEventListener('click', toggleColorMode);
});

function transition() {
	document.documentElement.classList.add('transition');
	window.setTimeout(() => {
		document.documentElement.classList.remove('transition');
	}, 1200);
}

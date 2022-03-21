'use strict';

// keyvalues Return == Enter
// BUT Clear button (on keyboards with numberpad) is Clear NOT Delete or Backspace

function toggleActive(e) {
	//* remove Active class if present
	if (e.target.classList.contains('active')) {
		console.log('Remove');
		e.target.classList.remove('active');
		return;
	}
	//* Make Active
	console.log('Add');
	e.target.classList.add('active');
	return;
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
	// routeKey(e.key);
}

// function routeKeyPress(key)

function mouseClick(e) {
	console.log(e.target.value);
	if (!e.target.value) return;
	// routeKey(e.target.value);
	// const btn = document.querySelector(`button[data-key='${e.key}']`);
	// if no button matches, exit function
	// if (!btn) return;
	// addActive(btn);
	// e.target.addEventListener('transitionend', toggleActive);
	e.target.classList.add('active');
}

function routeKey(key) {
	switch (key) {
		case '0':
	}
}

// get all the buttons which will be mapped to keyboard entry
const btns = document.querySelectorAll('button[data-key]');

btns.forEach((key) =>
	key.addEventListener('transitionend', () => {
		key.classList.remove('active');
	})
);

document.addEventListener('keydown', keyPress);
document.addEventListener('pointerdown', (e) => {
	console.log(e.target.value);
	toggleActive(e);
});
// document.addEventListener('touchstart', (e) => {
// 	toggleActive(e);
// });
// document.addEventListener('touchend', (e) => {
// 	toggleActive(e);
// });
document.addEventListener('pointerup', (e) => {
	e.target.addEventListener('transitionend', toggleActive(e));
});

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

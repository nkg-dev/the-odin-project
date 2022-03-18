'use strict';

//************************************************************/
//************** Begin code for COLOR-MODE swap **************/
//************************************************************/
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

function transition() {
	document.documentElement.classList.add('transition');
	window.setTimeout(() => {
		document.documentElement.classList.remove('transition');
	}, 600);
}

'use strict';

//** depending on how many squares you want, adjust divCount **/
//******* should be a squared value (ie: 256 = 16 * 16) *******/
// let divCount = 256;

// let divsPerSide = Math.floor(divCount ** (1 / 2));
let divsPerSide = 16;
let divCount = divsPerSide ** 2;
let divWidth = Math.floor(960 / divsPerSide);
console.log(`DIVs per Side = ${divsPerSide}`);
console.log(`DIV Width = ${divWidth}px`);

const sketchArea = document.getElementById('sketchArea');

sketchArea.style.gridTemplateColumns = `repeat(${divsPerSide}, ${divWidth}px)`;
sketchArea.style.gridTemplateRows = `repeat(${divsPerSide}, ${divWidth}px)`;

function buildGrid() {
	for (let i = 0; i < divCount; i++) {
		const sketchDiv = document.createElement('div');
		sketchDiv.classList.add('sketch-div');
		let hue = Math.floor(Math.random() * 361);
		// sketchDiv.textContent = i + '–' + hue;
		// sketchDiv.textContent = i;
		// sketchDiv.style.color = `hsl(${hue - 180}, 100%, 100%)`;
		// sketchDiv.style.backgroundColor = `hsl(${hue}, 75%, 50%)`;
		sketchDiv.style.backgroundColor = 'black';
		sketchDiv.style.opacity = 0;
		sketchArea.appendChild(sketchDiv);
	}
}

buildGrid();

function getDarker() {
	// this.style.backgroundColor = 'black';
	//*** in color theory, 'shade' is adding (% of) black to a color ***/
	let shade = Number(this.style.getPropertyValue('opacity'));
	//*** toFixed() function returns a string, so needs Number() *******/
	if (Number(shade.toFixed(1)) <= 0.9) {
		shade += 0.1;
		console.log(`Opacity set to ${shade}`);
	}
	this.style.opacity = shade;
}

function getLuminance() {
	console.log(document.activeElement.getAttribute('backgroundColor'));
}

const sketchDivs = document.querySelectorAll('div.sketch-div');
for (let i = 0; i < divCount; i++) {
	sketchDivs[i].addEventListener('mouseover', getDarker);
	// sketchDivs[i].removeEventListener('mouseover', getDarker);
}

'use strict';

//** depending on how many squares you want, adjust divCount **/
//******* should be a squared value (ie: 256 = 16 * 16) *******/
// let divCount = 256;

// let divsPerSide = Math.floor(divCount ** (1 / 2));
let divsPerSide = 60;
let divCount = divsPerSide ** 2;
let divWidth = 60 / divsPerSide;
// let divWidth = Math.floor(60 / divsPerSide);
// sketchArea.style.gridTemplateColumns = `repeat(${divsPerSide}, ${divWidth}px)`;
// sketchArea.style.gridTemplateRows = `repeat(${divsPerSide}, ${divWidth}px)`;

console.log(`DIVs per Side = ${divsPerSide}`);
console.log(`DIV Width = ${divWidth}rem`);

const sketchArea = document.getElementById('sketchArea');

sketchArea.style.gridTemplateColumns = `repeat(${divsPerSide}, ${divWidth}rem)`;
sketchArea.style.gridTemplateRows = `repeat(${divsPerSide}, ${divWidth}rem)`;

function buildGrid() {
	sketchArea.innerText = '';
	for (let i = 0; i < divCount; i++) {
		const sketchDiv = document.createElement('div.sketch-div');
		// sketchDiv.classList.add('sketch-div');
		// let hue = Math.floor(Math.random() * 361);
		// sketchDiv.textContent = i + '–' + hue;
		// sketchDiv.textContent = i;
		// sketchDiv.style.color = `hsl(${hue - 180}, 75%, 50%)`;
		// sketchDiv.style.backgroundColor = `hsl(${hue}, 75%, 50%)`;
		sketchDiv.addEventListener('mouseover', letsDraw);
		sketchDiv.style.backgroundColor = 'black';
		sketchDiv.style.opacity = 0;
		sketchArea.appendChild(sketchDiv);
	}
}

buildGrid();

//************************************************************/
//****************** Begin code for DRAWING ******************/
//************************************************************/
function letsDraw() {
	//*** As in color theory, shade adds black to the color ****/
	let shade = Number(this.style.getPropertyValue('opacity'));
	//*** toFixed() returns a string, so needs Number() ********/
	if (Number(shade.toFixed(1)) <= 0.9) {
		shade += 0.1;
		console.log(`Opacity set to ${shade}`);
	}
	this.style.opacity = shade;
}

//************************************************************/
//**************** Begin code for RESET modal ****************/
//************************************************************/
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
	buildGrid();
	modalResetContainer.classList.remove('show');
});

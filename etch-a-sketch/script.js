'use strict';

//*** User should click/press down before drawing **************/
//*** so we need to capture click/press state ******************/
let pointerDown = false;
document.body.onpointerdown = () => (pointerDown = true);
document.body.onpointerup = () => (pointerDown = false);

function buildGrid() {
	const sketchArea = document.getElementById('sketchArea');
	let divsPerSide = document.getElementById('divsPerSide').value;
	let divCount = divsPerSide ** 2;
	//*** 60 [as in rem] is used to maintain consistent height & *****/
	//*** width regardless of user wanting 16 or 100 DIVs per side ***/
	let divWidth = 60 / divsPerSide;

	sketchArea.style.gridTemplateColumns = `repeat(${divsPerSide}, calc(var(--block-size) * ${divWidth})`;
	sketchArea.style.gridTemplateRows = `repeat(${divsPerSide}, calc(var(--block-size) * ${divWidth})`;
	sketchArea.innerText = '';
	for (let i = 0; i < divCount; i++) {
		const sketchDiv = document.createElement('div');
		sketchDiv.classList.add('sketch-div');
		// let hue = Math.floor(Math.random() * 361);
		// sketchDiv.style.backgroundColor = `hsl(${hue}, 75%, 50%)`;
		sketchDiv.addEventListener('pointerover', letsDraw, true);
		sketchDiv.addEventListener('pointerdown', letsDraw);
		sketchDiv.style.backgroundColor = 'black';
		sketchDiv.style.opacity = 0;
		sketchArea.appendChild(sketchDiv);
	}
}

buildGrid();

//************************************************************/
//****************** Begin code for DRAWING ******************/
//************************************************************/
function letsDraw(e) {
	//*** if mouseover but NOT clicked, exit *******************/
	if (!pointerDown) return;
	//*** shade adds black to the color ************************/
	let shade = Number(this.style.getPropertyValue('opacity'));

	//*** toFixed() returns a string, so needs Number() ********/
	//*** I used 0.9 because JS sets opacity at 0.99999 ********/
	//*** when incrementing by 0.1 *****************************/
	if (Number(shade.toFixed(1)) <= 0.9) {
		shade += 0.1;
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

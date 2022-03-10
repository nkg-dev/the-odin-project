'use strict';

const sketchArea = document.getElementById('sketchArea');

//** depending on how many squares you want, adjust divCount **/
//******* should be a squared value (ie: 900 = 30 * 30) *******/
const divCount = 3600;

for (let i = 0; i < divCount; i++) {
	const sketchDiv = document.createElement('div');
	sketchDiv.classList.add('sketch-div');
	let hue = Math.floor(Math.random() * 360);
	sketchDiv.textContent = hue;
	sketchDiv.style.color = `hsl(${hue - 180}, 75%, 50%)`;
	sketchDiv.style.backgroundColor = `hsl(${hue}, 75%, 50%)`;
	sketchArea.appendChild(sketchDiv);
}

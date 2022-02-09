const container = document.querySelector('#container');

const content = document.createElement('div');
content.classList.add('content');
content.textContent = 'This is the glorious text-content!';

container.appendChild(content);

const addlContent01 = document.createElement('p');
addlContent01.style.cssText = 'color: red;';
addlContent01.textContent = "Hey I'm red!";

const addlContent02 = document.createElement('h3');
addlContent02.style.cssText = 'color: blue;';
addlContent02.textContent = "I'm a blue h3!";

const addlContent03 = document.createElement('div');
addlContent03.style.cssText =
	'background-color: pink; border: 2px solid black;';

const addlContent04 = document.createElement('h1');
// addlContent04.style.cssText = 'color: red;';
addlContent04.textContent = "I'm a div";

const addlContent05 = document.createElement('p');
// addlContent05.style.cssText = 'color: red;';
addlContent05.textContent = 'ME TOO!';

addlContent03.appendChild(addlContent04);
addlContent03.appendChild(addlContent05);

container.appendChild(addlContent01);
container.appendChild(addlContent02);
container.appendChild(addlContent03);

btn.addEventListener('click', function (e) {
	// e.target.style.background = 'blue';
	e.target.style.cssText = 'background-color: blue; color: white;';
});

// buttons is a node list. It looks and acts much like an array.
const buttons = document.querySelectorAll('button');

// we use the .forEach method to iterate through each button
buttons.forEach((button) => {
	// and for each one we add a 'click' listener
	button.addEventListener('click', () => {
		alert(button.id);
	});
});

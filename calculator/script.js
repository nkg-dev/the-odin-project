'use strict';

class Calculator {
	constructor(previousOperandText, currentOperandText) {
		this.previousOperandText = previousOperandText;
		this.currentOperandText = currentOperandText;
		this.clear();
	}

	clear() {
		this.currentOperand = '';
		this.previousOperand = '';
		this.operation = undefined;
	}

	backSpace() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	appendNumber(number) {
		if (number === '.' && this.currentOperand.includes('.')) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	chooseOperation(operation) {
		if (this.currentOperand === '') return;
		if (this.previousOperand !== '') {
			this.compute();
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	compute() {
		let calculation;
		const previous = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);
		if (isNaN(previous) || isNaN(current)) return;
		switch (this.operation) {
			case '+':
				calculation = previous + current;
				break;
			case '-':
				calculation = previous - current;
				break;
			case '×':
				calculation = previous * current;
				break;
			case '÷':
				calculation = previous / current;
				break;
			default:
				return;
		}
		if (calculation == Infinity) {
			window.alert(
				"\n⛔️  C'mon, you can't divide by zero!\n\n⚠️  Enter new number(s) or Clear All.\n"
			);
			return (this.currentOperand = '');
		}
		this.currentOperand = calculation;
		this.operation = undefined;
		this.previousOperand = '';
	}

	getDisplayNumber(number) {
		const stringNumber = number?.toString() || '';
		if (stringNumber === '') return '';
		const [integerDigits, decimalDigits] = stringNumber.split('.');
		// const decimalDigits = stringNumber.split('.')[1];
		let integerDisplay;
		if (isNaN(integerDigits)) {
			integerDisplay = '';
		} else {
			integerDisplay = integerDigits.toLocaleString('en-US', {
				maximumFractionDigits: 0,
			});
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}

	updateDisplay() {
		this.currentOperandText.textContent = this.getDisplayNumber(
			this.currentOperand
		);
		if (this.operation != null) {
			this.previousOperandText.textContent = `${this.previousOperand}${this.operation}`;
		} else {
			this.previousOperandText.textContent = '';
		}
	}
}

const NUMBER_FORMATTER = new Intl.NumberFormat('en-US', {
	maximumSignificantDigits: 11,
	// notation: 'engineering',
});

console.log(NUMBER_FORMATTER.format(''));

const numberButtons = document.querySelectorAll('[data-number]');
// console.log(numberButtons);
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

// const numberButtonsArray = [...numberButtons.value];

const calculator = new Calculator(previousOperandText, currentOperandText);
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
}

function addActive(btn) {
	btn.classList.add('active');
	// btn.classList.add('active');
	// this.addEventListener('transitionend', addActive(btn));
}

function keyPress(e) {
	// match the button with the key pressed
	console.log(`e.key value is ${e.key}`);
	let keyValue = e.key;
	switch (keyValue) {
		case 'Enter':
			keyValue = '=';
			break;
		case 'x':
			keyValue = '*';
			break;
		case 'Clear':
			keyValue = 'Delete';
			break;
	}
	console.log(`keyValue is '${keyValue}'`);
	const btn = document.querySelector(`button[data-key='${keyValue}']`);
	// if no button matches, exit function
	if (!btn) return;
	// toggleActive(btn);
	btn.classList.add('active');
	routeInput(keyValue);
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
	routeInput(e.target.value);
}

function routeInput(value) {
	const numberArray = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	const operatorArray = ['+', '-', '*', '/'];
	const functionArray = ['Backspace', 'Delete', 'Clear'];
	console.log(`value == ${value}`);
	console.log(typeof value);
	if (numberArray.includes(value)) {
		console.log(`${value} is a number`);
		calculator.appendNumber(value);
		calculator.updateDisplay();
	}
	if (operatorArray.includes(value)) {
		console.log(`${value} is an operator`);
		if (value === '/') {
			value = '÷';
		}
		if (value === '*') {
			value = '×';
		}
		calculator.chooseOperation(value);
		calculator.updateDisplay();
	}
	if (value === '=') {
		console.log(`${value} is Equals`);
		calculator.compute();
		calculator.updateDisplay();
	}
	if (value === 'Backspace') {
		console.log(`${value} is Backspace`);
		calculator.backSpace();
		calculator.updateDisplay();
	}
	if (value === 'Delete') {
		console.log(`${value} is Delete`);
		calculator.clear();
		calculator.updateDisplay();
	}
}

// get all the buttons which will be mapped to keyboard entry
const btns = document.querySelectorAll('button[data-key]');

btns.forEach((key) =>
	key.addEventListener('transitionend', () => {
		key.classList.remove('active');
	})
);
btns.forEach((key) =>
	key.addEventListener('pointerdown', () => {
		routeInput(key.value);
	})
);

document.addEventListener('keydown', keyPress);

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
toggleColorButtons.forEach((btn) => {
	btn.addEventListener('click', toggleColorMode);
});

function transition() {
	document.documentElement.classList.add('transition');
	window.setTimeout(() => {
		document.documentElement.classList.remove('transition');
	}, 1200);
}

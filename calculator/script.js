'use strict';

const maxDecimalLength = 4;

const INTEGER_FORMATTER = new Intl.NumberFormat('en-US', {
	maximumFractionDigits: 0,
});
const DECIMAL_FORMATTER = new Intl.NumberFormat('en-US', {
	maximumFractionDigits: maxDecimalLength,
});

// get all the clickable buttons
const calculatorButtons = document.querySelectorAll('[data-key]');

const numberButtons = document.querySelectorAll('[data-number]');
const numberButtonsArray = Array.from(numberButtons, (key) => key.value).sort();

const operationButtons = document.querySelectorAll('[data-operation]');
const operationButtonsArray = Array.from(
	operationButtons,
	(key) => key.value
).sort();

const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

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

	routeInput(key) {
		if (numberButtonsArray.includes(key)) {
			this.appendNumber(key);
			this.updateDisplay();
		}
		if (operationButtonsArray.includes(key)) {
			if (key === '/') {
				key = '÷';
			}
			if (key === '*') {
				key = '×';
			}
			this.chooseOperation(key);
			this.updateDisplay();
		}
		if (key === '=') {
			this.operate();
			this.updateDisplay();
		}
		if (key === 'Backspace') {
			this.backSpace();
			this.updateDisplay();
		}
		if (key === 'Delete') {
			this.clear();
			this.updateDisplay();
		}
	}

	appendNumber(number) {
		if (number === '.' && this.currentOperand.includes('.')) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	chooseOperation(operation) {
		if (this.currentOperand === '') return;
		if (this.previousOperand !== '') {
			this.operate();
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	operate() {
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
		//* if user attempts to divide by 0, then...
		if (calculation == Infinity) {
			window.alert(
				"\n⛔️  You can't divide by zero.\n\n⚠️  Input new number(s) or Clear All.\n"
			);
			return (this.currentOperand = '');
		}
		this.currentOperand = DECIMAL_FORMATTER.format(calculation);
		this.operation = undefined;
		this.previousOperand = '';
	}

	getDisplayNumber(number) {
		const stringNumber = number?.toString() || '';
		if (stringNumber === '') return stringNumber;

		const [integerDigits, decimalDigits] = stringNumber.split('.');
		let integerDisplay;
		if (isNaN(integerDigits)) {
			integerDisplay = integerDigits;
		} else {
			integerDisplay = INTEGER_FORMATTER.format(integerDigits);
		}

		if (decimalDigits == null) {
			return integerDisplay;
		}
		return `${integerDisplay}.${decimalDigits}`;
	}

	updateDisplay() {
		this.currentOperandText.textContent = this.getDisplayNumber(
			this.currentOperand
		);
		if (this.operation == null) {
			return (this.previousOperandText.textContent = '');
		}
		this.previousOperandText.textContent = `${this.previousOperand}${this.operation}`;
	}
}

const calculator = new Calculator(previousOperandText, currentOperandText);

function keyPress(e) {
	let keyValue = e.key;
	//*** Some keys mapped with alternates ****/
	//*** ('Enter' alternate to '=' ) *********/
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
	const mappedButton = document.querySelector(`[data-key='${keyValue}']`);
	if (!mappedButton) return;
	mappedButton.classList.add('active');
	mappedButton.addEventListener('transitionend', () => {
		mappedButton.classList.remove('active');
	});
	calculator.routeInput(keyValue);
}

calculatorButtons.forEach((key) =>
	key.addEventListener('pointerdown', () => {
		calculator.routeInput(key.value);
	})
);

document.addEventListener('keydown', keyPress);

//************************************************************/
//************** Begin code for data-theme swap **************/
//************************************************************/
const toggleColorMode = function swapColorMode(e) {
	//* Switch to Light Mode
	if (e.currentTarget.classList.contains('light--hidden')) {
		// transition is called to make swap more elegant
		transition();
		// Sets a custom HTML tag data attribute
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
const toggleColorButtons = document.querySelectorAll('.data-theme__btn');

// Set up event listeners for each
toggleColorButtons.forEach((btn) => {
	btn.addEventListener('click', toggleColorMode);
});

function transition() {
	document.documentElement.classList.add('transition');
	document.addEventListener('transitionend', () => {
		document.documentElement.classList.remove('transition');
	});
}

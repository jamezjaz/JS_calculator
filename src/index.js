/* eslint-disable no-restricted-globals, class-methods-use-this, no-else-return, no-unused-vars */

import {
  numberButtons, operationButtons, equalsButton, deleteButton,
  allClearButton, previousOperandTextElement, currentOperandTextElement,
} from './selectors';
import footerCon from './footer';

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    // this.readyToReset = false;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.currentOperand !== '' && this.previousOperand !== '') this.compute();
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;

      case '-':
        computation = prev - current;
        break;

      case '*':
        computation = prev * current;
        break;

      case '÷':
        computation = prev / current;
        break;

      default:
        return;
    }
    this.readyToReset = true;
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  // updateDisplay() {
  //   this.currentOperandTextElement.innerText = this.currentOperand;
  //   if (this.operation != null) {
  //       this.previousOperandTextElement.innerText =
  //       `${this.previousOperand} ${this.operation}`
  //   } else {
  //       this.previousOperandTextElement.innerText = "";
  //   }
  // }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const intergerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(intergerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = intergerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}

const calculator = new Calculator(previousOperandTextElement,
  currentOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

const equalsBtn = (() => {
  equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
  });
})();

const allClearBtn = (() => {
  allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
  });
})();

const deleteBtn = (() => {
  deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
  });
})();
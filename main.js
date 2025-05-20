//Fixt to keep a running equation in the small screen

class Calculator {
  constructor(previousOpperandTextElement, currentOperandTextElement) {
    this.previousOpperandTextElement = previousOpperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.allClear();
    this.memory = 0;
  }
  allClear() {
    this.currentOperand = '0';
    this.previousOperand = '0';
    this.operator = undefined;
    this.updateDisplay();
  }

  clear() {
    this.currentOperand = '0';
    this.updateDisplay();
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (this.currentOperand === '0') {
      this.currentOperand = number;
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    this.updateDisplay();
  }

  chooseOperation(operator) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operator = operator;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '0';
    this.updateDisplay();
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operator) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '×':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operator = undefined;
    this.previousOperand = '';
    this.updateDisplay();
  }

  updateMemoryAdd() {
    this.memory += parseFloat(this.currentOperand) || 0;
  }

  updateMemorySubstract() {
    this.memory - +parseFloat(this.currentOperand) || 0;
  }

  recallMemory() {
    this.currentOperand = this.memory.toString();
    this.updateDisplay();
  }

  clearMemory() {
    this.memory = 0;
  }

  changeSign() {
    this.currentOperand = (parseFloat(this.currentOperand) * -1).toString();
    this.updateDisplay();
  }

  calculateSquareRoot() {
    this.currentOperand = Math.sqrt(parseFloat(this.currentOperand) || 0);
    this.updateDisplay();
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    if (this.operator != null) {
      this.previousOpperandTextElement.innerText = `${this.previousOperand} ${this.operator}`;
    } else {
      this.previousOpperandTextElement.innerText = '';
    }
  }
}

class Keys {
  constructor() {}
  pressBtn = (keyElement) => {
    keyElement.style.boxShadow = 'none';
    setTimeout(function () {
      keyElement.style.boxShadow = '2px 2px 5px gray';
    }, 150);
  };
}

const smallScreen = document.getElementById('sm-screen');
const largeScreen = document.getElementById('lg-screen');

const calculator = new Calculator(smallScreen, largeScreen);
const calculatorKeys = new Keys();

const btnContainer = document.getElementById('btn-container');
const numberButtons = btnContainer.querySelectorAll('.num:not(.decimal)');
const operatorButtons = btnContainer.querySelectorAll('.operator');
const memoryButtons = btnContainer.querySelectorAll('.mem-key');
const memoryAddButton = btnContainer.querySelector('#add-memory');
const memorySubtractButton = btnContainer.querySelector('#sub-memory');
const memoryRecallButton = btnContainer.querySelector('#mem-recall');
const equalsButton = btnContainer.querySelector('#equals');
const allClearButton = btnContainer.querySelector('#all-clear');
const clearButton = btnContainer.querySelector('#clear');
const changeSignButton = btnContainer.querySelector('#pos-neg');
const decimalButton = btnContainer.querySelector('#decimal');
const sqrtButton = btnContainer.querySelector('#square-root');

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculatorKeys.pressBtn(button);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculatorKeys.pressBtn(button);
  });
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculatorKeys.pressBtn(equalsButton);
});

clearButton.addEventListener('click', () => {
  calculator.clear();
  calculatorKeys.pressBtn(clearButton);
});

allClearButton.addEventListener('click', () => {
  calculator.allClear();
  calculatorKeys.pressBtn(allClearButton);
});

memoryAddButton.addEventListener('click', () => {
  calculator.updateMemoryAdd();
  calculatorKeys.pressBtn(memoryAddButton);
});

memorySubtractButton.addEventListener('click', () => {
  calculator.updateMemorySubstract();
  calculatorKeys.pressBtn(memorySubtractButton);
});

memoryRecallButton.addEventListener('click', () => {
  calculator.recallMemory();
  calculatorKeys.pressBtn(memoryRecallButton);
});

changeSignButton.addEventListener('click', () => {
  calculator.changeSign();
  calculatorKeys.pressBtn(changeSignButton);
});

sqrtButton.addEventListener('click', () => {
  calculator.calculateSquareRoot();
  calculatorKeys.pressBtn(sqrtButton);
});

decimalButton.addEventListener('click', () => {
  calculator.appendNumber(decimalButton.innerText);
  calculatorKeys.pressBtn(decimalButton);
});

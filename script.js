class Calculator {
    constructor(previousTextElement, currentTextElement) {
        this.previousTextElement = previousTextElement;
        this.currentTextElement = currentTextElement;
        this.clear();
    }
    clear() {
        this.currentOperant = "";
        this.previousOperant = "";
        this.operation = undefined;
    }
    delete() {
        this.currentOperant = this.currentOperant.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number === "." && this.currentOperant.includes('.')) {
            return;
        }
        this.currentOperant = this.currentOperant.toString() + number.toString();
    }
    chooseOperation(operation) {
        if (this.currentOperant == "") {
            return;
        }
        if (this.previousOperant !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperant = this.currentOperant;
        this.currentOperant = "";
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperant);
        const current = parseFloat(this.currentOperant);
        if (isNaN(prev) || isNaN(current)) {
            return;
        }
        switch (this.operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "÷":
                computation = prev / current;
                break;
            case "x":
                computation = prev * current;
                break;
            default:
                return;
        }
        this.currentOperant = computation;
        this.operation = undefined;
        this.previousOperant = "";
    }
    delimiter(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentTextElement.innerText = this.delimiter(this.currentOperant);
        if (this.operation != null) {
            this.previousTextElement.innerText = `${this.delimiter(this.previousOperant)} ${this.operation}`;
        } else {
            this.previousTextElement.innerText = "";
        }
    }

}
const numberButtonElements = document.querySelectorAll('[data-number]');
const operatorButtonElement = document.querySelectorAll('[data-operation]');
const allCleraButtonElement = document.querySelector('[data-all-clear]');
const deleteButtonElement = document.querySelector("[data-delete]");
const equalsButtonElement = document.querySelector("[data-equals]");
const previousTextElement = document.getElementById('previous');
const currentTextElement = document.getElementById("current");
const calculator = new Calculator(previousTextElement, currentTextElement)
numberButtonElements.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();

    })
})
operatorButtonElement.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();

    })
})

equalsButtonElement.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
})
allCleraButtonElement.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
})
deleteButtonElement.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
})

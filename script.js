class Calculator {
    constructor(previousElement, currentElement) {
        this.currentElement = currentElement;
        this.previousElement = previousElement;
        this.clear()
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.currentOperand != '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '%':
                computation = (prev % current) / 100
                break
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break;
            default:
                return
        }
        this.currentOperand = computation.toString();
        this.operation = undefined
        this.previousOperand = ''
    }

    updateDisplay() {
        this.currentElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousElement.innerText = `${this.previousOperand} ${this.operation}`
        }
        else {
            this.previousElement.innerText = this.previousOperand
        }
    }

}

const numberButtons = document.querySelectorAll('#data-number');
const operationButtons = document.querySelectorAll('#data-operation');
const percentButton = document.querySelector('[data-percent]');
const equalsButton = document.querySelector('#data-equals')
const deleteButton = document.querySelector('#data-delete')
const allClearButton = document.querySelector('#data-all-clear')
const previousElement = document.querySelector('#previous-operand')
const currentElement = document.querySelector('#current-operand')

const calculator = new Calculator(previousElement, currentElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerHTML)
        calculator.updateDisplay()
    })
})

let deleteTimer;

deleteButton.addEventListener('touchstart', () => {
    deleteTimer = setTimeout(() => {
        calculator.clear()
        calculator.updateDisplay()
    }, 1000)
})

deleteButton.addEventListener('touchend', () => {
    clearTimeout(deleteTimer)
})

deleteButton.addEventListener('touchcancle', () => {
    clearTimeout(deleteTimer)
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})
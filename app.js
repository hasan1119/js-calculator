// Elements selection
const previousOperandElement = document.querySelector(".previous_operant");
const currentOperandElement = document.querySelector(".current_operant");
const ACButton = document.getElementById("all-clear");
const deleteButton = document.getElementById("delete");
const equalsBtn = document.getElementById("equals");
const operationButtons = document.querySelectorAll(".operator");
const numberButtons = document.querySelectorAll(".number");

// global variables
let currentOperand = "";
let previousOperand = "";
let operation = "";

// Appending Number to current operant
function appendNumber(number) {
  if (number == "." && currentOperand.includes(".")) return;
  currentOperand += number;
}

// format number
function formatNumber(number) {
  const floatNum = parseFloat(number);
  if (isNaN(floatNum)) return "";
  return floatNum.toLocaleString();
}

// update display
function updateDisplay() {
  currentOperandElement.innerText = formatNumber(currentOperand);
  previousOperandElement.innerText = `${formatNumber(
    previousOperand
  )} ${operation}`;
}

// add event to all number buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.innerText);
    updateDisplay();
  });
});

// compute
function compute() {
  const prev = Number(previousOperand);
  const current = Number(currentOperand);
  switch (operation) {
    case "÷":
      currentOperand = prev / current;
      break;
    case "*":
      currentOperand = prev * current;
      break;
    case "+":
      currentOperand = prev + current;
      break;
    case "-":
      currentOperand = prev - current;
      break;
    case "%":
      currentOperand = prev % current;
      break;
    default:
      return;
  }
}

// chose Operation
function choseOperation(operator) {
  if (!currentOperand) {
    if (operation) {
      operation = operator;
    }

    return;
  }
  compute();
  operation = operator;
  previousOperand = currentOperand;
  currentOperand = "";
}

// add event to all operator buttons
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    choseOperation(button.innerText);
    updateDisplay();
  });
});

// equal
equalsBtn.addEventListener("click", function (e) {
  compute();
  operation = "";
  previousOperand = "";
  updateDisplay();
});

// clear
function clear() {
  currentOperand = "";
  previousOperand = "";
  operation = "";
}

// add event to clear button
ACButton.addEventListener("click", function () {
  clear();
  updateDisplay();
});

// delete input
function deleteInput() {
  currentOperand = String(currentOperand).slice(0, -1);
}

// add event to delete button
deleteButton.addEventListener("click", function (e) {
  deleteInput();
  updateDisplay();
});

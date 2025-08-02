const previousOperandElement = document.querySelector(".previous-operand");
const currentOperandElement = document.querySelector(".current-operand");

let operaton = undefined;
let previousValue = "";
let currentValue = "0";
let resetScreen = false;

const updateDisplay = () => {
  previousOperandElement.innerText = previousValue;
  currentOperandElement.innerText = currentValue;
};

const clearAll = () => {
  currentValue = "0";
  previousValue = "";
  operaton = undefined;
  resetScreen = false;
  updateDisplay();
};

const deleteLastChar = () => {
  currentValue.length === 1
    ? (currentValue = "0")
    : (currentValue = currentValue.slice(0, -1));
  updateDisplay();
};

const appendNumber = (num) => {
  if (currentValue === "0" || resetScreen) {
    currentValue = "";
    resetScreen = false;
  }

  if (num === "." && currentValue.includes(".")) return;
  currentValue += num;
  updateDisplay();
};

const appendOperator = (op) => {
  if (currentValue === "0" && op !== "%") return;
  if (op === "%") {
    currentValue = (parseFloat(currentValue) / 100).toString();
    updateDisplay();
    return;
  }
  if (previousValue !== "") calculate();

  operaton = op;
  previousValue = `${currentValue} ${operaton}`;
  currentValue = "0";
  updateDisplay();
};

const calculate = () => {
  let result = 0;
  const previous = parseFloat(previousValue);
  const current = parseFloat(currentValue);

  if (isNaN(previous) || isNaN(current)) return;

  switch (operaton) {
    case "+":
      result = previous + current;
      break;
    case "-":
      result = previous - current;
      break;
    case "*":
      result = previous * current;
      break;
    case "/":
      result = previous / current;
      break;
    default:
      return;
  }
  currentValue = result.toString();
  operaton = undefined;
  previousValue = "";
  resetScreen = true;
  updateDisplay();
};

document.addEventListener("keydown", function (e) {
  if (e.key >= "0" && e.key <= "9") appendNumber(e.key);
  else if (e.key === ".") appendNumber(e.key);
  else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    appendOperator(e.key);
  else if (e.key === "%") appendOperator("%");
  else if (e.key === "Enter" || e.key === "=") calculate();
  else if (e.key === "Backspace") deleteLastChar();
  else if (e.key === "Escape") clearAll();
});

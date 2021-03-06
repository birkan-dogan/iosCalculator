// taking sections to show values
const prevDisp = document.getElementById("top");
const currDisp = document.getElementById("show");

// for holding value
let currOperand = ""; // this will hold the top section
let previousOperand = ""; // this will hold the show section
let operation = ""; // to hold operate

let equalOrPercentPressed = false;
// for capturing method, the main container of buttons is taking
const btnContainer = document.getElementById("crunch");

btnContainer.addEventListener("click", (e) => {
  //   console.log(e.target);
  if (e.target.classList.contains("number")) {
    // console.log(e.target.textContent);
    appendNumber(e.target.textContent);
    updateDisplay();
  }
  if (e.target.classList.contains("operation")) {
    chooseOperator(e.target.textContent);
    updateDisplay();
  }
  if (e.target.classList.contains("equal")) {
    calculate();
    updateDisplay();
    equalOrPercentPressed = true;
  }
  if (e.target.classList.contains("delete")) {
    previousOperand = "";
    currOperand = "";
    operation = "";
    updateDisplay();
  }
  if (e.target.classList.contains("plusMinus")) {
    if (!currOperand) return;
    currOperand *= -1;
    updateDisplay();
  }
  if (e.target.classList.contains("percent")) {
    if (!currOperand) return;
    currOperand /= 100;
    updateDisplay();
    equalOrPercentPressed = true;
  }
});

const appendNumber = (num) => {
  if (num === "0" && currOperand === "0") return; // to avoid serial zeros when currOperand = 0
  if (currOperand === "0" && num !== ".") {
    // if first number 0 and second number will be not "." , first 0 will be deleted
    currOperand = num;
    return; // this lines to avoid these situation 025 or 0356
  }
  if (num === "." && currOperand.includes(".")) return; // to avoid serial decimals like `...`

  if (currOperand.length > 9) return; // to avoid overflow from div

  if (equalOrPercentPressed) {
    // after clicking enter or percent operator, coming number will be concatenate and this situation is not correct
    currOperand = num;
    equalOrPercentPressed = false; // flag method
    return;
  }

  currOperand += num;
};

const updateDisplay = () => {
  if (currOperand.toString.length > 10) {
    currOperand = Number(currOperand).toExponential(5);
  }
  currDisp.textContent = currOperand;
  prevDisp.textContent = `${previousOperand} ${operation}`;
};

const chooseOperator = (op) => {
  console.log(op);
  if (previousOperand) {
    calculate();
  }
  // if only have one number, don't run calculate()

  // variable swaping
  operation = op;
  previousOperand = currOperand;
  currOperand = "";
};

const calculate = () => {
  let calculation = 0;
  const prev = Number(previousOperand);
  const current = Number(currOperand);

  switch (operation) {
    case "+":
      calculation = prev + current;
      break;
    case "-":
      calculation = prev - current;
      break;
    case "*":
      calculation = prev * current;
      break;
    case "/":
      calculation = prev / current;
      break;
    default:
      return; // it should be out of the function when operation is not matching.
  }
  //   console.log(calculation);
  currOperand = calculation;
  previousOperand = "";
  operation = "";
};

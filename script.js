let firstNumber = '';
let secondNumber = '';
let operator = '';
let resultJustDisplayed = false;

function validateNumber(input_number) {
    return Number(input_number);
}

function add(number1, number2){
    number1 = validateNumber(number1);
    number2 = validateNumber(number2);
    let result = number1 + number2 ; 
    return result ;
}


function subtract(number1, number2){
    number1 = validateNumber(number1);
    number2 =  validateNumber(number2);
    let result = number1 - number2 ; 
    return result ;
}

function multiply(number1, number2){
    number1 = validateNumber(number1);
    number2 = validateNumber(number2);
    let result = number1 * number2 ; 
    return result ;
}

function divide(number1, number2){
    number1 = validateNumber(number1);
    number2 = validateNumber(number2);
    if (number2 === 0) {
        return "Can't divide by 0!";
    }
return number1 / number2;}

function operate(number1, operator, number2) {
  let result;

  if (operator === "+") {
    result = add(number1, number2);
  } else if (operator === "-") {
    result = subtract(number1, number2);
  } else if (operator === "*") {
    result = multiply(number1, number2);
  } else if (operator === "/") {
    result = divide(number1, number2);
  }

  return typeof result === "number"
    ? Math.round(result * 1000) / 1000
    : result;
}

const buttonsContainer = document.getElementById("buttons");
const buttonLabels = [
  "AC", "Del", "=", "/",
  "7", "8", "9", "*",
  "4", "5", "6", "-",   
  "1", "2", "3", "+",
  "0", ".", "", ""
];


buttonLabels.forEach(label => {
  if (label === "") {
    const spacer = document.createElement("div");
    spacer.classList.add("spacer");
    buttonsContainer.appendChild(spacer);
  } else {
    const button = document.createElement("button");
    button.textContent = label;

    if (!isNaN(label)) {
      button.classList.add("digit");
    } else if (label === "AC" || label === "Del") {
      button.classList.add("utility");
    } else if (label === "=") {
      button.classList.add("equals");
    } else {
      button.classList.add("operator");
    }

    buttonsContainer.appendChild(button);
  }
});



const display = document.getElementById("display");

document.querySelectorAll("#buttons button").forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (!isNaN(value) || value === ".") {
        if (resultJustDisplayed) {
            firstNumber = value;
             secondNumber = "";
             operator = "";
             resultJustDisplayed = false;
             display.textContent = firstNumber;
        } 
        else if (operator === "") {
             firstNumber += value;
             display.textContent = firstNumber;
        }
 else {
  secondNumber += value;
  display.textContent = firstNumber + " " + operator + " " + secondNumber;
}
    } 
    else if (["+", "-", "*", "/"].includes(value)) {
        if (operator !== "" && secondNumber === "") {
            return;
  }
  
  if (firstNumber !== "") {
    operator = value;
    display.textContent = firstNumber + " " + operator;
  }
}   

   else if (value === "=") {
  if (firstNumber !== "" && secondNumber !== "" && operator !== "") {
    const result = operate(firstNumber, operator, secondNumber);
    display.textContent = result;

    if (typeof result === "number") {
      firstNumber = result.toString();
    } else {
      firstNumber = "";
    }

    secondNumber = "";
    operator = "";
    resultJustDisplayed = true;
  }
}
    else if (value === "AC") {
      firstNumber = "";
      secondNumber = "";
      operator = "";
      display.textContent = "";
    } 
    else if (value === "Del") {
      if (operator === "") {
        firstNumber = firstNumber.slice(0, -1);
        display.textContent = firstNumber;
      } else {
        secondNumber = secondNumber.slice(0, -1);
        display.textContent = secondNumber;
      }
    }
  });
});
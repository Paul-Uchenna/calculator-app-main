const displayCalc = document.querySelector(".display");
const resetBtn = document.querySelector(".reset-btn");
const equalsBtn = document.querySelector(".equals-btn");
const keypadValue = document.querySelectorAll(".keypadValue");
const deleteBtn = document.querySelector(".delete-btn");

function evaluateExpression(expression) {
  try {
    expression = expression.replace(/x/g, "*");
    const operators = [];
    const values = [];
    let number = "";

    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];

      if (!isNaN(char) || char === ".") {
        number += char;
      } else {
        if (number) {
          values.push(parseFloat(number));
          number = "";
        }

        while (
          operators.length &&
          precedence(operators[operators.length - 1]) >= precedence(char)
        ) {
          const operator = operators.pop();
          const b = values.pop();
          const a = values.pop();
          values.push(applyOperator(a, b, operator));
        }
        operators.push(char);
      }
    }

    if (number) values.push(parseFloat(number));

    while (operators.length) {
      const operator = operators.pop();
      const b = values.pop();
      const a = values.pop();
      values.push(applyOperator(a, b, operator));
    }

    return values[0];
  } catch {
    return "Erreur";
  }
}

// Fonction pour gérer la priorité des opérateurs
function precedence(operator) {
  if (operator === "+" || operator === "-") return 1;
  if (operator === "*" || operator === "/") return 2;
  return 0;
}

function applyOperator(a, b, operator) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b !== 0 ? a / b : "Erreur";
    default:
      return 0;
  }
}

deleteBtn.addEventListener("click", () => {
  displayCalc.value = displayCalc.value.slice(0, -1);
});

resetBtn.addEventListener("click", () => {
  displayCalc.value = "";
});

keypadValue.forEach((btn) => {
  btn.addEventListener("click", () => {
    let value = btn.textContent;
    displayCalc.value += value;
  });
});

equalsBtn.addEventListener("click", () => {
  const result = evaluateExpression(displayCalc.value);
  displayCalc.value = result !== undefined ? result : "Erreur";
});

const radioButtons = document.querySelectorAll(".input-theme");

radioButtons.forEach((radio) => {
  radio.addEventListener("change", (event) => {
    document.body.classList.remove("theme1", "theme2", "theme3");
    document.body.classList.add(event.target.id);
  });
});

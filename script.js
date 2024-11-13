const displayCalc = document.querySelector(".display");
const resetBtn = document.querySelector(".reset-btn");
const equalsBtn = document.querySelector(".equals-btn");
const keypadValue = document.querySelectorAll(".keypadValue");
const deleteBtn = document.querySelector(".delete-btn");

// * Calculator logic
deleteBtn.addEventListener("click", () => {
  displayCalc.value = displayCalc.value.slice(0, -1);
});

resetBtn.addEventListener("click", () => {
  displayCalc.value = "";
});

equalsBtn.addEventListener("click", () => {
  try {
    const result = eval(displayCalc.value);
    displayCalc.value = result;
  } catch (error) {
    displayCalc.value = "Error";
  }
});

keypadValue.forEach((btn) => {
  btn.addEventListener("click", () => {
    let value = btn.textContent;
    if (value === "x") value = "*";
    else if (value === ".") value = ",";

    displayCalc.value += value;
  });
});

// keypadValue.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     displayCalc.value += btn.textContent;
//   });
// });

// * Theme Switcher
const radioButtons = document.querySelectorAll(".input-theme");

radioButtons.forEach((radio) => {
  radio.addEventListener("change", (event) => {
    document.body.classList.remove("theme1", "theme2", "theme3");

    document.body.classList.add(event.target.id);
  });
});

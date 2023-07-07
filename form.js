const cardName = document.getElementById("card-name");
const cardNumber = document.getElementById("card-number");
const cardCvc = document.getElementById("card-cvc");

const inputName = document.getElementById("input-name");
const inputNumber = document.getElementById("input-number");
const inputMonth = document.getElementById("input-exp-month");
const inputYear = document.getElementById("input-exp-year");
const inputCvc = document.getElementById("input-cvc");
const form = document.getElementById("form");

const nameError = document.getElementById("name-error");
const numberError = document.getElementById("number-error");
const dateError = document.getElementById("date-error");
const cvcError = document.getElementById("cvc-error");

function notNumber(e) {
  let key = +e.key;
  if (!isNaN(key) && e.key != " ") {
    e.preventDefault();
  }
}
function numberOnly(e) {
  let key = +e.key;
  if (e.key === " " || (isNaN(key) && e.key != "Backspace")) {
    e.preventDefault();
  }
}

inputName.addEventListener("keydown", notNumber);
inputName.addEventListener("input", (evt) => {
  inputName.value = inputName.value.toUpperCase();
  nameError.style.color = "";
  inputName.style.borderColor = "";
  cardName.innerText = inputName.value;
});

inputNumber.addEventListener("keydown", numberOnly);
inputNumber.addEventListener("input", (evt) => {
  numberError.style.color = "";
  inputNumber.style.borderColor = "";
  if (inputNumber.value.length > 16) {
    inputNumber.value = inputNumber.value.slice(0, 16);
  }
  cardNumber.innerText = inputNumber.value
    .replace(/\s/g, "")
    .replace(/([0-9]{4})/g, "$1 ")
    .trim();
});

inputMonth.addEventListener("keydown", numberOnly);
inputMonth.addEventListener("input", (evt) => {
  inputMonth.style.borderColor = "";
  inputYear.style.borderColor = "";
  dateError.style.color = "";
  let monthValue = +inputMonth.value;
  inputMonth.value = Math.max(1, Math.min(monthValue, 12));
});

inputYear.addEventListener("keydown", numberOnly);
inputYear.addEventListener("input", (evt) => {
  inputMonth.style.borderColor = "";
  inputYear.style.borderColor = "";
  dateError.style.color = "";
  let yearValue = +inputYear.value;
  inputYear.value = (yearValue + 100) % 100;
  if (inputYear.value.length < 2) {
    inputYear.value = "0" + inputYear.value;
  }
});

inputCvc.addEventListener("keydown", numberOnly);
inputCvc.addEventListener("input", (evt) => {
  cvcError.style.color = "";
  inputCvc.style.borderColor = "";
  let cvcValue = +inputCvc.value;
  inputCvc.value = (cvcValue + 1000) % 1000;
  while (inputCvc.value.length < 3) {
    inputCvc.value = "0" + inputCvc.value;
  }
  cardCvc.innerText = inputCvc.value;
});

form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let validation = true;
  const validateName = inputName.value.trim().indexOf(" ") > 0;
  if (!validateName) {
    nameError.style.color = "red";
    inputName.style.borderColor = "red";
    validation = false;
  }
  const validateNumber = inputNumber.value.length === 16;
  if (!validateNumber) {
    numberError.style.color = "red";
    inputNumber.style.borderColor = "red";
    validation = false;
  }
  const validateDate =
    new Date(`${inputMonth.value}/01/20${inputYear.value}`) > new Date();
  if (!validateDate) {
    dateError.style.color = "red";
    inputMonth.style.borderColor = "red";
    inputYear.style.borderColor = "red";
    validation = false;
  }
  const validateCvc = inputCvc.value.length === 3;
  if (!validateCvc) {
    cvcError.style.color = "red";
    inputCvc.style.borderColor = "red";
    validation = false;
  }
  if (validation) {
    alert("Validation OK");
  } else {
    alert("Validation Failed");
  }
});

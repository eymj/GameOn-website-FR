function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const submitBtn = document.querySelector(".modal-body .btn-submit");
const close = document.querySelectorAll(".close");
const formData = document.querySelectorAll(".formData");
const firstInput = document.getElementById('first');
const lastInput = document.getElementById('last');
const emailInput = document.getElementById('email');
const birthdateInput = document.getElementById('birthdate');
const quantityInput = document.getElementById('quantity');
const radioInputs = document.querySelectorAll(`.modal-body input[type="radio"]`);
const checkboxInput = document.getElementById('checkbox1');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
close.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// Validate first and last name
function validateText(field) {
  const value = field.value;
  if (value.length >= 2) {
    return true;
  } else {
    return false;
  }
}

// Validate quantity
function validateNumber(field) {
  const value = field.value.trim();
  if (!isNaN(value)) {
    return true;
  } else {
    return false;
  }
}

// Validate mail
function validateEmail(field) {
  const value = field.value.trim();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (pattern.test(value)) {
    return true;
  } else {
    return false;
  }
}

// Validate location checks
function validateLocations(fields) {
  for (let i = 0; i < fields.length; i++) {
      if (fields[i].checked) {
          return true;
      }
  }
  return false;
}

// Validate mandatory checkbox
function validateCheckbox(field) {
  return field.checked;
}

// Setup validators
const fieldsValidator = [
  () => validateText(firstInput),
  () => validateText(lastInput),
  () => validateEmail(emailInput),
  () => validateNumber(quantityInput),
  () => validateLocations(radioInputs),
  () => validateCheckbox(checkboxInput)
];

// Check if all validators return true
function validateForm(validators) {
  for (let validator of validators) {
      if (!validator()) {
          return false;
      }
  }
  return true;
}

// Handle form validation
function validate(e) {

  const form = e.target;
  e.preventDefault();

  if (validateForm(fieldsValidator)) {
    form.reset();
  }
}
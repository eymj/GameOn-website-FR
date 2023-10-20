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
    displayFormError(field,"Veuillez entrer 2 caractères ou plus.")
    return false;
  }
}

// Validate quantity
function validateNumber(field) {
  const value = field.value.trim();
  const num = value ? Number(value) : null
  if (num != null && !isNaN(num)) {
    return true;
  } else {
    displayFormError(field,"Vous devez saisir un nombre.")
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
    displayFormError(field,"Vous devez saisir une adresse email valide.")
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
  displayFormError(fields[0].parentNode,"Vous devez choisir une option.")
  return false;
}

// Validate mandatory checkbox
function validateCheckbox(field) {
  if (!field.checked){
    displayFormError(field,"Vous devez vérifier que vous acceptez les termes et conditions.")
    return false
  }
  return true;
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

  // Clear messages before checking again
  removeFormErrors();
  removeFormSuccess();

  // Prevent reloading the page
  e.preventDefault();

  // Reset form if all validators pass
  if (validateForm(fieldsValidator)) {
    form.reset();
    displayFormSuccess(form,"Merci ! Votre réservation a été reçue.")
  }
}

// Show errors under relevant element
function displayFormError(element, message) {
  const errorSpan = document.createElement('span');
  errorSpan.className = 'form-error';
  errorSpan.textContent = message;
  errorSpan.style.fontSize = "12px";
  errorSpan.style.color = "red";
  errorSpan.style.display = "block";
  errorSpan.style.marginTop = "2px";
  errorSpan.style.marginBottom = "8px";
  element.closest(".formData").insertAdjacentElement('afterend', errorSpan);
}

// Clear all errors
function removeFormErrors() {
  const formErrors = document.querySelectorAll('.form-error');
  formErrors.forEach((element) => {
    element.remove();
  });
}

// Show confirmation message
function displayFormSuccess(form, message) {
  const successSpan = document.createElement('span');
  successSpan.className = 'form-success';
  successSpan.textContent = message;
  successSpan.style.fontSize = "16px";
  successSpan.style.textAlign = "center"
  successSpan.style.color = "white";
  successSpan.style.backgroundColor = "green";
  successSpan.style.borderRadius = "12px";
  successSpan.style.display = "block";
  successSpan.style.marginTop = "8px";
  successSpan.style.padding = "12px";
  form.appendChild(successSpan);
}

// Clear confirmation message
function removeFormSuccess() {
  const formSuccess = document.querySelectorAll('.form-success');
  formSuccess.forEach((element) => {
    element.remove();
  });
}
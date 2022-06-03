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
const formData = document.querySelectorAll(".formData");
// my elements
const closeModalBtn = document.querySelector(".close");
const closeBtn = document.querySelector('.close-btn');
const radioBtns = document.querySelectorAll("input[type=radio]");
const inputs = document.querySelectorAll("input");
const form = document.querySelector("form")
const errors = document.querySelectorAll(".error");
const cgu = document.getElementById("checkbox1")
const modalBody = document.querySelector(".modal-body");
const confirmation = document.querySelector(".confirmation");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
closeModalBtn.addEventListener("click", closeModal);
closeBtn.addEventListener('click', closeModal)


// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// FORM VALIDATION

function validate() {
  let valid = true;
  // check if inputs are filled and valid
  inputs.forEach((input) => {
    if (input.value === "" || input.checkValidity() === false) {
      input.parentNode.querySelector('.error').classList.add('show')
      input.classList.add('invalid');
      valid = false;
    } else {
      input.parentNode.querySelector('.error').classList.remove('show')
      input.classList.add('valid');
    }
  })
  // check if one radio button is checked
  let checked = 0;
  radioBtns.forEach((btn) => {
    if (btn.checked) {
      checked = 1;
    }
  })
  if (checked === 0) {
    radioBtns[0].parentNode.querySelector('.error').classList.add('show')
  }

  // check if cgu is checked
  if (cgu.checked === false) {
    cgu.parentNode.querySelector('.error').classList.add('show')
  }

  if (checked === 0 || !cgu.checked) {
    valid = false;
  }
  return valid;
}

// validity check on keyup
inputs.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    if (!e.target.checkValidity()) {
      // console.log(e.target.parentNode.querySelector('.error'))
      e.target.parentNode.querySelector('.error').classList.add('show')
      // e.target.nextElementSibling.innerHTML = e.target.validationMessage;
    } else {
      e.target.parentNode.querySelector('.error').classList.remove('show')
    }
  })
})

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validate()) {
    form.style.display = "none";
    confirmation.classList.add('show');
  }
})
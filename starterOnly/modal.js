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
    if (input.value === "" || input.checkValidity() === false || input.value === null) {
      input.parentNode.querySelector('.error').classList.add('show')
      input.classList.add('invalid');
      valid = false;
    } else {
      // input.parentNode.querySelector('.error').classList.remove('show')
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

// validity check before sending form
inputs.forEach((input) => {
  // change (specific for date and radio buttons)
  input.addEventListener("change", (e) => {
    if (!e.target.checkValidity() || e.target.value === "") {
      e.target.parentNode.querySelector('.error').classList.add('show')
      input.classList.remove('valid');
      input.classList.add('invalid');
    } else {
      e.target.parentNode.querySelector('.error').classList.remove('show')
      input.classList.add('valid');
      input.classList.remove('invalid');
    }
  })
  // keyup event (for inputs)
  input.addEventListener("keyup", (e) => {
    if (!e.target.checkValidity() || e.target.value === "") {
      e.target.parentNode.querySelector('.error').classList.add('show')
      input.classList.add('invalid');
      input.classList.remove('valid');
    } else {
      e.target.parentNode.querySelector('.error').classList.remove('show')
      input.classList.add('valid');
      input.classList.remove('invalid');
    }
  })
  
})

// confirmation screen 
form.addEventListener("submit", (e) => {
  inputs.forEach(input => {
    console.log(input.value)
  })
  e.preventDefault();
  if (validate()) {
    // show confirmation screen
    form.style.display = "none";
    confirmation.classList.add('show');
  }
})
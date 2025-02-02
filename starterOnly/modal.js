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
const confirmation = document.querySelector(".confirmation");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  inputs[0].focus();
}

// close modal event
closeModalBtn.addEventListener("click", closeModal);
closeBtn.addEventListener('click', closeModal)

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

let  mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// \w+ means one or more (+) alphanumeric characters and underscore (w)
// [\.-]? means zero or one occurrence of the character (\ = escape, . = . (regular dot), - = - (regular -), ? = {0,1})
//  * means zero or more occurrences of the character {0,}
// $ means end of string


// FORM VALIDATION
const isValid = (input, event) => {
  input.addEventListener(`${event}`, (e) => {
    if (!e.target.checkValidity()) {
      e.target.parentNode.querySelector('.error').classList.add('show')
      input.classList.remove('valid');
      input.classList.add('invalid');
    } else {
      e.target.parentNode.querySelector('.error').classList.remove('show')
      input.classList.add('valid');
      input.classList.remove('invalid');
      if (e.target.value === "") {
        input.classList.remove('valid');
      }
    }
    // email validation
    if (e.target.type === 'email') {
      if (e.target.value.match(mailformat)) {
        e.target.parentNode.querySelector('.error').classList.remove('show')
        e.target.classList.remove('invalid');
        e.target.classList.add('valid');
      } else {
        e.target.parentNode.querySelector('.error').classList.add('show')
        e.target.classList.remove('valid');
        e.target.classList.add('invalid');
        if (e.target.value === "") {
          input.classList.remove('invalid');
          e.target.parentNode.querySelector('.error').classList.remove('show')
        }
      }
    }
  })
}

function validate() {
  let valid = true;
  // check if inputs are filled and valid
  inputs.forEach((input) => {
    if (input.value === "" || input.checkValidity() === false || input.value === null) {
      input.parentNode.querySelector('.error').classList.add('show')
      input.classList.add('invalid');
      valid = false;
    } else {
      input.classList.add('valid');
    }
    // email validation
    if (input.type === 'email') {
      if (input.value.match(mailformat)) {
        input.parentNode.querySelector('.error').classList.remove('show')
        // input.classList.remove('invalid');
        input.classList.add('valid');
      } else {
        input.parentNode.querySelector('.error').classList.add('show')
        input.classList.remove('valid');
        input.classList.add('invalid');
        valid = false;
      }
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
  // show confirmation screen
  if (valid) {
      form.style.display = "none";
      confirmation.classList.add('show');
    }
  // return false to prevent default behavior from form
  return false
}

// validity check before sending form
inputs.forEach((input) => {
  // change (specific for date and radio buttons)
  isValid(input, 'change');
  // keyup event (for text inputs)
  isValid(input, 'keyup');
})
// CSValidate
// © Thomas Cullen 2016
// MIT License

function validateFormSubmission(form, e) {
  const inputs = form.querySelectorAll('input[data-validate]');
  for(let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    const valid = validateInput(input);
    if (valid === false) {
      e.preventDefault();
      break;
    };
  }
}

function validateInput(input){
  removeErrorMessages();
  const validations = JSON.parse(input.getAttribute('data-validate'));
  // get the validation names. e.g ['presence', 'length']
  const validationMethods = Object.keys(validations);

  for (let i = 0; i < validationMethods.length; i++) {
    const validationName = validationMethods[i];
    // find the validation function. This expects there to be a validation method
    // corresponding to the validation name. e.g if the validation name is 'presence'
    // it is looking for a validate_presence function
    const validationMethod = window['validate_'+validationName];
    if (typeof validationMethod === 'function') {
      var params = validations[validationName];
      // call the validation function passing the input value and validation params
      // ( the validation params are set in the validations object.
      // e.g { max: 200, min: 5 } for the length validation )
      var validation = validationMethod(input.value, params);
      if (validation !== true) {
        inputIsInvalid(input, validation);
        return false;
        break;
      } else {
        inputIsValid(input);
      }
    }
  }
}

function inputIsInvalid(input, error){
  input.classList.add('input--invalid');
  input.insertAdjacentHTML('afterend', `<div class='input_error_message'>${error}</div>`);
}

function inputIsValid(input) {
  removeErrorMessages()
  input.classList.remove('input--invalid')
}

function removeErrorMessages() {
  const errors = document.querySelectorAll('.input_error_message');
  for(let i = 0; i < errors.length; i++) {
    let error = errors[i];
    error.parentNode.removeChild(error);
  }
}

// validates the presence of a value
function validate_presence(value, params) {
  if (value && value.length > 0) {
    return true;
  }
  return params.message ? params.message : 'Value can\'t be blank';
}

// validates the length of the value
function validate_length(value, params) {
  if (params.max && value.length > params.max) {
    return `Value must be less than ${params.max} characters`;
  }

  if (params.min && value.length < params.min) {
    return `Value must be more than ${params.min} characters`;
  }
  return true;
}

function validate_email(value, params) {
  const email_reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (email_reg.test(value)){ return true; }
  return params.message ? params.message : 'Not a valid email address'
}

function loadListeners() {
  // forms
  const forms = document.querySelectorAll('form');
  for(let i = 0; i < forms.length; i++) {
    let form = forms[i];
    form.addEventListener('submit', function(e){
      validateFormSubmission(form, e)
    })
  }
  // inputs
  const inputs = document.querySelectorAll('input[data-validate]');
  for(let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    input.addEventListener('keyup', function(){ validateInput(input) });
  }
}

if (document.readyState != 'loading'){
  loadListeners();
} else {
  document.addEventListener('DOMContentLoaded', loadListeners);
}

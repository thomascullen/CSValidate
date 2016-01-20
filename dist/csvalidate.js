'use strict';

// CSValidate
// © Thomas Cullen 2016
// MIT License

function validateFormSubmission(form, e) {
  var inputs = form.querySelectorAll('input[data-validate]');
  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    var valid = validateInput(input);
    if (valid === false) {
      e.preventDefault();
      break;
    };
  }
}

function validateInput(input) {
  removeErrorMessages();
  var validations = JSON.parse(input.getAttribute('data-validate'));
  // get the validation names. e.g ['presence', 'length']
  var validationMethods = Object.keys(validations);

  for (var i = 0; i < validationMethods.length; i++) {
    var validationName = validationMethods[i];
    // find the validation function. This expects there to be a validation method
    // corresponding to the validation name. e.g if the validation name is 'presence'
    // it is looking for a validate_presence function
    var validationMethod = window['validate_' + validationName];
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

function inputIsInvalid(input, error) {
  input.classList.add('input--invalid');
  input.insertAdjacentHTML('afterend', '<div class=\'input_error_message\'>' + error + '</div>');
}

function inputIsValid(input) {
  removeErrorMessages();
  input.classList.remove('input--invalid');
}

function removeErrorMessages() {
  var errors = document.querySelectorAll('.input_error_message');
  for (var i = 0; i < errors.length; i++) {
    var error = errors[i];
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
    return 'Value must be less than ' + params.max + ' characters';
  }

  if (params.min && value.length < params.min) {
    return 'Value must be more than ' + params.min + ' characters';
  }
  return true;
}

function validate_email(value, params) {
  var email_reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (email_reg.test(value)) {
    return true;
  }
  return params.message ? params.message : 'Not a valid email address';
}

function loadListeners() {
  // forms
  var forms = document.querySelectorAll('form');

  var _loop = function _loop(i) {
    var form = forms[i];
    form.addEventListener('submit', function (e) {
      validateFormSubmission(form, e);
    });
  };

  for (var i = 0; i < forms.length; i++) {
    _loop(i);
  }
  // inputs
  var inputs = document.querySelectorAll('input[data-validate]');

  var _loop2 = function _loop2(i) {
    var input = inputs[i];
    input.addEventListener('keyup', function () {
      validateInput(input);
    });
  };

  for (var i = 0; i < inputs.length; i++) {
    _loop2(i);
  }
}

if (document.readyState != 'loading') {
  loadListeners();
} else {
  document.addEventListener('DOMContentLoaded', loadListeners);
}

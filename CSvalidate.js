// CSValidate.js
// Thomas Cullen
// MIT

function CSValidate(selector, options){

	CSVRequiredError = typeof options !== 'undefined' ? options.requiredError : "Value is required";
	CSVMinLengthError = typeof options !== 'undefined' ? options.minLengthError : "Value must be longer than {min} characters long";
	CSVMaxLengthError = typeof options !== 'undefined' ? options.maxLengthError : "Value must be less than {max} characters long";
	CSVEmailError = typeof options !== 'undefined' ? options.emailError : "Invalid email address";
	CSVURLError = typeof options !== 'undefined' ? options.URLError : "Invalid URL";
	CSVUsernameError = typeof options !== 'undefined' ? options.usernameError : "Invalid Username";
	CSVHEXError = typeof options !== 'undefined' ? options.HEXError : "Invalid HEX Code";
	CSVIPError = typeof options !== 'undefined' ? options.IPError : "Invalid IP address";
	CSVBetweenError = typeof options !== 'undefined' ? options.betweenError : "Value must be between {min} and {max} characters long";

	var forms = document.querySelectorAll(selector)

	Array.prototype.forEach.call(forms, function(form, i){
		var inputs = form.querySelectorAll('input')
		Array.prototype.forEach.call(inputs, function(el, i){

				// Wrap the inputs
				var wrapper = document.createElement('div');
				var clone = el.cloneNode();
				wrapper.classList.add('cs-validation-field')
				wrapper.appendChild(clone);
				el.parentNode.appendChild(wrapper)
				el.parentNode.removeChild(el)
		
				clone.onkeyup = function(){
					validate(clone)
				}
		
				clone.onsubmit = function(){
					childInputs = el.querySelectorAll('input');
					for ( var i = 0; i < childInputs.length; i++ ){
						if ( validate(childInputs[i]) == false ){
							return false
						}
					}
					return true
				}
		});

	})

}

function validate(input){
	var value = input.value

	// Value Required
	if ( input.getAttribute('validate-required') !== null ){
		if ( value.length == 0){
			return validation(input, false, CSVRequiredError)
		}
	}

	// Min Length
	if ( input.getAttribute('validate-min-length') != null){

		var minLength =	input.getAttribute('validate-min-length');
		var maxLength = input.getAttribute('validate-max-length');

		if ( maxLength ){
			if ( value.length < parseInt(minLength) || value.length > parseInt(maxLength) ){
				return validation(input, false, CSVBetweenError.replaceMultiple({min:minLength, max:maxLength}))
			}
		}else{
			if ( value.length < parseInt(minLength)){
				return validation(input, false, CSVMinLengthError.replace("{min}", minLength))
			}
		}

	}

	// Max Length
	if ( input.getAttribute('validate-max-length') != null ){
		var maxLength = parseInt(input.getAttribute('validate-max-length'));
		if ( value.length > maxLength ){
			return validation(input, false, CSVMaxLengthError.replace("{max}", maxLength))
		}
	}

	// Email
	if ( input.getAttribute('validate-email') !== null ){
		var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		if ( !pattern.test(value) ){
			return validation(input, false, CSVEmailError)
		}
	}

	// URL
	if ( input.getAttribute('validate-url') !== null ){
		var pattern = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		if ( !RegExp(pattern).test(value) ){
			return validation(input, false, CSVURLError)
		}
	}

	// Username
	if ( input.getAttribute('validate-username') !== null ){
		var pattern = "^[a-z0-9_-]{3,16}$"
		if ( !RegExp(pattern).test(value) ){
			return validation(input, false, CSVUsernameError)
		}
	}

	// Hex
	if ( input.getAttribute('validate-hex') !== null ){
		var pattern = "^#?([a-f0-9]{6}|[a-f0-9]{3})$"
		if ( !RegExp(pattern).test(value) ){
			return validation(input, false, CSVHEXError)
		}
	}

	// IP
	if ( input.getAttribute('validate-ip') !== null ){
		var pattern = "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
		if ( !RegExp(pattern).test(value) ){
			return validation(input, false, CSVIPError)
		}
	}

	validation(input, true)

}

function validation(input, valid, message){
	message = message || "";

	Array.prototype.forEach.call(input.parentNode.children, function(el, i){
		if ( el.classList.contains('cs-validation') ){
			el.parentNode.removeChild(el)
		}
	});

	if ( valid == true ){
		input.insertAdjacentHTML('afterend', '<div class="cs-validation cs-valid"><i></i><span>'+message+'</span></div>');
		input.parentNode.classList.add('cs-valid')
		input.parentNode.classList.remove('cs-invalid')
		return true
	}else{
		input.insertAdjacentHTML('afterend', '<div class="cs-validation cs-invalid"><i></i><span>'+message+'</span></div>');
		input.parentNode.classList.add('cs-invalid')
		input.parentNode.classList.remove('cs-valid')
		return false
	}

}

String.prototype.replaceMultiple = function (hash) {
    var string = this, key; for (key in hash) string = string.replace(new RegExp('\\{' + key + '\\}', 'gm'), hash[key]); return string
}
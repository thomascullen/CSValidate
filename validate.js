$(function(){

	$('.validate').wrap('<div class="validation-field"></div>')

	$('.validate').blur(function(){
		validate($(this))
	})

	$('.validate').keyup(function(){
		validate($(this))
	})

	function validate(input){
		var value = input.val();

		// Value Required
		if ( input.data('required') == true ){
			if ( value.length <= 0 ){
				return validation(input, false, "Value is required")
			}
		}

		// Min Length
		if ( input.data('min-length') ){

			var minLength =	input.data('min-length');
			var maxLength = input.data('max-length');

			if ( maxLength ){
				if ( value.length < parseInt(minLength) || value.length > parseInt(maxLength) ){
					return validation(input, false, "Value must be between "+minLength+" and "+maxLength+" characters long")
				}
			}else{
				if ( value.length < parseInt(minLength)){
					return validation(input, false, "Value must be longer than "+minLength+" characters")
				}
			}

		}

		// Max Length
		if ( input.data('max-length') ){
			var maxLength = parseInt(input.data('max-length'));
			if ( value.length > maxLength ){
				return validation(input, false, "Value must be less than "+maxLength+" characters")
			}
		}


		// Email
		if ( input.data('validate-email') == true ){
			var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
			if ( !pattern.test(value) ){
				return validation(input, false, "Invalid email address")
			}
		}


		validation(input, true)

	}

	function validation(input, valid, message){
		message = message || "";
		input.siblings('.validation').remove();
		input.after('<div class="validation"><i></i><span>'+message+'</span></div>')
		if ( valid == true ){
			input.parent().removeClass("not-valid")
			input.siblings('.validation').addClass("valid")
		}else{
			input.siblings('.validation').addClass("not-valid")
			input.parent().addClass("not-valid")
		}
		
	}
})
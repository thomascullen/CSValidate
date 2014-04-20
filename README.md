# CSValidate.js
###Setup
First include CSValidate in your head
```html
<script src="CSValidate.js" type="text/javascript"></script>
```
Validate the form using CSValidate after the page has loaded
```js
<script type="text/javascript">
  	document.addEventListener('DOMContentLoaded', function(){
  		CSValidate('#someform')
  	});
</script>
```
Add the desired validations to your inputs
```html
<input type="text" validate-required>
<input type="text" validate-min-length="4">
<input type="text" validate-min-length="5" validate-max-length="10">
<input type="text" validate-email validate-required>
<input type="text" validate-username>
<input type="text" validate-url>
<input type="text" validate-ip>
<input type="text" validate-hex>
```

###Styling
CSValidate will wrap your input in a `.cs-validation-field` div and append the validation after the input.It will output the following html from one input.
```html
<div class="cs-validation-field cs-invalid">
	<input type="text" validate-required="" placeholder="Required Field" autofocus="">
	<div class="cs-validation cs-invalid">
		<i></i>
		<span>Value is required</span>
	</div>
</div>
```
The `.cs-invalid` classes will toggle to `.cs-valid` when the validation is passed.

###Custom Errors
You can supply custom validation errors by passing them into the CSValidate function. Some validation errors take placeholder variables to output the required data. e.g The min length error takes a {min} variable which will output the amount of required characters.

```js
CSValidate('#someform', {
	requiredError:"required error",
	minLengthError:"min length erro, e.g more than {min}",
	maxLengthError:"max length error, e.g less than {max}",
	emailError:"email error",
	URLError:"URL error",
	usernameError:"username error",
	HEXError:"HEX error",
	IPError:"IP error",
	betweenError:"between {min} and {max}"
})
```
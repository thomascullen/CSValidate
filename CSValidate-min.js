function CSValidate(e,t){CSVRequiredError=typeof t!=="undefined"?t.requiredError:"Value is required";CSVMinLengthError=typeof t!=="undefined"?t.minLengthError:"Value must be longer than {min} characters long";CSVMaxLengthError=typeof t!=="undefined"?t.maxLengthError:"Value must be less than {max} characters long";CSVEmailError=typeof t!=="undefined"?t.emailError:"Invalid email address";CSVURLError=typeof t!=="undefined"?t.URLError:"Invalid URL";CSVUsernameError=typeof t!=="undefined"?t.usernameError:"Invalid Username";CSVHEXError=typeof t!=="undefined"?t.HEXError:"Invalid HEX Code";CSVIPError=typeof t!=="undefined"?t.IPError:"Invalid IP address";CSVBetweenError=typeof t!=="undefined"?t.betweenError:"Value must be between {min} and {max} characters long";var n=document.querySelectorAll(e);Array.prototype.forEach.call(n,function(e,t){var n=e.querySelectorAll("input");Array.prototype.forEach.call(n,function(e,t){var n=document.createElement("div");var r=e.cloneNode();n.classList.add("cs-validation-field");n.appendChild(r);e.parentNode.appendChild(n);e.parentNode.removeChild(e);r.onkeyup=function(){validate(r)};r.onsubmit=function(){childInputs=e.querySelectorAll("input");for(var t=0;t<childInputs.length;t++){if(validate(childInputs[t])==false){return false}}return true}})})}function validate(e){var t=e.value;if(e.getAttribute("validate-required")!==null){if(t.length==0){return validation(e,false,CSVRequiredError)}}if(e.getAttribute("validate-min-length")!=null){var n=e.getAttribute("validate-min-length");var r=e.getAttribute("validate-max-length");if(r){if(t.length<parseInt(n)||t.length>parseInt(r)){return validation(e,false,CSVBetweenError.replaceMultiple({min:n,max:r}))}}else{if(t.length<parseInt(n)){return validation(e,false,CSVMinLengthError.replace("{min}",n))}}}if(e.getAttribute("validate-max-length")!=null){var r=parseInt(e.getAttribute("validate-max-length"));if(t.length>r){return validation(e,false,CSVMaxLengthError.replace("{max}",r))}}if(e.getAttribute("validate-email")!==null){var i=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;if(!i.test(t)){return validation(e,false,CSVEmailError)}}if(e.getAttribute("validate-url")!==null){var i=/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;if(!RegExp(i).test(t)){return validation(e,false,CSVURLError)}}if(e.getAttribute("validate-username")!==null){var i="^[a-z0-9_-]{3,16}$";if(!RegExp(i).test(t)){return validation(e,false,CSVUsernameError)}}if(e.getAttribute("validate-hex")!==null){var i="^#?([a-f0-9]{6}|[a-f0-9]{3})$";if(!RegExp(i).test(t)){return validation(e,false,CSVHEXError)}}if(e.getAttribute("validate-ip")!==null){var i="^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$";if(!RegExp(i).test(t)){return validation(e,false,CSVIPError)}}validation(e,true)}function validation(e,t,n){n=n||"";Array.prototype.forEach.call(e.parentNode.children,function(e,t){if(e.classList.contains("cs-validation")){e.parentNode.removeChild(e)}});if(t==true){e.insertAdjacentHTML("afterend",'<div class="cs-validation cs-valid"><i></i><span>'+n+"</span></div>");e.parentNode.classList.add("cs-valid");e.parentNode.classList.remove("cs-invalid");return true}else{e.insertAdjacentHTML("afterend",'<div class="cs-validation cs-invalid"><i></i><span>'+n+"</span></div>");e.parentNode.classList.add("cs-invalid");e.parentNode.classList.remove("cs-valid");return false}}String.prototype.replaceMultiple=function(e){var t=this,n;for(n in e)t=t.replace(new RegExp("\\{"+n+"\\}","gm"),e[n]);return t}
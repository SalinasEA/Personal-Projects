/*
Step 1: Inspect the project
The project contains HTML, CSS, and JavaScript files. The register.js file registers a click event handler for the Register button that prevents the form from submitting. The event handler calls checkForm() to perform data validation.

Step 2: Implement checkForm()
Complete checkForm() in register.js to verify that the user-provided information is valid.

If form validation errors exist:

Display the formErrors <div> by removing the hide class.
Display each of the associated error messages in the formErrors <div> using an unordered list. The error message must be displayed in the order the validation is performed, following the order specified below.
Add the error class to each <input> element with invalid input.

If no form validation errors exist:

Hide the formErrors <div> by adding the hide class.
Remove the error class from all test, email, and password <input> elements.

Perform the following form validations in the order provided and display all error messages that apply:

Ensure a full name with a length greater than or equal to 1 was provided.
Otherwise, display "Missing full name."
Ensure that an email address was provided and that the email address matches the regular expression:
/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/
Otherwise, display "Invalid or missing email address."
Ensure the password has 10 to 20 characters.
Otherwise, display "Password must be between 10 and 20 characters."
Ensure the password contains at least one lowercase character (use a regular expression).
Otherwise, display "Password must contain at least one lowercase character."
Ensure the password contains at least one uppercase character (use a regular expression).
Otherwise, display "Password must contain at least one uppercase character."
Ensure the password contains at least one digit (use a regular expression).
Otherwise, display "Password must contain at least one digit."
Ensure the password and confirmation password match.
Otherwise, display "Password and confirmation password don't match."
*/

function checkForm() {
   // Form ID variables: Get references to the form fields using their IDs
   let fullName = document.getElementById("fullName");
   let email = document.getElementById("email");
   let password = document.getElementById("password");
   let passwordConfirm = document.getElementById("passwordConfirm");

   // Div ID formErrors variable: This is where the error messages will be shown
   let formErrors = document.getElementById("formErrors");

   // Regular Expressions for validation
   let emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;  // Email validation pattern
   let lowerPassRegEx = /[a-z]/;  // Password must contain at least one lowercase letter
   let upperPassRegEx = /[A-Z]/;  // Password must contain at least one uppercase letter
   let digitPassRegEx = /\d/;  // Password must contain at least one digit

   // ValidForm boolean: This flag will track if the form is valid or not
   let validForm = true;


   // Full name length validation
   if (fullName.value.length < 1) {
      validForm = false;
      fullName.classList.add("error");  // Highlight the input field with an error class
      let ul = document.createElement("ul");
      let li = document.createElement("li");
      li.innerHTML = "Missing full name.";  // Error message for missing full name
      ul.appendChild(li);
      formErrors.appendChild(ul);  // Add error message to the form
   }

   // Email validation
   if (!emailRegEx.test(email.value)) {
      validForm = false;
      email.classList.add("error");  // Highlight the email input with an error class
      let ul = document.createElement("ul");
      let li = document.createElement("li");
      li.innerHTML = "Invalid or missing email address.";  // Error message for invalid email
      ul.appendChild(li);
      formErrors.appendChild(ul);  // Add error message to the form
   }

   // Password length validation
   if (password.value.length < 10 || password.value.length > 20) {
      validForm = false;
      password.classList.add("error");  // Highlight the password input with an error class
      let ul = document.createElement("ul");
      let li = document.createElement("li");
      li.innerHTML = "Password must be between 10 and 20 characters.";  // Password length validation message
      ul.appendChild(li);
      formErrors.appendChild(ul);  // Add error message to the form
   }

   // Password lowercase character validation
   if (!lowerPassRegEx.test(password.value)) {
      validForm = false;
      password.classList.add("error");  // Highlight the password input with an error class
      let ul = document.createElement("ul");
      let li = document.createElement("li");
      li.innerHTML = "Password must contain at least one lowercase character.";  // Error message for missing lowercase
      ul.appendChild(li);
      formErrors.appendChild(ul);  // Add error message to the form
   }

   // Password uppercase character validation
   if (!upperPassRegEx.test(password.value)) {
      validForm = false;
      password.classList.add("error");  // Highlight the password input with an error class
      let ul = document.createElement("ul");
      let li = document.createElement("li");
      li.innerHTML = "Password must contain at least one uppercase character.";  // Error message for missing uppercase
      ul.appendChild(li);
      formErrors.appendChild(ul);  // Add error message to the form
   }

   // Password digit validation
   if (!digitPassRegEx.test(password.value)) {
      validForm = false;
      password.classList.add("error");  // Highlight the password input with an error class
      let ul = document.createElement("ul");
      let li = document.createElement("li");
      li.innerHTML = "Password must contain at least one digit.";  // Error message for missing digit
      ul.appendChild(li);
      formErrors.appendChild(ul);  // Add error message to the form
   }

   // Password confirmation validation
   if (password.value !== passwordConfirm.value) {
      validForm = false;
      passwordConfirm.classList.add("error");  // Highlight the password confirm field with an error class
      let ul = document.createElement("ul");
      let li = document.createElement("li");
      li.innerHTML = "Password and confirmation password don't match.";  // Error message for password mismatch
      ul.appendChild(li);
      formErrors.appendChild(ul);  // Add error message to the form
   }

   // If form has errors, display them. Otherwise, hide error messages.
   if (validForm == false) {
      formErrors.classList.remove("hide");  // Show the error messages div
   }
   else {
      formErrors.classList.add("hide");  // Hide the error messages div
      fullName.classList.remove("error");  // Remove error highlight from full name input
      email.classList.remove("error");  // Remove error highlight from email input
      password.classList.remove("error");  // Remove error highlight from password input
      passwordConfirm.classList.remove("error");  // Remove error highlight from password confirm input
   }
}

// Event listener for the submit button
document.getElementById("submit").addEventListener("click", function (event) {
   checkForm();  // Validate the form when the submit button is clicked

   // Prevent the form from submitting if there are errors
   event.preventDefault();  // DO NOT REMOVE THIS LINE
});

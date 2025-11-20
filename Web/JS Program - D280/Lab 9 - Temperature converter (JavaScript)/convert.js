/*
Step 1: Inspect the project
The project contains HTML, CSS, and JavaScript files. Three image files are in the images folder. The HTML file declares five UI elements that the JavaScript will interact with:

Element's ID	Element description
cInput	Text input field for Celsius temperature
fInput	Text input field for Fahrenheit temperature
convertButton	Button that, when clicked, converts from one temperature to the other
errorMessage	Paragraph for displaying an error message when temperature cannot be converted
weatherImage	Image corresponding to the temperature
Step 2: Implement conversion functions (2 points)
Implement the convertCtoF() and convertFtoC() functions in convert.js to convert between Celsius and Fahrenheit. convertCtoF() takes a single numerical argument for a temperature in Celsius and returns the temperature in Fahrenheit using the following conversion formula:

°F = °C * 9/5 + 32

Similarly, convertFtoC() takes a single numerical argument for a temperature in Fahrenheit and returns the temperature in Celsius using the following conversion formula:

°C = (°F - 32) * 5/9
Step 3: Register Convert button's click event handler (2 points)
When the DOM finishes loading, the domLoaded() function is called. In domLoaded(), call addEventListener() to register a click event handler for the Convert button (id="convertButton").

When the Convert button is clicked, the text box that contains a number should be converted into the opposing temperature. So if a number is in the Celsius text box (id="cInput"), the click event handler should convert the number into Fahrenheit and display the result in the Fahrenheit text box (id="fInput") and vice versa. Use parseFloat() to convert a string to a number, and do not round the result.

Step 4: Ensure only one text field contains a value (2 points)
Ensure that only one text field contains a value at any moment in time unless the Convert button has been clicked. Ex: When the Celsius field has a number and the user enters a Fahrenheit entry, the Celsius field should be cleared as soon as the user begins to type. 

Implement an input event handler for each of the text fields that clears the opposing text field when the input changes. Call addEventListener() to register each input event handler in the domLoaded() function.

Step 5: Change image to reflect temperature (2 points)
When the temperature is converted, change the image to reflect the temperature in Fahrenheit, as indicated in the table below. To change the image, change the image's src property to the appropriate filename.

Below 32 °F	32 - 50 °F	Above 50 °F
snowflake	storm cloud	sun
cold.png	cool.png	warm.png
Step 6: Handle bad input (2 points)
When parseFloat() returns NaN for the temperature to be converted, set errorMessage's textContent to the message: "X is not a number", where X is the string from the text input. When parseFloat() returns a valid number, set errorMessage's textContent to an empty string. 
*/

// Wait for the DOM to load before attaching event listeners
window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
   let cInput = document.getElementById("cInput");
   let fInput = document.getElementById("fInput");
   let convertButton = document.getElementById("convertButton");

   // Attach event listener to the convert button
   convertButton.addEventListener("click", clickHandler);

   // Clear the other input field when typing in one
   cInput.addEventListener("input", cInputHandler);
   fInput.addEventListener("input", fInputHandler);
}

// Convert Celsius to Fahrenheit
function convertCtoF(degreesCelsius) {
   return degreesCelsius * (9 / 5) + 32;
}

// Convert Fahrenheit to Celsius
function convertFtoC(degreesFahrenheit) {
   return (degreesFahrenheit - 32) * (5 / 9);
}

// Handle temperature conversion when button is clicked
function clickHandler() {
   let cInput = document.getElementById("cInput");
   let fInput = document.getElementById("fInput");
   let img = document.querySelector("img");

   if (cInput.value !== "" && !isNaN(parseFloat(cInput.value))) {
      let celsius = parseFloat(cInput.value);
      document.getElementById("errorMessage").textContent = "";
      fInput.value = convertCtoF(celsius);

      updateImage(fInput.value);
   }
   else if (fInput.value !== "" && !isNaN(parseFloat(fInput.value))) {
      let fahrenheit = parseFloat(fInput.value);
      document.getElementById("errorMessage").textContent = "";
      cInput.value = convertFtoC(fahrenheit);

      updateImage(fahrenheit);
   }
   else {
      showErrorMessage(cInput.value, fInput.value);
   }
}

// Update the weather image based on Fahrenheit temperature
function updateImage(tempF) {
   let img = document.querySelector("img");

   if (tempF > 50) {
      img.src = "warm.png";
      img.alt = "Picture of the Sun";
   }
   else if (tempF >= 32) {
      img.src = "cool.png";
      img.alt = "Picture of a cloud";
   }
   else {
      img.src = "cold.png";
      img.alt = "Picture of a snowflake";
   }
}

// Display an error message if input is invalid
function showErrorMessage(cValue, fValue) {
   if (cValue !== "") {
      document.getElementById("errorMessage").textContent = `${cValue} is not a number`;
   }
   else if (fValue !== "") {
      document.getElementById("errorMessage").textContent = `${fValue} is not a number`;
   }
}

// Clear Fahrenheit input when Celsius input is changed
function cInputHandler() {
   let cInput = document.getElementById("cInput");
   let fInput = document.getElementById("fInput");

   if (cInput.value !== "") {
      fInput.value = "";
   }
}

// Clear Celsius input when Fahrenheit input is changed
function fInputHandler() {
   let cInput = document.getElementById("cInput");
   let fInput = document.getElementById("fInput");

   if (fInput.value !== "") {
      cInput.value = "";
   }
}
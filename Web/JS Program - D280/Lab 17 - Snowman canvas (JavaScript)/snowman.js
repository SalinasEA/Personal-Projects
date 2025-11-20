/*
Step 1: Inspect the project
The index.html file contains a single 300 x 300 canvas. 

The snowman.js file contains three completed functions:

The DOMContentLoaded event handler calls drawGround(), drawSnowText(), drawSnowman(), and drawSnowflakes() to create the snowman scene.

drawGround() displays brown ground under a light gray sky.

drawSnowflakes() calls drawSingleFlake() 100 times to display 100 snow flakes in randomly chosen locations.

Step 2: Implement drawSnowText()
The drawSnowText() function should display the string "SNOW" using:

font: 80px Verdana
textAlign: center
textBaseline: top
fillStyle: blue
fillText()to display the text at coordinate (canvas.width / 2, 10)
Step 3: Implement drawSnowman()
The drawSnowman() function should display three white circles:

Bottom circle: arc() centered at (150, 200) with radius 50 that begins at 0 and ends at Math.PI * 2
Middle circle: arc() centered at (150, 120) with radius 40 that begins at 0 and ends at Math.PI * 2
Top circle: arc() centered at (150, 60) with radius 25 that begins at 0 and ends at Math.PI * 2
All three circles should use fillStyle white and be displayed with the fill() function
Step 4: Implement drawSingleFlake()
The drawSingleFlake() function should display a single white snowflake in the shape of a diamond using the constant flakeSize:

Start a new path
Move to the coordinate (x, y)
Draw a line to (x + flakeSize / 2, y + flakeSize / 2), then to (x, y + flakeSize), and then to (x - flakeSize / 2, y + flakeSize / 2)
Use the fillStyle #eee
Use fill() to display the diamond
*/

// Size of a single snowflake
const flakeSize = 8;

// Wait for the DOM to be fully loaded before running the code
window.addEventListener("DOMContentLoaded", function () {
   let canvas = document.querySelector("canvas");

   drawGround(canvas);   // Draw the ground
   drawSnowText(canvas); // Draw the "SNOW" text
   drawSnowman(canvas);  // Draw the snowman
   drawSnowflakes(canvas); // Draw multiple snowflakes
});

// Function to draw the ground and background
function drawGround(canvas) {
   let context = canvas.getContext("2d");

   // Set the background color and draw it
   context.fillStyle = "#bbb"; // Light grey color for the background
   context.fillRect(0, 0, canvas.width, canvas.height);

   // Set the ground color and draw it
   context.fillStyle = "brown"; // Brown color for the ground
   context.fillRect(0, canvas.height - 80, canvas.width, 80); // Ground at the bottom
}

// Function to draw multiple snowflakes at random positions
function drawSnowflakes(canvas) {
   for (let c = 0; c < 100; c++) {
      // Generate random positions for each snowflake
      let x = Math.floor(Math.random() * canvas.width);
      let y = Math.floor(Math.random() * canvas.height);
      drawSingleFlake(canvas, x, y); // Draw a single snowflake at the random position
   }
}

// Function to draw the text "SNOW" at the top of the canvas
function drawSnowText(canvas) {
   let context = canvas.getContext("2d");

   // Set up text styles (font size, alignment, etc.)
   context.font = "80px Verdana";  // Set the font size and type
   context.textAlign = "center";   // Center the text horizontally
   context.textBaseline = "top";   // Align the text from the top of the canvas
   context.fillStyle = "blue";     // Set text color to blue
   context.fillText("SNOW", canvas.width / 2, 10);  // Draw the text in the center
}

// Function to draw a snowman with three circles
function drawSnowman(canvas) {
   let context = canvas.getContext("2d");

   // Draw the bottom part of the snowman (largest circle)
   context.beginPath();
   context.arc(150, 200, 50, 0, Math.PI * 2);  // Position (150, 200), radius 50
   context.fillStyle = "white";  // White color for the snowman
   context.fill();

   // Draw the middle part of the snowman (medium circle)
   context.beginPath();
   context.arc(150, 120, 40, 0, Math.PI * 2);  // Position (150, 120), radius 40
   context.fillStyle = "white";  // White color for the snowman
   context.fill();

   // Draw the top part of the snowman (smallest circle)
   context.beginPath();
   context.arc(150, 60, 25, 0, Math.PI * 2);  // Position (150, 60), radius 25
   context.fillStyle = "white";  // White color for the snowman
   context.fill();
}

// Function to draw a single snowflake at a given position (x, y)
function drawSingleFlake(canvas, x, y) {
   let context = canvas.getContext("2d");

   context.beginPath();
   context.moveTo(x, y);               // Start at the given position (x, y)
   context.lineTo(x + flakeSize / 2, y + flakeSize / 2);  // Draw a line to the right-bottom corner of the flake
   context.lineTo(x, y + flakeSize);    // Draw a line to the bottom center of the flake
   context.lineTo(x - flakeSize / 2, y + flakeSize / 2);  // Draw a line to the left-bottom corner of the flake
   context.fillStyle = "#eee";  // Light gray color for the snowflake
   context.fill();  // Fill the snowflake shape
}
